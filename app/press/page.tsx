import Link from "next/link";

const pressKits = [
  {
    id: "alpha",
    title: "Press Kit A",
    desc: "基本素材（標準パッケージ）",
    code: "KIT-A",
    files: [
      {
        title: "プレスキット",
        desc: "展示概要、ステートメント、コンセプト。",
        href: "/press/kit-alpha/press-kit.txt",
        size: "1.2 MB",
      },
      {
        title: "掲載クレジット",
        desc: "作家名、会場、協力クレジット。",
        href: "/press/kit-alpha/credits.txt",
        size: "450 KB",
      },
      {
        title: "画像リスト",
        desc: "公開可能な画像の整理とファイル名一覧。",
        href: "/press/kit-alpha/image-list.txt",
        size: "820 KB",
      },
      {
        title: "README",
        desc: "内容と利用条件の簡易メモ。",
        href: "/press/kit-alpha/README.txt",
        size: "3 KB",
      },
    ],
  },
  {
    id: "beta",
    title: "Press Kit B",
    desc: "拡張素材（サブカット中心）",
    code: "KIT-B",
    files: [
      {
        title: "プレスキット",
        desc: "展示概要、ディレクターコメント。",
        href: "/press/kit-beta/press-kit.txt",
        size: "1.1 MB",
      },
      {
        title: "掲載クレジット",
        desc: "クレジット一覧（短縮版）。",
        href: "/press/kit-beta/credits.txt",
        size: "420 KB",
      },
      {
        title: "画像リスト",
        desc: "差し替え用のサブカット一覧。",
        href: "/press/kit-beta/image-list.txt",
        size: "780 KB",
      },
      {
        title: "README",
        desc: "内容と利用条件の簡易メモ。",
        href: "/press/kit-beta/README.txt",
        size: "3 KB",
      },
    ],
  },
  {
    id: "gamma",
    title: "Press Kit C",
    desc: "アーカイブ向け（記録重視）",
    code: "KIT-C",
    files: [
      {
        title: "プレスキット",
        desc: "展示概要、背景資料の簡易版。",
        href: "/press/kit-gamma/press-kit.txt",
        size: "1.0 MB",
      },
      {
        title: "掲載クレジット",
        desc: "関係者・協力者の一覧。",
        href: "/press/kit-gamma/credits.txt",
        size: "430 KB",
      },
      {
        title: "画像リスト",
        desc: "アーカイブ用のファイル名一覧。",
        href: "/press/kit-gamma/image-list.txt",
        size: "800 KB",
      },
      {
        title: "README",
        desc: "内容と利用条件の簡易メモ。",
        href: "/press/kit-gamma/README.txt",
        size: "4 KB",
      },
    ],
  },
];

const guidelines = [
  { title: "利用目的", text: "用途は報道・紹介目的に限ります。商業販売物への無断転載は固くお断りします。" },
  { title: "改変の禁止", text: "画像のトリミングや色味の変更は最小限でお願いします。作品の意図を損なわないよう配慮ください。" },
  { title: "クレジット", text: "「© GLASS KEY / ██████」といった形式でのクレジット表記を必須としています。" },
  { title: "事前確認", text: "大きなメディアでの掲載前には、事実確認のため必ず内容の校正をお願いしております。" },
];

export default function PressPage() {
  return (
    <div className="container" style={{ paddingBlock: "80px" }}>
      <header className="page-header" style={{ textAlign: "center", borderBottom: "none", marginBottom: "80px" }}>
        <h1 style={{ fontSize: "3rem", marginBottom: "20px", fontFamily: "var(--font-serif), serif" }}>Press Kit</h1>
        <p style={{ maxWidth: "600px", margin: "0 auto", color: "var(--text-light)" }}>
          取材・掲載向けの公式素材。
          「██████」に関する情報は含まれていません。
        </p>
      </header>

      <div
        style={{
          height: "360px",
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=1200&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "4px",
          marginBottom: "80px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          textAlign: "center",
          boxShadow: "0 20px 40px rgba(0,0,0,0.15)"
        }}
      >
        <span style={{ fontSize: "13px", letterSpacing: "0.2em", marginBottom: "15px", opacity: 0.9, fontWeight: "500" }}>OFFICIAL MATERIALS</span>
        <h2 style={{ fontSize: "42px", fontFamily: "var(--font-serif), serif", fontWeight: "400", letterSpacing: "0.05em" }}>Download Center</h2>
      </div>

      <section className="section" style={{ paddingTop: 0, paddingBottom: "80px" }}>
        <div style={{ display: "grid", gap: "40px" }}>
          {pressKits.map((kit) => (
            <div key={kit.id} className="card" style={{ padding: "40px", border: "1px solid var(--border)", boxShadow: "0 5px 20px rgba(0,0,0,0.04)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "20px", marginBottom: "25px" }}>
                <div>
                  <h2 style={{ fontSize: "22px", marginBottom: "6px", fontFamily: "var(--font-serif), serif" }}>{kit.title}</h2>
                  <p style={{ fontSize: "14px", color: "var(--text-light)" }}>{kit.desc}</p>
                </div>
                <span style={{ fontSize: "12px", color: "#999", letterSpacing: "0.2em" }}>{kit.code}</span>
              </div>
              <div className="table-list">
                {kit.files.map((asset) => (
                  <div key={asset.title} className="table-row" style={{ padding: "22px 25px" }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: "18px", marginBottom: "6px", fontFamily: "var(--font-serif), serif" }}>{asset.title}</h3>
                      <p style={{ fontSize: "14px", color: "var(--text-light)" }}>{asset.desc}</p>
                    </div>
                    <div style={{ paddingInline: "30px", textAlign: "right", minWidth: "140px" }}>
                      <span style={{ display: "block", fontSize: "12px", color: "#999", fontFamily: "monospace", marginBottom: "4px" }}>SIZE: {asset.size}</span>
                      <span style={{ display: "block", fontSize: "12px", color: "#999" }}>Monthly Update</span>
                    </div>
                    <a className="button" href={asset.href} download style={{ minWidth: "140px", borderRadius: "0", background: "#333" }}>
                      Download &darr;
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section" style={{ background: "var(--bg-alt)", marginInline: "calc(50% - 50vw)", paddingInline: "calc(50vw - 50%)", paddingBlock: "100px" }}>
        <div className="container">
          <div className="section-head">
            <h2 className="section-title" style={{ fontFamily: "var(--font-serif), serif" }}>Guidelines</h2>
            <p className="section-sub">掲載時のルールと遵守事項</p>
          </div>
          <div className="grid grid-2" style={{ gap: "40px" }}>
            {guidelines.map((item) => (
              <div key={item.title} className="card" style={{ border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.05)", padding: "40px" }}>
                <h3 style={{ fontSize: "18px", marginBottom: "15px", display: "flex", alignItems: "center", gap: "10px", color: "var(--accent)", fontFamily: "var(--font-serif), serif" }}>
                  <span style={{ width: "6px", height: "6px", background: "var(--accent)", borderRadius: "50%" }} />
                  {item.title}
                </h3>
                <p style={{ fontSize: "15px", color: "var(--text-light)", lineHeight: "1.8" }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="notice" style={{ marginTop: "80px", textAlign: "center", background: "transparent", border: "1px solid var(--border)", color: "var(--text-light)", maxWidth: "800px", marginInline: "auto" }}>
        その他の高解像度データが必要な場合は <Link href="/contact" style={{ fontWeight: "bold", textDecoration: "underline", color: "var(--text)" }}>Contact</Link> から個別にご相談ください。
      </div>
    </div>
  );
}
