"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "notice_popup_dismissed";

export default function NoticePopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // localStorageで既に閉じたかどうかを確認
    try {
      const dismissed = localStorage.getItem(STORAGE_KEY);
      if (!dismissed) {
        setIsVisible(true);
      }
    } catch {
      // localStorageが使えない場合は表示しない
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // localStorageが使えない場合は何もしない
    }
  };

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        background: "#fff3cd",
        borderBottom: "1px solid #ffc107",
        padding: "12px 20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "15px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: "14px",
          color: "#856404",
          textAlign: "center",
          flex: 1,
        }}
      >
        ⚠
        チャットサポートが特定の場面で想定外の出力をすることが報告されています。同様の事象に遭遇された方は
        <a
          href="/contact"
          style={{
            color: "#856404",
            fontWeight: "bold",
            textDecoration: "underline",
            marginLeft: "4px",
          }}
        >
          ご報告ください
        </a>
        。
      </p>
      <button
        onClick={handleClose}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: "20px",
          color: "#856404",
          padding: "0 5px",
          lineHeight: 1,
        }}
        aria-label="閉じる"
      >
        ×
      </button>
    </div>
  );
}
