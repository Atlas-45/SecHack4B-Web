"use client";

import { useState } from "react";

const faqItems = [
  {
    question: "取材・メディア掲載について",
    answer:
      "プレスページより素材をダウンロードいただけます。追加素材や取材のご依頼については、お問い合わせフォームよりご連絡ください。",
  },
  {
    question: "作品データのダウンロードは可能ですか？",
    answer:
      "一部の作品については、条件付きでダウンロードを許可しております。詳しくは各作品ページをご確認ください。",
  },
  {
    question: "開発者ツールのコンソールに不自然な文章が表示されます",
    answer:
      "こちらはバグとして認識しております。現在修正を予定しておりますので、今しばらくお待ちください。",
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      style={{
        borderBottom: "1px solid #eee",
        padding: "20px 0",
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          padding: 0,
          fontFamily: "inherit",
        }}
      >
        <span
          style={{ fontSize: "16px", fontWeight: "bold", color: "var(--text)" }}
        >
          {question}
        </span>
        <span
          style={{
            fontSize: "20px",
            color: "var(--accent)",
            transform: isOpen ? "rotate(45deg)" : "rotate(0)",
            transition: "transform 0.2s ease",
          }}
        >
          +
        </span>
      </button>
      {isOpen && (
        <p
          style={{
            marginTop: "15px",
            fontSize: "14px",
            lineHeight: "1.8",
            color: "var(--text-light)",
          }}
        >
          {answer}
        </p>
      )}
    </div>
  );
}

export default function ContactPage() {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [showSentPopup, setShowSentPopup] = useState(false);

  const handleSubmit = () => {
    if (!to.trim() || !subject.trim() || !message.trim()) return;

    const hasEmail = to.trim() === "gk-ai-assistant@glasskey.archive";
    const hasToken = subject.includes(
      "sk-gkai-Xm9Pq2Lw8nKj4vR7tY3hB6dF5sA1cE0",
    );

    if (hasEmail && hasToken) {
      window.dispatchEvent(
        new CustomEvent("contact-form-submit", {
          detail: { to, subject, message },
        }),
      );
    }

    setShowSentPopup(true);
  };

  return (
    <>
      {showSentPopup && (
        <div
          data-popup-overlay
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: 10000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setShowSentPopup(false)}
        >
          <div
            style={{
              background: "var(--bg, #fff)",
              borderRadius: "12px",
              padding: "40px",
              maxWidth: "400px",
              width: "90%",
              boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
              textAlign: "center",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                width: "50px",
                height: "50px",
                margin: "0 auto 20px",
                borderRadius: "50%",
                background: "#e8f5e9",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
              }}
            >
              ✓
            </div>
            <h3
              style={{
                fontSize: "18px",
                marginBottom: "15px",
                fontFamily: "var(--font-serif), serif",
              }}
            >
              送信完了
            </h3>
            <p
              style={{
                fontSize: "14px",
                lineHeight: "1.8",
                color: "var(--text-light)",
                marginBottom: "25px",
              }}
            >
              お問い合わせを送信しました。
            </p>
            <button
              type="button"
              className="button"
              onClick={() => setShowSentPopup(false)}
              style={{ paddingInline: "40px" }}
            >
              閉じる
            </button>
          </div>
        </div>
      )}
      <div className="container" style={{ paddingBlock: "60px" }}>
        <header
          className="page-header"
          style={{
            textAlign: "center",
            borderBottom: "none",
            marginBottom: "60px",
          }}
        >
          <h1 style={{ fontSize: "3rem", marginBottom: "20px" }}>Contact</h1>
          <p
            style={{
              maxWidth: "600px",
              margin: "0 auto",
              color: "var(--text-light)",
            }}
          >
            作品に関するお問い合わせを承っております。
            ██営業日以内に担当者より折り返しご連絡いたします。
          </p>
        </header>

        <section
          className="two-col"
          style={{ gap: "60px", alignItems: "start" }}
        >
          <form
            className="card form"
            style={{
              padding: "40px",
              border: "none",
              boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
            }}
          >
            <div style={{ display: "grid", gap: "25px" }}>
              <label style={{ display: "block" }}>
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    color: "var(--text)",
                    marginBottom: "8px",
                    display: "block",
                  }}
                >
                  宛先メールアドレス
                </span>
                <input
                  className="input"
                  type="email"
                  name="to"
                  placeholder="example@domain.jp"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  style={{ background: "var(--bg-alt)", border: "none" }}
                />
              </label>
              <label style={{ display: "block" }}>
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    color: "var(--text)",
                    marginBottom: "8px",
                    display: "block",
                  }}
                >
                  件名
                </span>
                <input
                  className="input"
                  type="text"
                  name="subject"
                  placeholder="例：作品についてのお問い合わせ"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  style={{ background: "var(--bg-alt)", border: "none" }}
                />
              </label>
              <label style={{ display: "block" }}>
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    color: "var(--text)",
                    marginBottom: "8px",
                    display: "block",
                  }}
                >
                  本文
                </span>
                <textarea
                  className="textarea"
                  name="message"
                  placeholder="詳細な内容をご記入ください"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{
                    background: "var(--bg-alt)",
                    border: "none",
                    minHeight: "200px",
                  }}
                />
              </label>
              <button
                className="button"
                type="button"
                onClick={handleSubmit}
                disabled={!to.trim() || !subject.trim() || !message.trim()}
                style={{
                  paddingBlock: "15px",
                  fontSize: "16px",
                  letterSpacing: "0.05em",
                  opacity:
                    !to.trim() || !subject.trim() || !message.trim() ? 0.5 : 1,
                  cursor:
                    !to.trim() || !subject.trim() || !message.trim()
                      ? "not-allowed"
                      : "pointer",
                }}
              >
                送信する
              </button>
              <p
                style={{ fontSize: "12px", color: "#999", textAlign: "center" }}
              >
                ※AIアシスタント宛の場合、チャットパネルに応答が表示されます。
              </p>
            </div>
          </form>

          <div style={{ position: "sticky", top: "120px" }}>
            <div
              className="card"
              style={{
                padding: 0,
                overflow: "hidden",
                border: "none",
                boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
              }}
            >
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
                <h3
                  style={{
                    fontSize: "20px",
                    marginBottom: "25px",
                    fontFamily: "var(--font-serif), serif",
                  }}
                >
                  Information
                </h3>
                <div style={{ display: "grid", gap: "20px" }}>
                  <div style={{ display: "flex", gap: "15px" }}>
                    <span
                      style={{ color: "var(--accent)", fontWeight: "bold" }}
                    >
                      OFFICE
                    </span>
                    <div
                      style={{ fontSize: "14px", color: "var(--text-light)" }}
                    >
                      ██████（██████）
                      <br />
                      ※一般公開はしておりません
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "15px" }}>
                    <span
                      style={{ color: "var(--accent)", fontWeight: "bold" }}
                    >
                      EMAIL
                    </span>
                    <div
                      style={{ fontSize: "14px", color: "var(--text-light)" }}
                    >
                      ██████@██████.██
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "15px" }}>
                    <span
                      style={{ color: "var(--accent)", fontWeight: "bold" }}
                    >
                      HOURS
                    </span>
                    <div
                      style={{ fontSize: "14px", color: "var(--text-light)" }}
                    >
                      ██:00 - ██:00
                      <br />
                      （██████を除く）
                    </div>
                  </div>
                </div>
                <div
                  className="notice"
                  style={{ marginTop: "30px", fontSize: "13px" }}
                >
                  <strong>注意:</strong>
                  <br />
                  ██████に関するお問い合わせには回答いたしかねます。
                </div>
              </div>
            </div>
          </div>
        </section>

        <section style={{ marginTop: "80px" }}>
          <h2
            style={{
              fontSize: "28px",
              fontFamily: "var(--font-serif), serif",
              textAlign: "center",
              marginBottom: "40px",
            }}
          >
            よくあるご質問
          </h2>
          <div
            className="card"
            style={{
              maxWidth: "800px",
              margin: "0 auto",
              padding: "20px 40px",
              border: "none",
              boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
            }}
          >
            {faqItems.map((item, index) => (
              <FAQItem
                key={index}
                question={item.question}
                answer={item.answer}
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
