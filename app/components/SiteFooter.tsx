import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const groups = [
  { title: "Browse", links: [["Home", "/"], ["Menu", "/menu"], ["Account", "/account"], ["Dashboard", "/dashboard"]] },
  { title: "Our story", links: [["Brand", "/story/brand"], ["Why Dropwich", "/story/why"], ["Notice", "/story/notice"], ["History", "/story/history"]] },
];

export function SiteFooter() {
  return <footer className="site-footer">
    <div className="site-footer-main">
      <div className="site-footer-brand">
        <Link href="/" aria-label="Dropwich home"><Image src="/dropwich-logo.png" unoptimized alt="" width={72} height={72} /><strong><span>DROP</span>WICH</strong></Link>
        <p>Big flavor from a small beginning—a 2023 student venture rebuilt as a modern digital product.</p>
        <Link className="footer-cta" href="/menu">Build your order <ArrowUpRight aria-hidden="true" /></Link>
      </div>
      <div className="site-footer-links">
        {groups.map((group) => <div key={group.title}><h2>{group.title}</h2>{group.links.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}</div>)}
      </div>
    </div>
    <div className="site-footer-bottom"><span>© 2026 Dropwich portfolio reconstruction</span><span>Original student venture · St. Anthony School · 2023</span></div>
  </footer>;
}
