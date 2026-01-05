export default function HiddenPage() {
  return (
    <div className="container content-box">
      <header className="page-header">
        <h1>Archive Access</h1>
        <p>
          ここは公開ページではありません。ケースIDがある場合のみ続行できます。
        </p>
      </header>

      <section className="card">
        <h3>CASE ID</h3>
        <p className="muted">
          招待状に記載された識別子を入力してください。
        </p>
        <div className="form">
          <input className="input" type="text" placeholder="CASE-XXXX" />
          <button className="button" type="button">
            送信
          </button>
        </div>
      </section>

      <section className="notice">
        認証情報はURLに含めず、識別子のみを入力してください。
      </section>
    </div>
  );
}
