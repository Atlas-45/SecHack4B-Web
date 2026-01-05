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
  { href: "/press", label: "Press" },
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
        <header className="site-header">
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
        </header>

        <main>{children}</main>

        <footer className="site-footer">
          <div className="container">
            <div className="footer-top">
              <div className="footer-col">
                <h4>GLASS KEY</h4>
                <p>
                  都市の記憶を記録する。<br />
                  写真展アーカイブと作品データベース。
                </p>
                <p>Tokyo, Japan</p>
              </div>
              <div className="footer-col">
                <h4>Links</h4>
                <div className="footer-links">
                  <Link href="/works">Works</Link>
                  <Link href="/press">Press Kit</Link>
                  <Link href="/changelog">Changelog</Link>
                  <Link href="/terms">Terms of Service</Link>
                </div>
              </div>
              <div className="footer-col">
                <h4>Contact</h4>
                <p>info@glasskey.jp</p>
                <div className="footer-links">
                  <Link href="/contact">お問い合わせフォーム</Link>
                </div>
              </div>
            </div>
            <div className="footer-bottom">
              <p>&copy; 2026 GLASS KEY Photo Archive. All Rights Reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
