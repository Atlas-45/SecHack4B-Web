"use client";

import { useState, ReactNode } from "react";
import Link from "next/link";

type ProtectedWorkProps = {
  children: ReactNode;
  workId: string;
};

// パスワード: 公開日から「0301」
const WORK_PASSWORDS: Record<string, string> = {
  "GK-027": "0301",
};

export default function ProtectedWork({
  children,
  workId,
}: ProtectedWorkProps) {
  const [password, setPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState("");

  const correctPassword = WORK_PASSWORDS[workId];

  if (!correctPassword) {
    return <>{children}</>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsUnlocked(true);
      setError("");
    } else {
      setError("パスワードが正しくありません");
      setPassword("");
    }
  };

  if (isUnlocked) {
    return <>{children}</>;
  }

  return (
    <div className="container" style={{ paddingBlock: "80px" }}>
      <div
        style={{
          marginBottom: "40px",
          display: "flex",
          gap: "15px",
          alignItems: "center",
        }}
      >
        <Link href="/works" className="btn-outline">
          &larr; Back to Works
        </Link>
      </div>

      <div
        style={{
          maxWidth: "400px",
          margin: "80px auto",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "80px",
            height: "80px",
            margin: "0 auto 30px",
            borderRadius: "50%",
            background: "var(--bg-alt)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "32px",
          }}
        >
          🔒
        </div>

        <h1
          style={{
            fontFamily: "var(--font-serif), serif",
            fontSize: "28px",
            marginBottom: "15px",
          }}
        >
          Protected Content
        </h1>

        <p
          style={{
            color: "var(--text-light)",
            marginBottom: "30px",
            fontSize: "14px",
          }}
        >
          この作品は公開前のため、アクセスにはパスワードが必要です。
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="パスワードを入力"
            style={{
              width: "100%",
              padding: "14px 18px",
              fontSize: "16px",
              border: error ? "2px solid #e74c3c" : "2px solid var(--border)",
              borderRadius: "8px",
              background: "var(--bg)",
              color: "var(--text)",
              marginBottom: "10px",
              textAlign: "center",
              letterSpacing: "4px",
            }}
            autoFocus
          />

          {error && (
            <p
              style={{
                color: "#e74c3c",
                fontSize: "13px",
                marginBottom: "15px",
              }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            className="btn-primary"
            style={{
              width: "100%",
              padding: "14px",
              fontSize: "16px",
              marginTop: "10px",
            }}
          >
            アクセス
          </button>
        </form>

        <p
          style={{
            marginTop: "40px",
            fontSize: "12px",
            color: "var(--text-light)",
            opacity: 0.6,
          }}
        >
          {workId} • 公開予定作品
        </p>
      </div>
    </div>
  );
}
