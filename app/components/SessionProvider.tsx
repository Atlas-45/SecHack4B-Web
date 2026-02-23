"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

function generateSessionId(): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

const SESSION_STORAGE_KEY = "glass_key_session_id";

export default function SessionProvider() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const urlSessionId = searchParams.get("sid");

    if (!urlSessionId || urlSessionId.length !== 8) {
      // URLにセッションIDがない、または8桁でない場合
      let sessionId = sessionStorage.getItem(SESSION_STORAGE_KEY);

      if (!sessionId || sessionId.length !== 8) {
        // sessionStorageにもないか8桁でない場合は新規生成
        sessionId = generateSessionId();
        sessionStorage.setItem(SESSION_STORAGE_KEY, sessionId);
      }

      // URLにセッションIDを追加
      const params = new URLSearchParams(searchParams.toString());
      params.set("sid", sessionId);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    } else {
      // URLにセッションIDがある場合はsessionStorageに保存
      sessionStorage.setItem(SESSION_STORAGE_KEY, urlSessionId);
    }
  }, [searchParams, router, pathname]);

  return null;
}
