const entries = [
  {
    date: "2026.01.03",
    title: "プレス素材の整理と命名規則を更新",
    detail: "重複ファイルの削除とフォルダ構成を見直しました。",
  },
  {
    date: "2025.12.18",
    title: "2025年展示のアーカイブを追加",
    detail: "Works に9件の作品カードを追加しました。",
  },
  {
    date: "2025.11.28",
    title: "問い合わせ窓口の受付時間を調整",
    detail: "平日10:00-17:00に統一しています。",
  },
  {
    date: "2025.10.02",
    title: "作品一覧の説明文を整理",
    detail: "公開範囲に関する注意書きを統一しました。",
  },
  {
    date: "2025.08.12",
    title: "アーカイブ公開サイトを更新",
    detail: "トップページとナビゲーションを刷新しました。",
  },
];

export default function ChangelogPage() {
  return (
    <div className="container content-box">
      <header className="page-header">
        <h1>Changelog</h1>
        <p>
          アーカイブサイトの更新履歴です。すべての変更は記録され、
          内容が分かるように短く要約しています。
        </p>
      </header>

      <section className="list">
        {entries.map((entry) => (
          <div key={entry.date} className="card">
            <div className="list-item">
              <strong>{entry.title}</strong>
              <span>{entry.date}</span>
            </div>
            <p className="muted">{entry.detail}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
