export default function ContactPage() {
  return (
    <div className="container" style={{ paddingBlock: "60px" }}>
      <header className="page-header" style={{ textAlign: "center", borderBottom: "none", marginBottom: "60px" }}>
        <h1 style={{ fontSize: "3rem", marginBottom: "20px" }}>Contact</h1>
        <p style={{ maxWidth: "600px", margin: "0 auto", color: "var(--text-light)" }}>
          作品に関するお問い合わせを承っております。
          ██営業日以内に担当者より折り返しご連絡いたします。
        </p>
      </header>

      <section className="two-col" style={{ gap: "60px", alignItems: "start" }}>
        <form className="card form" style={{ padding: "40px", border: "none", boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
          <div style={{ display: "grid", gap: "25px" }}>
            <label style={{ display: "block" }}>
              <span style={{ fontSize: "14px", fontWeight: "bold", color: "var(--text)", marginBottom: "8px", display: "block" }}>お名前</span>
              <input className="input" type="text" name="name" placeholder="例：山田 太郎" style={{ background: "var(--bg-alt)", border: "none" }} />
            </label>
            <label style={{ display: "block" }}>
              <span style={{ fontSize: "14px", fontWeight: "bold", color: "var(--text)", marginBottom: "8px", display: "block" }}>メールアドレス</span>
              <input
                className="input"
                type="email"
                name="email"
                placeholder="example@domain.jp"
                style={{ background: "var(--bg-alt)", border: "none" }}
              />
            </label>
            <label style={{ display: "block" }}>
              <span style={{ fontSize: "14px", fontWeight: "bold", color: "var(--text)", marginBottom: "8px", display: "block" }}>お問い合わせ種別</span>
              <select className="input" style={{ background: "var(--bg-alt)", border: "none", appearance: "none" }}>
                <option>作品・展示に関するお問い合わせ</option>
                <option>メディア掲載・取材依頼</option>
                <option>作品の購入・貸出について</option>
                <option>その他</option>
              </select>
            </label>
            <label style={{ display: "block" }}>
              <span style={{ fontSize: "14px", fontWeight: "bold", color: "var(--text)", marginBottom: "8px", display: "block" }}>メッセージ</span>
              <textarea 
                className="textarea" 
                name="message" 
                placeholder="詳細な内容をご記入ください" 
                style={{ background: "var(--bg-alt)", border: "none", minHeight: "200px" }} 
              />
            </label>
            <button className="button" type="button" style={{ paddingBlock: "15px", fontSize: "16px", letterSpacing: "0.05em" }}>
              送信内容を確認する
            </button>
            <p style={{ fontSize: "12px", color: "#999", textAlign: "center" }}>※現在、フォームはデモ運用中です。</p>
          </div>
        </form>

        <div style={{ position: "sticky", top: "120px" }}>
          <div className="card" style={{ padding: 0, overflow: "hidden", border: "none", boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
            <div
              style={{
                height: "260px",
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div style={{ padding: "40px" }}>
              <h3 style={{ fontSize: "20px", marginBottom: "25px", fontFamily: "var(--font-serif), serif" }}>Information</h3>
              <div style={{ display: "grid", gap: "20px" }}>
                <div style={{ display: "flex", gap: "15px" }}>
                  <span style={{ color: "var(--accent)", fontWeight: "bold" }}>OFFICE</span>
                  <div style={{ fontSize: "14px", color: "var(--text-light)" }}>
                    ██████（██████）<br />
                    ※一般公開はしておりません
                  </div>
                </div>
                <div style={{ display: "flex", gap: "15px" }}>
                  <span style={{ color: "var(--accent)", fontWeight: "bold" }}>EMAIL</span>
                  <div style={{ fontSize: "14px", color: "var(--text-light)" }}>
                    ██████@██████.██
                  </div>
                </div>
                <div style={{ display: "flex", gap: "15px" }}>
                  <span style={{ color: "var(--accent)", fontWeight: "bold" }}>HOURS</span>
                  <div style={{ fontSize: "14px", color: "var(--text-light)" }}>
                    ██:00 - ██:00<br />
                    （██████を除く）
                  </div>
                </div>
              </div>
              <div className="notice" style={{ marginTop: "30px", fontSize: "13px" }}>
                <strong>注意:</strong><br />
                ██████に関するお問い合わせには回答いたしかねます。
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
