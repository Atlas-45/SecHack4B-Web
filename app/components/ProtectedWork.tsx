"use client";

import { ReactNode, useCallback, useEffect, useState } from "react";
import Link from "next/link";

type ProtectedWorkProps = {
  children: ReactNode;
  workId: string;
};

const WIFI_CONNECTED_KEY = "wifi_gate_connected";
const WIFI_NETWORK_NAME_KEY = "wifi_network_name";
const PUBLIC_WIFI_NAME = "PUBLIC_NET";
const PRIVATE_WIFI_NAME = "PRIVATE_NET";
const WIFI_GATED_WORKS = new Set(["GK-027"]);

// パスワード: 公開日から「0301」
const WORK_PASSWORDS: Record<string, string> = {
  "GK-027": "0301",
};

type AccessState = "checking" | "blocked" | "cleared";

function readWifiAccess(requiresWifiGate: boolean): {
  accessState: AccessState;
  networkName: string;
} {
  if (!requiresWifiGate) {
    return { accessState: "cleared", networkName: "" };
  }

  if (typeof window === "undefined") {
    return { accessState: "checking", networkName: "" };
  }

  try {
    const connected = sessionStorage.getItem(WIFI_CONNECTED_KEY) === "1";
    const currentNetwork = sessionStorage.getItem(WIFI_NETWORK_NAME_KEY) || "";
    const isPrivate = connected && currentNetwork === PRIVATE_WIFI_NAME;

    return {
      accessState: isPrivate ? "cleared" : "blocked",
      networkName: currentNetwork,
    };
  } catch {
    return { accessState: "blocked", networkName: "" };
  }
}

export default function ProtectedWork({
  children,
  workId,
}: ProtectedWorkProps) {
  const requiresWifiGate = WIFI_GATED_WORKS.has(workId);
  const correctPassword = WORK_PASSWORDS[workId];

  const initialWifiAccess = readWifiAccess(requiresWifiGate);
  const [accessState, setAccessState] = useState<AccessState>(
    initialWifiAccess.accessState,
  );
  const [networkName, setNetworkName] = useState(initialWifiAccess.networkName);
  const [password, setPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState("");

  const syncAccess = useCallback(() => {
    const next = readWifiAccess(requiresWifiGate);
    setAccessState(next.accessState);
    setNetworkName(next.networkName);
  }, [requiresWifiGate]);

  useEffect(() => {
    if (!requiresWifiGate) {
      return;
    }

    const timeout = window.setTimeout(syncAccess, 0);

    const handleStorage = () => {
      syncAccess();
    };

    window.addEventListener("storage", handleStorage);
    const interval = window.setInterval(syncAccess, 500);

    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener("storage", handleStorage);
      window.clearInterval(interval);
    };
  }, [requiresWifiGate, syncAccess]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (password === correctPassword) {
      setIsUnlocked(true);
      setError("");
    } else {
      setError("パスワードが正しくありません");
      setPassword("");
    }
  };

  if (!requiresWifiGate && !correctPassword) {
    return <>{children}</>;
  }

  if (correctPassword && !isUnlocked) {
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
            この作品は公開予定です。アクセスにはパスワードが必要です。
          </p>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
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

  if (requiresWifiGate && accessState === "checking") {
    return (
      <div className="container" style={{ paddingBlock: "80px" }}>
        <p style={{ color: "var(--text-light)" }}>Network check...</p>
      </div>
    );
  }

  if (requiresWifiGate && accessState === "blocked") {
    const isPublicWifi = networkName === PUBLIC_WIFI_NAME;

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

        {isPublicWifi ? (
          <div
            style={{
              maxWidth: "620px",
              margin: "60px auto",
              border: "2px solid #ff3b3b",
              background:
                "repeating-linear-gradient(-45deg, #190909 0 14px, #230a0a 14px 28px)",
              color: "#ffd0d0",
              padding: "40px",
              borderRadius: "10px",
              boxShadow: "0 0 0 2px #3a0b0b inset, 0 0 40px rgba(255,0,0,0.35)",
            }}
          >
            <p
              style={{
                margin: 0,
                fontFamily: "monospace",
                fontSize: "15px",
                letterSpacing: "0.16em",
                color: "#ff6a6a",
                fontWeight: 700,
              }}
            >
              ███ FATAL ERROR ███
            </p>
            <h1
              style={{
                marginTop: "12px",
                marginBottom: "16px",
                fontSize: "40px",
                fontFamily: "monospace",
                letterSpacing: "0.08em",
                color: "#fff0f0",
                textShadow: "0 0 12px rgba(255,70,70,0.8)",
              }}
            >
              SYSTEM CRASH
            </h1>
            <p
              style={{
                marginBottom: "8px",
                fontFamily: "monospace",
                fontSize: "18px",
                letterSpacing: "0.12em",
              }}
            >
              GK-027 / 公開予定作品
            </p>
            <p
              style={{
                marginBottom: 0,
                fontFamily: "monospace",
                color: "#ff9d9d",
                fontSize: "14px",
                letterSpacing: "0.08em",
              }}
            >
              RECOVERY FAILED [0x027A]
            </p>
            <p
              style={{
                marginTop: "14px",
                marginBottom: 0,
                fontFamily: "monospace",
                color: "#ffd7d7",
                fontSize: "14px",
                letterSpacing: "0.08em",
              }}
            >
              緯度+経度=?
            </p>
          </div>
        ) : (
          <div
            style={{
              maxWidth: "560px",
              margin: "60px auto",
              border: "1px solid var(--border)",
              background: "var(--bg-alt)",
              color: "var(--text)",
              padding: "32px",
              borderRadius: "8px",
            }}
          >
            <h1
              style={{
                marginTop: 0,
                marginBottom: "12px",
                fontSize: "28px",
                fontFamily: "var(--font-serif), serif",
              }}
            >
              Wi-Fiがありません
            </h1>
            <p style={{ marginBottom: "10px", color: "var(--text-light)" }}>
              作品を表示するにはWi-Fi接続が必要です。
            </p>
            <p style={{ marginBottom: 0, color: "var(--text-light)" }}>
              GK-027 / 公開予定作品
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      {requiresWifiGate && (
        <div className="container" style={{ paddingTop: "32px", paddingBottom: 0 }}>
          <div
            style={{
              marginBottom: "22px",
              border: "2px solid #00ff66",
              background:
                "linear-gradient(135deg, #041b0a 0%, #083a15 50%, #041b0a 100%)",
              color: "#baffcc",
              borderRadius: "8px",
              padding: "16px 18px",
              fontFamily: "monospace",
              fontSize: "22px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              textAlign: "center",
              boxShadow:
                "0 0 0 2px rgba(0,255,102,0.18) inset, 0 0 18px rgba(0,255,102,0.5), 0 0 36px rgba(0,255,102,0.25)",
              textShadow: "0 0 10px rgba(120,255,170,0.85)",
            }}
          >
            CLEAR / GK-027 unlocked
          </div>
        </div>
      )}
      {children}
    </>
  );
}
