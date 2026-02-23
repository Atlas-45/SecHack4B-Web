"use client";

import { useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

const SESSION_STORAGE_KEY = "glass_key_session_id";
export const ADMIN_SESSION_ID = "Hf7cB3nM";
const DEFAULT_SESSION_ID = "PNtHwU37";

// アクティブなセッションIDリスト（sessions.logと同期）
const ACTIVE_SESSION_IDS = [
  "xK9mPq2L",
  "Tn4wR8yJ",
  "Hf7cB3nM",
  "Qw2xL6pK",
  "Vb9sD4tY",
  "PNtHwU37",
];

type SessionState = "guest" | "valid" | "invalid" | "admin";

export default function SessionProvider() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [sessionState, setSessionState] = useState<SessionState>("guest");

  useEffect(() => {
    const urlSessionId = searchParams.get("session");

    if (!urlSessionId) {
      // セッションIDがない場合はデフォルトセッションを適用
      const params = new URLSearchParams(searchParams.toString());
      params.set("session", DEFAULT_SESSION_ID);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      return;
    } else if (urlSessionId === ADMIN_SESSION_ID) {
      // 管理者セッション
      setSessionState("admin");
      sessionStorage.setItem(SESSION_STORAGE_KEY, urlSessionId);
    } else if (ACTIVE_SESSION_IDS.includes(urlSessionId)) {
      // 有効なセッション
      setSessionState("valid");
      sessionStorage.setItem(SESSION_STORAGE_KEY, urlSessionId);
    } else {
      // 無効なセッション（アクティブリストにない）
      setSessionState("invalid");
    }
  }, [searchParams, pathname]);

  // 無効なセッションの場合はエラー表示
  if (sessionState === "invalid") {
    return (
      <div className="session-error-overlay">
        <div className="session-error-modal">
          <div className="session-error-icon">⚠️</div>
          <h2>セッションエラー</h2>
          <p>無効なセッションIDです。</p>
          <p className="session-error-detail">
            セッションIDが指定されていないか、存在しないか、有効期限が切れています。
          </p>
        </div>
      </div>
    );
  }

  // 管理者モードの場合はバナー表示
  if (sessionState === "admin") {
    return (
      <div className="admin-banner">
        <span className="admin-banner-icon">⚠️</span>
        <span>管理者モードで閲覧中 - プレビュー</span>
      </div>
    );
  }

  return null;
}
