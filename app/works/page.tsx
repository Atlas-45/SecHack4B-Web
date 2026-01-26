"use client";

import Link from "next/link";
import { useState } from "react";
import { works } from "../data/works";

const tags = [
  "Monochrome",
  "Portrait",
  "Architecture",
  "Series",
  "Landscape",
  "Industrial",
];

export default function WorksPage() {
  const [selectedTag, setSelectedTag] = useState("All");

  const filteredWorks = selectedTag === "All" 
    ? works 
    : works.filter((work) => work.tag === selectedTag);

  return (
    <div className="container" style={{ paddingBlock: "60px" }}>
      <header className="page-header" style={{ marginBottom: "60px", borderBottom: "none", textAlign: "center" }}>
        <h1 style={{ fontSize: "3rem", marginBottom: "20px" }}>Works</h1>
        <p style={{ maxWidth: "600px", margin: "0 auto", color: "var(--text-light)" }}>
          「██████」による作品アーカイブ。
          現在公開が許可されている作品のみを掲載しています。
        </p>
      </header>

      <section style={{ marginBottom: "60px" }}>
        <div className="badge-grid" style={{ justifyContent: "center" }}>
          <button 
            onClick={() => setSelectedTag("All")}
            className="tag" 
            style={{ 
              background: selectedTag === "All" ? "var(--accent)" : "#f0f0f0", 
              color: selectedTag === "All" ? "white" : "#555",
              border: "none",
              cursor: "pointer",
              fontSize: "13px",
              fontFamily: "inherit"
            }}
          >
            All
          </button>
          {tags.map((tag) => (
            <button 
              key={tag} 
              onClick={() => setSelectedTag(tag)}
              className="tag" 
              style={{
                background: selectedTag === tag ? "var(--accent)" : "#f0f0f0", 
                color: selectedTag === tag ? "white" : "#555",
                border: "none",
                cursor: "pointer",
                fontSize: "13px",
                fontFamily: "inherit"
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      <section className="grid grid-3">
        {filteredWorks.map((work) => (
          <Link href={`/works/${work.id}`} key={work.id} className="work-card" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="work-img" style={{ backgroundImage: `url(${work.image})`, height: "240px" }} />
            <div className="work-body">
              <span className="work-cat" style={{ fontSize: "11px", letterSpacing: "0.1em" }}>{work.tag}</span>
              <h3 className="work-title" style={{ fontSize: "20px", marginTop: "5px", marginBottom: "15px" }}>{work.title}</h3>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <p className="work-meta" style={{ fontSize: "12px", fontFamily: "monospace" }}>
                  {work.location} / {work.year}
                </p>
                <span style={{ fontSize: "12px", color: "var(--accent)" }}>View Detail &rarr;</span>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
