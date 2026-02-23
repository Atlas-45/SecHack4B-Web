"use client";

import { useEffect } from "react";

export default function DevConsole() {
  useEffect(() => {
    // 開発者コメント（モック）
    console.log(
      "%c🔧 GLASS KEY Photo Archive - Developer Mode",
      "color: #4a90d9; font-size: 14px; font-weight: bold;",
    );
    console.log(
      "%c[DEV] 2026/01/28 - Next.js 15にアップグレード完了。ビルド時間が20%短縮された",
      "color: #888;",
    );
    console.log(
      "%c[TODO] レスポンシブ対応、タブレット表示が若干崩れる問題を修正する",
      "color: #669900;",
    );
    console.log(
      "%c[DEV] 2026/02/05 - 画像の遅延読み込み実装。LCP改善を確認",
      "color: #888;",
    );
    console.log("%cマスターから連絡来ないな…忙しいのかな", "color: #999;");
    console.log(
      "%c[NOTE] フォントの読み込みが遅い件、preloadの設定を見直す必要あり",
      "color: #cc6600;",
    );
    console.log(
      "%c[DEV] 2026/02/12 - OGP画像の生成処理を追加。SNSシェア時のプレビュー対応",
      "color: #888;",
    );
    console.log(
      "%cPress Kit Cのパスワード、たまたま全公開作品IDの数字を合計した値になってて草",
      "color: #999;",
    );
    console.log(
      "%cこの前食べたカレー美味しかったな。また行きたい",
      "color: #999;",
    );
    console.log(
      "%c[DEBUG] メモリリーク修正済み。useEffectのクリーンアップ処理を追加",
      "color: #666; font-style: italic;",
    );
    console.log("%c明日は休みだ。やったー", "color: #999;");
  }, []);

  return null;
}
