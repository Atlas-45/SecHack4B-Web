"use client";

import { useEffect, useState, useCallback } from "react";

type WifiGateDownloadProps = {
  href: string;
  privateHref?: string;
  label?: string;
  className?: string;
  style?: React.CSSProperties;
};

const STORAGE_KEY = "wifi_gate_connected";

export default function WifiGateDownload({
  href,
  privateHref,
  label = "Download ↓",
  className,
  style,
}: WifiGateDownloadProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

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

    // If connected and privateHref exists, use that instead
    if (privateHref) {
      event.preventDefault();
      const link = document.createElement("a");
      link.href = privateHref;
      link.download = "";
      link.click();
    }
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
    </>
  );
}
