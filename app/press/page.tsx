const assets = [
  {
    title: "プレスキット（概要）",
    desc: "展示概要、ディレクターコメント、ステートメント。",
    href: "/press/press-kit.txt",
  },
  {
    title: "掲載クレジット",
    desc: "作家名、会場、協力クレジットの一覧。",
    href: "/press/credits.txt",
  },
  {
    title: "画像リスト",
    desc: "公開可能な画像の整理とファイル名一覧。",
    href: "/press/image-list.txt",
  },
];

const guidelines = [
  "用途は報道・紹介目的に限ります",
  "画像のトリミングは最小限でお願いします",
  "クレジット表記は必須です",
  "掲載前に必ず内容確認を行ってください",
];

export default function PressPage() {
  return (
    <div className="container content-box">
      <header className="page-header">
        <h1>Press Kit</h1>
        <p>
          取材・掲載向けの基本資料をまとめています。掲載の際はガイドラインの
          事前確認をお願いいたします。
        </p>
      </header>

      <section className="table-list section">
        {assets.map((asset) => (
          <article key={asset.title} className="table-row">
            <div>
              <h3>{asset.title}</h3>
              <p>{asset.desc}</p>
            </div>
            <div className="muted">更新頻度：月1回</div>
            <a className="button" href={asset.href} download>
              ダウンロード
            </a>
          </article>
        ))}
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <h2 className="section-title">ガイドライン</h2>
            <p className="section-sub">掲載時のルールを簡易的にまとめています。</p>
          </div>
        </div>
        <div className="grid grid-2">
          {guidelines.map((item) => (
            <div key={item} className="card">
              <p>{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="notice">
        素材の更新が必要な場合は Contact からご連絡ください。急ぎの場合は
        メールでの事前連絡も受け付けています。
      </section>
    </div>
  );
}
