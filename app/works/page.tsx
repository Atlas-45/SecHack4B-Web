const works = [
  {
    title: "霧の河",
    location: "横浜",
    year: "2025",
    tag: "Monochrome",
    tone: "linear-gradient(135deg, #e7e4db, #cfd5cf)",
    id: "GK-025",
  },
  {
    title: "午後の余白",
    location: "代官山",
    year: "2024",
    tag: "Portrait",
    tone: "linear-gradient(135deg, #efe7dd, #d8cdbf)",
    id: "GK-018",
  },
  {
    title: "境界線",
    location: "竹芝",
    year: "2025",
    tag: "Architecture",
    tone: "linear-gradient(135deg, #dfe6e1, #c6d0cc)",
    id: "GK-021",
  },
  {
    title: "雨の標本",
    location: "神田",
    year: "2023",
    tag: "Series",
    tone: "linear-gradient(135deg, #ece9e2, #d8d4cb)",
    id: "GK-012",
  },
  {
    title: "光の搬送",
    location: "新木場",
    year: "2024",
    tag: "Industrial",
    tone: "linear-gradient(135deg, #dfe2e2, #c8d0d6)",
    id: "GK-019",
  },
  {
    title: "旧街区",
    location: "根岸",
    year: "2022",
    tag: "Landscape",
    tone: "linear-gradient(135deg, #efeae1, #d8d0c3)",
    id: "GK-009",
  },
  {
    title: "雨粒の建築",
    location: "天王洲",
    year: "2025",
    tag: "Architecture",
    tone: "linear-gradient(135deg, #e2e6e0, #c9d2cf)",
    id: "GK-026",
  },
  {
    title: "薄明",
    location: "上野",
    year: "2023",
    tag: "Portrait",
    tone: "linear-gradient(135deg, #efe7dc, #d7cfc4)",
    id: "GK-013",
  },
  {
    title: "航路",
    location: "芝浦",
    year: "2024",
    tag: "Series",
    tone: "linear-gradient(135deg, #e8ebe7, #ccd4d0)",
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
    <div className="container content-box">
      <header className="page-header">
        <h1>Works</h1>
        <p>
          展示ごとの作品アーカイブ一覧です。会場と公開年を記録しています。
          詳細な来歴や非公開素材は掲載していません。
        </p>
      </header>

      <section className="section">
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
            <div className="work-media" style={{ backgroundImage: work.tone }} />
            <div className="work-body">
              <span className="tag">{work.tag}</span>
              <h3>{work.title}</h3>
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
