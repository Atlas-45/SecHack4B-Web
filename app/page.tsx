import Link from "next/link";
import { works } from "./data/works";
import { changelog } from "./data/changelog";

// Featured works: Pick the first 3
const featuredWorks = works.slice(0, 3);
// Recent updates: Pick the first 3
const recentUpdates = changelog.slice(0, 3);

export default function Home() {
  return (
    <>
      <div
        className="hero-section"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1920&auto=format&fit=crop')",
        }}
      >
        <div className="container hero-content">
          <h1 className="hero-title">記録という、美学。</h1>
          <p className="hero-desc">
            「██████」による作品を展示するアーカイブサイトです。
          </p>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
            <Link href="/works" className="btn">
              View Works
            </Link>
            <Link href="/contact" className="btn-outline">
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2 className="section-title">News</h2>
            <p className="section-sub">最新のお知らせ</p>
          </div>
          <div className="news-list">
            {recentUpdates.map((item) => (
              <div key={item.id} className="news-item">
                <span className="news-date">{item.date}</span>
                <div className="news-content">
                  <Link href={`/changelog/${item.id}`} className="news-title">
                    {item.title}
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "right", marginTop: "20px", maxWidth: "900px", marginInline: "auto" }}>
            <Link href="/changelog" style={{ fontSize: "14px", fontWeight: "bold" }}>
              一覧を見る &rarr;
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-gray">
        <div className="container">
          <div className="section-head">
            <h2 className="section-title">Works</h2>
            <p className="section-sub">
              展示作品のアーカイブ
            </p>
          </div>
          <div className="grid grid-3">
            {featuredWorks.map((work) => (
              <Link key={work.id} href={`/works/${work.id}`} className="work-card" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                <div
                  className="work-img"
                  style={{
                    backgroundImage: `url(${work.image})`,
                  }}
                />
                <div className="work-body">
                  <span className="work-cat">{work.tag}</span>
                  <h3 className="work-title">{work.title}</h3>
                  <p className="work-meta">
                    {work.location} / {work.year}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <Link href="/works" className="btn-outline">
              すべての作品を見る
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2 className="section-title">About Archive</h2>
            <p className="section-sub">GLASS KEYについて</p>
          </div>
          <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", alignItems: "center", gap: "40px" }}>
            <div>
              <h3 style={{ fontSize: "24px", marginBottom: "20px", fontFamily: "serif" }}>
                ██████による<br />
                作品群。
              </h3>
              <p style={{ marginBottom: "20px", color: "#666" }}>
                GLASS KEYは、「██████」による作品を収集・展示するプロジェクトです。
                作者についての情報は██されています。
              </p>
              <p style={{ color: "#666" }}>
                本アーカイブでは、これまでに発表された作品を
                閲覧可能な形で保存・公開しています。
              </p>
            </div>
            <div
              style={{
                height: "350px",
                backgroundImage: "url('https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=1000&auto=format&fit=crop')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "8px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
              }}
            />
          </div>
        </div>
      </section>

      <section className="section section-gray" style={{ textAlign: "center" }}>
        <div className="container">
          <h2 style={{ fontSize: "28px", marginBottom: "20px", fontFamily: "serif" }}>
            お問い合わせ
          </h2>
          <p style={{ marginBottom: "30px", maxWidth: "600px", marginInline: "auto" }}>
            展示に関するお問い合わせ、取材依頼などはこちらからお願いいたします。
          </p>
          <Link href="/contact" className="btn">
            Contact Form
          </Link>
        </div>
      </section>
    </>
  );
}
