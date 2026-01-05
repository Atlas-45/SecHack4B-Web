import Link from "next/link";

const featuredWorks = [
  {
    title: "霧の河",
    location: "横浜",
    year: "2025",
    tag: "Monochrome",
    tone: "linear-gradient(135deg, #e7e4db, #cfd5cf)",
  },
  {
    title: "午後の余白",
    location: "代官山",
    year: "2024",
    tag: "Portrait",
    tone: "linear-gradient(135deg, #efe7dd, #d8cdbf)",
  },
  {
    title: "境界線",
    location: "竹芝",
    year: "2025",
    tag: "Architecture",
    tone: "linear-gradient(135deg, #dfe6e1, #c6d0cc)",
  },
  {
    title: "雨の標本",
    location: "神田",
    year: "2023",
    tag: "Series",
    tone: "linear-gradient(135deg, #ece9e2, #d8d4cb)",
  },
];

const updates = [
  {
    date: "2026.01.03",
    title: "プレス素材の整理と命名規則を更新しました。",
  },
  {
    date: "2025.12.18",
    title: "作品一覧に2025年展示の記録を追加しました。",
  },
  {
    date: "2025.11.28",
    title: "問い合わせ窓口の受付時間を調整しました。",
  },
];

export default function Home() {
  return (
    <div className="container content-box">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Photo Archive</p>
          <h1>GLASS KEY 写真展アーカイブ</h1>
          <p>
            都市の写真展を記録するアーカイブサイトです。作品紹介、更新履歴、
            プレス向け素材をまとめて公開しています。
          </p>
          <div className="hero-actions">
            <Link className="button" href="/works">
              作品一覧を見る
            </Link>
            <Link className="button-outline" href="/press">
              プレス素材へ
            </Link>
          </div>
        </div>
        <div className="hero-media" aria-hidden="true" />
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <h2 className="section-title">最新アーカイブ</h2>
            <p className="section-sub">
              会場別に整理した作品記録。公開情報のみ掲載しています。
            </p>
          </div>
          <Link className="button-outline" href="/works">
            すべての作品
          </Link>
        </div>
        <div className="grid grid-2">
          {featuredWorks.map((work) => (
            <article key={work.title} className="card work-card" data-tag={work.tag}>
              <div className="work-media" style={{ backgroundImage: work.tone }} />
              <div className="work-body">
                <span className="tag">{work.tag}</span>
                <h3>{work.title}</h3>
                <p className="work-meta">
                  {work.location} / {work.year}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <h2 className="section-title">アーカイブ概要</h2>
            <p className="section-sub">
              掲載情報は展示会公式記録に限定しています。掲載内容の修正や削除は
              お問い合わせフォームからご連絡ください。
            </p>
          </div>
        </div>
        <div className="two-col">
          <div className="card">
            <h3>運用方針</h3>
            <p className="muted">
              記録の正確性と再現性を優先し、作品ごとの公開範囲を明示しています。
              来場者の個人情報や非公開資料は掲載しません。
            </p>
          </div>
          <div className="card">
            <h3>更新スケジュール</h3>
            <p className="muted">
              展示終了後30日以内にアーカイブへ反映します。緊急の差し替えは
              Changelog に記録します。
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <h2 className="section-title">最新更新</h2>
            <p className="section-sub">
              更新内容はすべて公開ログとして残します。
            </p>
          </div>
          <Link className="button-outline" href="/changelog">
            変更履歴を開く
          </Link>
        </div>
        <div className="list">
          {updates.map((item) => (
            <div key={item.date} className="list-item" data-log={item.date}>
              <strong>{item.title}</strong>
              <span>{item.date}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <h2 className="section-title">お問い合わせ</h2>
            <p className="section-sub">
              取材、素材利用、修正依頼はフォームまたはメールでご連絡ください。
            </p>
          </div>
          <Link className="button" href="/contact">
            フォームへ
          </Link>
        </div>
        <div className="notice">
          本アーカイブは公開情報のみを掲載しています。内部資料や未公開の
          画像データは提供していません。
        </div>
      </section>
    </div>
  );
}
