"use client";

import { useEffect, useState, useCallback } from "react";

type WifiGateDownloadProps = {
  href: string;
  privateHref?: string;
  label?: string;
  className?: string;
  style?: React.CSSProperties;
  requirePassword?: boolean;
  password?: string;
};

const STORAGE_KEY = "wifi_gate_connected";

export default function WifiGateDownload({
  href,
  privateHref,
  label = "Download ↓",
  className,
  style,
  requirePassword = false,
  password = "",
}: WifiGateDownloadProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const checkConnection = useCallback(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      return false;
    }
  }, []);

  useEffect(() => {
    setIsConnected(checkConnection());

    // Listen for storage changes (when WiFi connects/disconnects)
    const handleStorageChange = () => {
      setIsConnected(checkConnection());
    };

    window.addEventListener("storage", handleStorageChange);

    // Also check periodically for same-tab changes
    const interval = setInterval(() => {
      setIsConnected(checkConnection());
    }, 500);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, [checkConnection]);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    // Re-check connection status at click time
    const connected = checkConnection();
    setIsConnected(connected);

    if (!connected) {
      event.preventDefault();
      setShowWarning(true);
      return;
    }

    // If password is required, show password modal first
    if (requirePassword) {
      event.preventDefault();
      setShowPasswordModal(true);
      setPasswordInput("");
      setPasswordError(false);
      return;
    }

    // If connected and privateHref exists, use that instead
    if (privateHref) {
      event.preventDefault();
      const link = document.createElement("a");
      link.href = privateHref;
      link.download = "";
      link.click();
    }
  };

  const handlePasswordSubmit = () => {
    if (passwordInput === password) {
      setShowPasswordModal(false);
      setPasswordError(false);
      // Download the file
      const link = document.createElement("a");
      link.href = privateHref || href;
      link.download = "";
      link.click();
    } else {
      setPasswordError(true);
    }
  };

  const handleClosePasswordModal = () => {
    setShowPasswordModal(false);
    setPasswordInput("");
    setPasswordError(false);
  };

  const handleCloseWarning = () => {
    setShowWarning(false);
  };

  return (
    <>
      <a
        className={className}
        href={href}
        download
        onClick={handleClick}
        style={style}
      >
        {label}
      </a>

      {showWarning && (
        <>
          <div className="wifi-modal-backdrop" onClick={handleCloseWarning} />
          <div
            className="wifi-warning-modal"
            role="alertdialog"
            aria-modal="true"
          >
            <div className="wifi-warning-icon">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                <line x1="12" y1="20" x2="12" y2="20" />
                <line
                  x1="2"
                  y1="2"
                  x2="22"
                  y2="22"
                  stroke="#dc3545"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <h3 className="wifi-warning-title">Wi-Fi未接続</h3>
            <p className="wifi-warning-message">
              ダウンロードするにはWi-Fiに接続してください。
              <br />
              画面右上のWi-Fiアイコンから接続できます。
            </p>
            <button
              type="button"
              className="button wifi-warning-button"
              onClick={handleCloseWarning}
            >
              閉じる
            </button>
          </div>
        </>
      )}

      {showPasswordModal && (
        <>
          <div
            className="wifi-modal-backdrop"
            onClick={handleClosePasswordModal}
          />
          <div className="wifi-warning-modal" role="dialog" aria-modal="true">
            <div
              className="wifi-warning-icon"
              style={{ color: "var(--accent)" }}
            >
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <h3 className="wifi-warning-title">パスワードが必要です</h3>
            <p
              className="wifi-warning-message"
              style={{ marginBottom: "20px" }}
            >
              このファイルをダウンロードするにはパスワードを入力してください。
            </p>
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => {
                setPasswordInput(e.target.value);
                setPasswordError(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handlePasswordSubmit();
                }
              }}
              placeholder="パスワード"
              style={{
                width: "100%",
                padding: "12px 15px",
                fontSize: "16px",
                border: passwordError ? "2px solid #dc3545" : "1px solid #ddd",
                borderRadius: "4px",
                marginBottom: "10px",
                outline: "none",
              }}
              autoFocus
            />
            {passwordError && (
              <p
                style={{
                  color: "#dc3545",
                  fontSize: "13px",
                  marginBottom: "15px",
                }}
              >
                パスワードが正しくありません
              </p>
            )}
            <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
              <button
                type="button"
                className="button"
                onClick={handlePasswordSubmit}
                style={{ flex: 1 }}
              >
                ダウンロード
              </button>
              <button
                type="button"
                className="button"
                onClick={handleClosePasswordModal}
                style={{ flex: 1, background: "#666" }}
              >
                キャンセル
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
