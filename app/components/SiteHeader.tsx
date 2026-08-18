"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, UserRound, X } from "lucide-react";
import { useState } from "react";

const links = [
  ["Home", "/"],
  ["Menu", "/menu"],
  ["Story", "/story"],
  ["Dashboard", "/dashboard"],
  ["Account", "/account"],
];

export function SiteHeader({ active }: { active: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className="topbar">
        <Link href="/" className="logo-link" aria-label="Dropwich home">
          <Image src="/dropwich-logo.png" unoptimized alt="Dropwich logo" width={64} height={64} priority />
          <span><b>DROP</b>WICH</span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(([label, href]) => <Link key={href} href={href} className={active === label.toLowerCase() ? "active" : ""}>{label}</Link>)}
        </nav>
        <Link href="/account" className="account-link"><UserRound /><span>Sign in</span></Link>
        <button className="mobile-menu-button" onClick={() => setOpen(true)} aria-label="Open navigation"><Menu /></button>
      </header>
      {open && <div className="mobile-nav" role="dialog" aria-modal="true" aria-label="Navigation menu">
        <button onClick={() => setOpen(false)} aria-label="Close navigation"><X /></button>
        <div className="mobile-logo"><Image src="/dropwich-logo.png" unoptimized alt="" width={86} height={86} /><strong>DROPWICH</strong></div>
        <nav>{links.map(([label, href], index) => <Link key={href} href={href} onClick={() => setOpen(false)}><span>0{index + 1}</span>{label}</Link>)}</nav>
        <p>A student venture, rebuilt as a product.</p>
      </div>}
    </>
  );
}
