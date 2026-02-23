import { works } from "../../data/works";
import Link from "next/link";
import { notFound } from "next/navigation";
import WorkDownload from "../../components/WorkDownload";
import ProtectedWork from "../../components/ProtectedWork";

export function generateStaticParams() {
  return works.map((work) => ({
    id: work.id,
  }));
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const work = works.find((w) => w.id === id);

  if (!work) {
    notFound();
  }

  const content = (
    <div className="container" style={{ paddingBlock: "80px" }}>
      <div
        style={{
          marginBottom: "40px",
          display: "flex",
          gap: "15px",
          alignItems: "center",
        }}
      >
        <Link href="/works" className="btn-outline">
          &larr; Back to Works
        </Link>
        <WorkDownload id={work.id} />
      </div>

      <header style={{ marginBottom: "60px", maxWidth: "800px" }}>
        <div
          style={{
            display: "flex",
            gap: "15px",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <span
            className="tag"
            style={
              work.id === "GK-014"
                ? {
                    background: "#000",
                    color: "#000",
                    userSelect: "none",
                  }
                : undefined
            }
          >
            {work.tag}
          </span>
          <span
            style={{
              color: "var(--text-light)",
              fontFamily: "monospace",
              fontSize: "14px",
              ...(work.id === "GK-014" && {
                background: "#000",
                color: "#000",
                userSelect: "none",
                padding: "0 4px",
              }),
            }}
          >
            {work.id}
          </span>
        </div>
        <h1
          style={{
            fontFamily: "var(--font-serif), serif",
            fontSize: "clamp(32px, 5vw, 48px)",
            lineHeight: "1.2",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "15px",
            flexWrap: "wrap",
          }}
        >
          {work.id === "GK-014" ? (
            <>
              <span
                style={{
                  background: "#000",
                  color: "#000",
                  userSelect: "none",
                  padding: "0 8px",
                }}
              >
                {work.title}
              </span>
              <span
                style={{
                  background: "#c00",
                  color: "#fff",
                  fontSize: "14px",
                  padding: "4px 12px",
                  borderRadius: "4px",
                  fontFamily: "monospace",
                  fontWeight: "normal",
                }}
              >
                ⚠ データが破損しています
              </span>
            </>
          ) : (
            work.title
          )}
        </h1>
        <div
          style={{
            display: "flex",
            gap: "30px",
            fontSize: "16px",
            color: "var(--text-light)",
          }}
        >
          <span>
            <strong>Year:</strong>{" "}
            {work.id === "GK-014" ? (
              <span
                style={{
                  background: "#000",
                  color: "#000",
                  userSelect: "none",
                  padding: "0 4px",
                }}
              >
                {work.year}
              </span>
            ) : (
              work.year
            )}
          </span>
        </div>
      </header>

      <div
        style={{
          width: "100%",
          aspectRatio: "16/9",
          backgroundImage: `url(${work.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "8px",
          marginBottom: "60px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
        }}
      />

      <div className="two-col" style={{ alignItems: "start" }}>
        <div>
          <h2
            style={{
              fontFamily: "var(--font-serif), serif",
              fontSize: "24px",
              marginBottom: "30px",
              borderBottom: "2px solid var(--accent)",
              display: "inline-block",
              paddingBottom: "5px",
            }}
          >
            Project Overview
          </h2>
          <p
            style={{
              fontSize: "18px",
              lineHeight: "2",
              color: "var(--text)",
              textAlign: "justify",
              marginBottom: "40px",
            }}
          >
            {work.id === "GK-014" ? (
              <span
                style={{
                  background: "#000",
                  color: "#000",
                  userSelect: "none",
                  padding: "0 4px",
                }}
              >
                {work.description}
              </span>
            ) : (
              work.description
            )}
          </p>
        </div>

        <div
          className="card"
          style={{ background: "var(--bg-alt)", border: "none" }}
        >
          <h3
            style={{
              fontSize: "18px",
              marginBottom: "20px",
              fontFamily: "var(--font-serif), serif",
            }}
          >
            Technical Data
          </h3>
          <ul style={{ listStyle: "none", display: "grid", gap: "15px" }}>
            <li
              style={{
                display: "grid",
                gridTemplateColumns: "120px 1fr",
                gap: "10px",
                fontSize: "14px",
              }}
            >
              <span style={{ color: "var(--text-light)", fontWeight: "bold" }}>
                Camera
              </span>
              <span>Leica M10-R</span>
            </li>
            <li
              style={{
                display: "grid",
                gridTemplateColumns: "120px 1fr",
                gap: "10px",
                fontSize: "14px",
              }}
            >
              <span style={{ color: "var(--text-light)", fontWeight: "bold" }}>
                Lens
              </span>
              <span>Summilux-M 35mm f/1.4</span>
            </li>
            <li
              style={{
                display: "grid",
                gridTemplateColumns: "120px 1fr",
                gap: "10px",
                fontSize: "14px",
              }}
            >
              <span style={{ color: "var(--text-light)", fontWeight: "bold" }}>
                Simulation
              </span>
              <span>Custom Monochrome</span>
            </li>
            <li
              style={{
                display: "grid",
                gridTemplateColumns: "120px 1fr",
                gap: "10px",
                fontSize: "14px",
              }}
            >
              <span style={{ color: "var(--text-light)", fontWeight: "bold" }}>
                Print
              </span>
              <span>Gelatin Silver Print</span>
            </li>
            <li
              style={{
                display: "grid",
                gridTemplateColumns: "120px 1fr",
                gap: "10px",
                fontSize: "14px",
              }}
            >
              <span style={{ color: "var(--text-light)", fontWeight: "bold" }}>
                Size
              </span>
              <span>A2 (420 x 594 mm)</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );

  // GK-027はパスワード保護
  if (work.id === "GK-027") {
    return <ProtectedWork workId={work.id}>{content}</ProtectedWork>;
  }

  return content;
}
