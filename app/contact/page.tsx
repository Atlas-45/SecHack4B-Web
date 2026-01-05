export default function ContactPage() {
  return (
    <div className="container">
      <header className="page-header">
        <h1>Contact</h1>
        <p>
          取材依頼、素材利用、掲載修正のご相談はこちらからご連絡ください。
          3営業日以内にご返信します。
        </p>
      </header>

      <section className="two-col">
        <form className="card form">
          <label>
            お名前
            <input className="input" type="text" name="name" placeholder="氏名" />
          </label>
          <label>
            メールアドレス
            <input
              className="input"
              type="email"
              name="email"
              placeholder="example@domain.jp"
            />
          </label>
          <label>
            件名
            <input className="input" type="text" name="subject" placeholder="お問い合わせ内容" />
          </label>
          <label>
            内容
            <textarea className="textarea" name="message" placeholder="詳細を入力してください" />
          </label>
          <button className="button" type="button">
            送信（準備中）
          </button>
        </form>

        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <div
            style={{
              height: "220px",
              backgroundImage:
                "url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div style={{ padding: "30px" }}>
            <h3 style={{ marginBottom: "15px" }}>窓口情報</h3>
            <p className="muted">受付時間：平日 10:00 - 17:00</p>
            <p className="muted">メール：info@glasskey.jp</p>
            <p className="muted">所在地：東京都内（詳細は非公開）</p>
            <div className="notice" style={{ marginTop: "20px" }}>
              緊急の修正依頼はメール件名に「至急」と記載してください。
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
