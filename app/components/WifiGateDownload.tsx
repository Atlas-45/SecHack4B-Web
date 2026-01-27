"use client";

import { useEffect, useRef, useState } from "react";

type Stage = "choose" | "private" | "checking";

type WifiGateDownloadProps = {
  href: string;
  label?: string;
  className?: string;
  style?: React.CSSProperties;
  wifiPublicName?: string;
  wifiPrivateName?: string;
};

const STORAGE_KEY = "wifi_gate_connected";

export default function WifiGateDownload({
  href,
  label = "Download ↓",
  className,
  style,
  wifiPublicName = "PUBLIC_NET",
  wifiPrivateName = "PRIVATE_NET",
}: WifiGateDownloadProps) {
  const [unlocked, setUnlocked] = useState(false);
  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState<Stage>("choose");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const downloadRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    try {
      setUnlocked(sessionStorage.getItem(STORAGE_KEY) === "1");
    } catch {
      setUnlocked(false);
    }
  }, []);

  const triggerDownload = () => {
    setTimeout(() => {
      downloadRef.current?.click();
    }, 0);
  };

  const markUnlocked = () => {
    setUnlocked(true);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore storage failures
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (unlocked) {
      return;
    }
    event.preventDefault();
    setError("");
    setPassword("");
    setStage("choose");
    setOpen(true);
  };

  const handlePublic = () => {
    markUnlocked();
    setOpen(false);
    triggerDownload();
  };

  const handlePrivateSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!password.trim()) {
      setError("パスワードを入力してください。");
      return;
    }

    setStage("checking");
    setError("");

    try {
      const response = await fetch("/api/wifi/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await response.json().catch(() => null);

      if (response.ok && data?.ok) {
        markUnlocked();
        setOpen(false);
        triggerDownload();
        return;
      }
    } catch {
      // fall through to error message
    }

    setPassword("");
    setStage("choose");
    setError("パスワードが違います。ネットワークを選択し直してください。");
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <a className={className} href={href} download onClick={handleClick} style={style}>
        {label}
      </a>
      <a ref={downloadRef} href={href} download style={{ display: "none" }} tabIndex={-1} aria-hidden="true" />

      {open && (
        <div className="wifi-modal-backdrop" role="dialog" aria-modal="true">
          <div className="wifi-modal">
            <div className="wifi-modal-header">
              <div>
                <p className="wifi-modal-eyebrow">NETWORK ACCESS</p>
                <h3>Wi-Fi接続の選択</h3>
              </div>
              <button type="button" className="wifi-ghost" onClick={handleClose}>
                閉じる
              </button>
            </div>

            <p className="wifi-modal-sub">
              初回ダウンロードの前に、接続するネットワークを選択してください。
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
                    <div className="wifi-option-title">{wifiPublicName}</div>
                    <div className="wifi-option-meta">PUBLIC / パスワード不要</div>
                  </div>
                  <button type="button" className="button" onClick={handlePublic}>
                    接続
                  </button>
                </div>

                <div className="wifi-option">
                  <div>
                    <div className="wifi-option-title">{wifiPrivateName}</div>
                    <div className="wifi-option-meta">PRIVATE / パスワード必須</div>
                  </div>
                  <button type="button" className="button" onClick={() => setStage("private")}>
                    選択
                  </button>
                </div>
              </div>
            )}

            {stage === "private" && (
              <form className="wifi-form" onSubmit={handlePrivateSubmit}>
                <label htmlFor="wifi-password">{wifiPrivateName} パスワード</label>
                <input
                  id="wifi-password"
                  className="input"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                />
                <div className="wifi-modal-actions">
                  <button type="button" className="wifi-ghost" onClick={() => setStage("choose")}>
                    戻る
                  </button>
                  <button type="submit" className="button" disabled={stage === "checking"}>
                    {stage === "checking" ? "確認中..." : "接続"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
