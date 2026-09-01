"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, Search, UserRound, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const links = [
  ["Home", "/"],
  ["Menu", "/menu"],
  ["Story", "/story/brand"],
  ["Dashboard", "/dashboard"],
];

export function SiteHeader({ active }: { active: string }) {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) searchInput.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    if (!searchOpen) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && setSearchOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [searchOpen]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);
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
        <div className="header-actions">
          <button className="header-icon-button" type="button" onClick={() => setSearchOpen(true)} aria-label="Search the Dropwich menu"><Search /></button>
          <Link href="/account" className="account-link"><UserRound /><span>Account</span></Link>
        </div>
        <button className="mobile-menu-button" onClick={() => setOpen(true)} aria-label="Open navigation"><Menu /></button>
      </header>
      {searchOpen && <div className="search-overlay" role="dialog" aria-modal="true" aria-labelledby="search-title" onMouseDown={() => setSearchOpen(false)}>
        <div className="search-panel" onMouseDown={(event) => event.stopPropagation()}>
          <div className="search-panel-head"><div><span>Menu search</span><h2 id="search-title">What are you craving?</h2></div><button type="button" onClick={() => setSearchOpen(false)} aria-label="Close search"><X /></button></div>
          <form action="/menu" role="search"><Search aria-hidden="true" /><label className="sr-only" htmlFor="site-search">Search sandwiches</label><input ref={searchInput} id="site-search" name="q" type="search" placeholder="Try ham or Hungarian" autoComplete="off" /><button type="submit">Search</button></form>
          <div className="search-shortcuts"><span>Popular</span><Link href="/menu/plain">Plain</Link><Link href="/menu/ham">Ham</Link><Link href="/menu/hungarian">Hungarian</Link></div>
        </div>
      </div>}
      {open && <div className="mobile-nav" role="dialog" aria-modal="true" aria-label="Navigation menu">
        <button onClick={() => setOpen(false)} aria-label="Close navigation"><X /></button>
        <div className="mobile-logo"><Image src="/dropwich-logo.png" unoptimized alt="" width={86} height={86} /><strong>DROPWICH</strong></div>
        <form className="mobile-search" action="/menu" role="search"><Search aria-hidden="true" /><label className="sr-only" htmlFor="mobile-site-search">Search sandwiches</label><input id="mobile-site-search" name="q" type="search" placeholder="Search the menu" /></form>
        <nav>{[...links, ["Account", "/account"]].map(([label, href]) => <Link key={href} href={href} aria-current={active === label.toLowerCase() ? "page" : undefined} onClick={() => setOpen(false)}>{label}</Link>)}</nav>
      </div>}
    </>
  );
}
