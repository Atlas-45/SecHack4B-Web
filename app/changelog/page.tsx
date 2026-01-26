import Link from "next/link";
import { changelog } from "../data/changelog";

export default function ChangelogPage() {
  return (
    <div className="container" style={{ paddingBlock: "80px" }}>
      <header className="page-header" style={{ textAlign: "center", borderBottom: "none", marginBottom: "80px" }}>
        <h1 style={{ fontSize: "3rem", marginBottom: "20px", fontFamily: "var(--font-serif), serif" }}>Changelog</h1>
        <p style={{ maxWidth: "600px", margin: "0 auto", color: "var(--text-light)" }}>
          アーカイブの更新履歴。
        </p>
      </header>

      <div style={{ maxWidth: "800px", margin: "0 auto", position: "relative" }}>
        {/* Timeline Line (Visual only, optional) */}
        <div style={{ 
          position: "absolute", 
          left: "0", 
          top: "0", 
          bottom: "0", 
          width: "1px", 
          background: "var(--border)",
          display: "none" // Hidden for now, maybe too complex for simple list
        }} />

        <div style={{ display: "grid", gap: "60px" }}>
          {changelog.map((entry) => (
            <article key={entry.id} style={{ 
              display: "grid", 
              gap: "15px", 
              paddingBottom: "60px", 
              borderBottom: "1px solid #bbb" 
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                <time style={{ 
                  fontFamily: "var(--font-serif), serif", 
                  color: "var(--accent)", 
                  fontSize: "16px",
                  fontWeight: "bold",
                  letterSpacing: "0.05em"
                }}>
                  {entry.date}
                </time>
                <span style={{ 
                  fontSize: "12px", 
                  padding: "2px 8px", 
                  background: "#f0f0f0", 
                  borderRadius: "12px", 
                  color: "#666" 
                }}>
                  Update
                </span>
              </div>
              
              <h2 style={{ fontSize: "24px", lineHeight: "1.4", fontFamily: "var(--font-serif), serif" }}>
                <Link href={`/changelog/${entry.id}`} className="hover-link">
                  {entry.title}
                </Link>
              </h2>
              
              <p style={{ color: "var(--text-light)", lineHeight: "1.8" }}>
                {entry.detail}
              </p>

              <div style={{ marginTop: "10px" }}>
                <Link href={`/changelog/${entry.id}`} style={{ 
                  fontSize: "14px", 
                  textDecoration: "underline", 
                  textUnderlineOffset: "4px",
                  color: "var(--text)" 
                }}>
                  Read more &rarr;
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
