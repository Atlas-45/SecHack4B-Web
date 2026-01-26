export default function HiddenPage() {
  return (
    <div className="container content-box">
      <header className="page-header">
        <h1>A̷r̶c̸h̵i̴v̷e̶ ̸A̵c̴c̷e̴s̵s̷</h1>
        <p>
          このページは公開されていません。正規のアクセス権をお持ちの方のみ続行できます。
        </p>
      </header>

      <section className="card">
        <h3>認証コード</h3>
        <p className="muted">
          あなたが受け取った識別子を入力してください。
        </p>
        <div className="form">
          <input className="input" type="text" placeholder="████-████-████" />
          <button className="button" type="button">
            認証
          </button>
        </div>
      </section>

      <section className="notice" style={{ marginTop: "30px" }}>
        <p style={{ marginBottom: "10px" }}>認証情報はURLに含めず、識別子のみを入力してください。</p>
        <p style={{ fontSize: "12px", color: "#999" }}>
          ヒント: すべてが見えているわけではない。
        </p>
      </section>
    </div>
  );
}
