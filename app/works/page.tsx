const works = [
  {
    title: "霧の河",
    location: "横浜",
    year: "2025",
    tag: "Monochrome",
    image: "https://images.unsplash.com/photo-1617438817509-70e91ad264a5?q=80&w=600&auto=format&fit=crop",
    id: "GK-025",
  },
  {
    title: "午後の余白",
    location: "代官山",
    year: "2024",
    tag: "Portrait",
    image: "https://images.unsplash.com/photo-1496449903678-68ddcb189a24?q=80&w=600&auto=format&fit=crop",
    id: "GK-018",
  },
  {
    title: "境界線",
    location: "竹芝",
    year: "2025",
    tag: "Architecture",
    image: "https://images.unsplash.com/photo-1493934558415-9d19f0b2b4d2?q=80&w=600&auto=format&fit=crop",
    id: "GK-021",
  },
  {
    title: "雨の標本",
    location: "神田",
    year: "2023",
    tag: "Series",
    image: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=600&auto=format&fit=crop",
    id: "GK-012",
  },
  {
    title: "光の搬送",
    location: "新木場",
    year: "2024",
    tag: "Industrial",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop",
    id: "GK-019",
  },
  {
    title: "旧街区",
    location: "根岸",
    year: "2022",
    tag: "Landscape",
    image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=600&auto=format&fit=crop",
    id: "GK-009",
  },
  {
    title: "雨粒の建築",
    location: "天王洲",
    year: "2025",
    tag: "Architecture",
    image: "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?q=80&w=600&auto=format&fit=crop",
    id: "GK-026",
  },
  {
    title: "薄明",
    location: "上野",
    year: "2023",
    tag: "Portrait",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop",
    id: "GK-013",
  },
  {
    title: "航路",
    location: "芝浦",
    year: "2024",
    tag: "Series",
    image: "https://images.unsplash.com/photo-1542931287-023b922fa89b?q=80&w=600&auto=format&fit=crop",
    id: "GK-017",
  },
];

const tags = [
  "Monochrome",
  "Portrait",
  "Architecture",
  "Series",
  "Landscape",
  "Industrial",
];

export default function WorksPage() {
  return (
    <div className="container">
      <header className="page-header">
        <h1>Works</h1>
        <p>
          展示ごとの作品アーカイブ一覧です。会場と公開年を記録しています。
          詳細な来歴や非公開素材は掲載していません。
        </p>
      </header>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="badge-grid">
          {tags.map((tag) => (
            <span key={tag} className="tag" data-tag={tag}>
              {tag}
            </span>
          ))}
        </div>
      </section>

      <section className="grid grid-3">
        {works.map((work) => (
          <article key={work.id} className="card work-card" data-id={work.id}>
            <div className="work-img" style={{ backgroundImage: `url(${work.image})` }} />
            <div className="work-body">
              <span className="tag">{work.tag}</span>
              <h3 className="work-title" style={{ fontSize: "18px", marginTop: "10px" }}>{work.title}</h3>
              <p className="work-meta">
                {work.location} / {work.year}
              </p>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
