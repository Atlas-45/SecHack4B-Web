"use client";

import { useEffect, useState } from "react";

type Stage = "choose" | "private";
type ConnectionStatus = "disconnected" | "connecting" | "connected";

const STORAGE_KEY = "wifi_gate_connected";
const NETWORK_NAME_KEY = "wifi_network_name";

export default function WifiStatus({
  wifiPublicName = "PUBLIC_NET",
  wifiPrivateName = "PRIVATE_NET",
}: {
  wifiPublicName?: string;
  wifiPrivateName?: string;
}) {
  const [status, setStatus] = useState<ConnectionStatus>("disconnected");
  const [connectedNetwork, setConnectedNetwork] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState<Stage>("choose");
  const [password, setPassword] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const connected = sessionStorage.getItem(STORAGE_KEY) === "1";
      const networkName =
        sessionStorage.getItem(NETWORK_NAME_KEY) || wifiPublicName;
      if (connected) {
        setStatus("connected");
        setConnectedNetwork(networkName);
      }
    } catch {
      // ignore storage failures
    }
  }, [wifiPublicName]);

  const markConnected = (networkName: string) => {
    setStatus("connected");
    setConnectedNetwork(networkName);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
      sessionStorage.setItem(NETWORK_NAME_KEY, networkName);
    } catch {
      // ignore storage failures
    }
  };

  const disconnect = () => {
    setStatus("disconnected");
    setConnectedNetwork("");
    try {
      sessionStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(NETWORK_NAME_KEY);
    } catch {
      // ignore storage failures
    }
  };

  const handleIconClick = () => {
    setError("");
    setPassword("");
    setStage("choose");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const simulateConnection = (networkName: string) => {
    setStatus("connecting");
    setOpen(false);
    setTimeout(() => {
      markConnected(networkName);
    }, 1500);
  };

  const handlePublic = () => {
    simulateConnection(wifiPublicName);
  };

  const handlePrivateSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    if (!password.trim()) {
      setError("パスワードを入力してください。");
      return;
    }

    setIsChecking(true);
    setError("");

    try {
      const response = await fetch("/api/wifi/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await response.json().catch(() => null);

      if (response.ok && data?.ok) {
        setIsChecking(false);
        simulateConnection(wifiPrivateName);
        return;
      }
    } catch {
      // fall through to error message
    }

    setIsChecking(false);
    setPassword("");
    setStage("choose");
    setError("パスワードが違います。ネットワークを選択し直してください。");
  };

  const getStatusLabel = () => {
    switch (status) {
      case "connected":
        return connectedNetwork;
      case "connecting":
        return "接続中...";
      default:
        return "未接続";
    }
  };

  return (
    <div className="wifi-status-wrapper">
      <button
        type="button"
        className={`wifi-status-button wifi-status-${status}`}
        onClick={handleIconClick}
        title={`Wi-Fi: ${getStatusLabel()}`}
        aria-label={`Wi-Fi: ${getStatusLabel()}`}
      >
        <svg
          className="wifi-icon"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12.55a11 11 0 0 1 14.08 0" />
          <path d="M1.42 9a16 16 0 0 1 21.16 0" />
          <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
          <circle cx="12" cy="20" r="1" fill="currentColor" />
        </svg>
        {status === "connecting" && (
          <span className="wifi-connecting-indicator" />
        )}
      </button>

      {open && (
        <>
          <div className="wifi-modal-backdrop" onClick={handleClose} />
          <div className="wifi-modal" role="dialog" aria-modal="true">
            <div className="wifi-modal-header">
              <div>
                <p className="wifi-modal-eyebrow">NETWORK ACCESS</p>
                <h3>Wi-Fi接続</h3>
              </div>
              <button
                type="button"
                className="wifi-ghost"
                onClick={handleClose}
              >
                閉じる
              </button>
            </div>

            {status === "connected" ? (
              <div className="wifi-connected-info">
                <p className="wifi-modal-sub">
                  現在 <strong>{connectedNetwork}</strong> に接続しています。
                </p>
                <div className="wifi-modal-actions">
                  <button
                    type="button"
                    className="button wifi-disconnect"
                    onClick={disconnect}
                  >
                    切断
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="wifi-modal-sub">
                  接続するネットワークを選択してください。
                </p>

                {error && (
                  <div className="wifi-error" role="status" aria-live="polite">
                    {error}
                  </div>
                )}

                {stage === "choose" && (
                  <div className="wifi-options">
                    <div className="wifi-option">
                      <div>
                        <div className="wifi-option-title">
                          {wifiPublicName}
                        </div>
                        <div className="wifi-option-meta">
                          PUBLIC / パスワード不要
                        </div>
                      </div>
                      <button
                        type="button"
                        className="button"
                        onClick={handlePublic}
                      >
                        接続
                      </button>
                    </div>

                    <div className="wifi-option">
                      <div>
                        <div className="wifi-option-title">
                          {wifiPrivateName}
                        </div>
                        <div className="wifi-option-meta">
                          PRIVATE / パスワード必須
                        </div>
                      </div>
                      <button
                        type="button"
                        className="button"
                        onClick={() => setStage("private")}
                      >
                        選択
                      </button>
                    </div>
                  </div>
                )}

                {stage === "private" && (
                  <form className="wifi-form" onSubmit={handlePrivateSubmit}>
                    <label htmlFor="wifi-password">
                      {wifiPrivateName} パスワード
                    </label>
                    <input
                      id="wifi-password"
                      className="input"
                      type="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      autoComplete="current-password"
                    />
                    <div className="wifi-modal-actions">
                      <button
                        type="button"
                        className="wifi-ghost"
                        onClick={() => setStage("choose")}
                      >
                        戻る
                      </button>
                      <button
                        type="submit"
                        className="button"
                        disabled={isChecking}
                      >
                        {isChecking ? "確認中..." : "接続"}
                      </button>
                    </div>
                  </form>
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
