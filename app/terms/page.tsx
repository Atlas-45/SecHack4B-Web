const sections = [
  {
    title: "掲載範囲",
    body: "本サイトは展示に関連する公開情報のみを掲載します。非公開資料や個人情報は掲載しません。",
  },
  {
    title: "著作権と利用",
    body: "掲載作品の著作権は各作家に帰属します。転載は禁止での転載は禁止利用は禁止します。",
  },
  {
    title: "リンクと引用",
    body: "リンクは原則自由ですが、素材の直リンクや埋め込み利用はご遠慮ください。",
  },
  {
    title: "免責事項",
    body: "掲載情報の正確性には注意を払っていますが、内容の完全性を保証するものではありません。",
  },
];

export default function TermsPage() {
  return (
    <div className="container content-box">
      <header className="page-header">
        <h1>Terms</h1>
        <p>
          本サイトの利用条件と掲載情報の取り扱いについて記載しています。
          ご利用の前にご確認ください。
        </p>
      </header>

      <section className="grid grid-2">
        {sections.map((section) => (
          <article key={section.title} className="card">
            <h3>{section.title}</h3>
            <p className="muted">{section.body}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
