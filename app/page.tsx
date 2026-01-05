import Link from "next/link";

const featuredWorks = [
  {
    title: "霧の河",
    location: "横浜",
    year: "2025",
    cat: "Monochrome",
    image: "https://images.unsplash.com/photo-1617438817509-70e91ad264a5?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "午後の余白",
    location: "代官山",
    year: "2024",
    cat: "Portrait",
    image: "https://images.unsplash.com/photo-1496449903678-68ddcb189a24?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "境界線",
    location: "竹芝",
    year: "2025",
    cat: "Architecture",
    image: "https://images.unsplash.com/photo-1486718448742-166222b70de0?q=80&w=800&auto=format&fit=crop",
  },
];

const updates = [
  {
    date: "2026.01.03",
    cat: "お知らせ",
    title: "プレス素材の整理と命名規則を更新しました。",
  },
  {
    date: "2025.12.18",
    cat: "作品情報",
    title: "作品一覧に2025年展示の記録を追加しました。",
  },
  {
    date: "2025.11.28",
    cat: "お知らせ",
    title: "問い合わせ窓口の受付時間を調整しました。",
  },
];

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
            GLASS KEY Photo Archive は、都市の瞬間を永遠に留めるための
            写真展アーカイブプロジェクトです。
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
            <p className="section-sub">最新のお知らせと更新情報</p>
          </div>
          <div className="news-list">
            {updates.map((item, i) => (
              <div key={i} className="news-item">
                <span className="news-date">{item.date}</span>
                <div className="news-content">
                  <Link href="#" className="news-title">
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
              主要な展示記録とアーカイブ作品
            </p>
          </div>
          <div className="grid grid-3">
            {featuredWorks.map((work, i) => (
              <div key={i} className="work-card">
                <div
                  className="work-img"
                  style={{
                    backgroundImage: `url(${work.image})`,
                  }}
                />
                <div className="work-body">
                  <span className="work-cat">{work.cat}</span>
                  <h3 className="work-title">{work.title}</h3>
                  <p className="work-meta">
                    {work.location} / {work.year}
                  </p>
                </div>
              </div>
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
                都市の記憶を<br />
                未来へ繋ぐ。
              </h3>
              <p style={{ marginBottom: "20px", color: "#666" }}>
                私たちは、急速に変化する都市の風景を写真という媒体を通じて記録・保存しています。
                展示会ごとに発表される作品群は、その一瞬の光景を切り取った貴重な資料です。
              </p>
              <p style={{ color: "#666" }}>
                本アーカイブでは、過去の展示記録を体系的に整理し、
                閲覧可能な状態で保存することを目的としています。
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
            作品の貸出、取材、その他のお問い合わせはこちらからお願いいたします。
          </p>
          <Link href="/contact" className="btn">
            Contact Form
          </Link>
        </div>
      </section>
    </>
  );
}
