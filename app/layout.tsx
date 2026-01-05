import type { Metadata } from "next";
import Link from "next/link";
import { Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import "./globals.css";

const bodyFont = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-sans",
  display: "swap",
});

const headingFont = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "GLASS KEY Photo Archive",
    template: "%s | GLASS KEY Photo Archive",
  },
  description: "写真展アーカイブと作品紹介の公式サイト。",
};

const navItems = [
  { href: "/", label: "Home" },
  { href: "/works", label: "Works" },
  { href: "/changelog", label: "Changelog" },
  { href: "/press", label: "Press Kit" },
  { href: "/terms", label: "Terms" },
  { href: "/contact", label: "Contact" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${bodyFont.variable} ${headingFont.variable}`}>
        <div className="page-shell">
          <header className="site-header">
            <div className="top-bar">
              <div className="container top-bar-inner">
                <span>Archive / Tokyo</span>
                <div className="top-bar-right">
                  <span>更新: 2026.01.03</span>
                  <form className="search" role="search" action="#">
                    <input type="search" placeholder="Search" />
                    <button type="submit">検索</button>
                  </form>
                </div>
              </div>
            </div>
            <div className="nav-bar">
              <div className="container header-inner">
                <Link href="/" className="brand">
                  <span className="brand-title">GLASS KEY</span>
                  <span className="brand-sub">Photo Archive</span>
                </Link>
                <nav className="site-nav">
                  {navItems.map((item) => (
                    <Link key={item.href} href={item.href}>
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </header>
          <main className="site-main">{children}</main>
          <footer className="site-footer">
            <div className="container footer-inner">
              <div>
                <p className="footer-title">GLASS KEY Photo Archive</p>
                <p className="muted">
                  都市の写真展記録を丁寧にまとめたアーカイブ。掲載情報は公開範囲に
                  限定しています。
                </p>
              </div>
              <div className="footer-links">
                <Link href="/works">Works</Link>
                <Link href="/press">Press Kit</Link>
                <Link href="/terms">Terms</Link>
                <Link href="/contact">Contact</Link>
              </div>
              <div className="footer-meta">
                <p>Tokyo / Yokohama</p>
                <p>info@glasskey.jp</p>
                <p className="muted">© 2026 GLASS KEY</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
