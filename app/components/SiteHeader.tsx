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
      <header className="sticky top-0 z-50 h-[92px] px-6 md:px-12 lg:px-16 grid grid-cols-2 md:grid-cols-[1fr_auto_1fr] items-center border-b border-line bg-cream/80 backdrop-blur-lg">
        <Link href="/" className="justify-self-start flex items-center gap-3 text-lg font-extrabold tracking-tight" aria-label="Dropwich home">
          <Image src="/dropwich-logo.png" unoptimized alt="Dropwich logo" width={58} height={58} priority className="rounded-full shadow-sm" />
          <span><b className="text-red">DROP</b>WICH</span>
        </Link>
        <nav className="hidden md:flex items-center gap-2 p-1.5 border border-line rounded-full bg-white/60 shadow-sm backdrop-blur-md" aria-label="Main navigation">
          {links.map(([label, href]) => (
            <Link key={href} href={href} aria-current={active === label.toLowerCase() ? "page" : undefined} className={`site-nav-link min-w-[82px] min-h-[42px] px-4 flex items-center justify-center rounded-full text-xs font-bold transition-all duration-300 ${active === label.toLowerCase() ? "site-nav-link-active bg-ink text-white shadow-md" : "text-ink/80 hover:bg-ink/5 hover:text-ink"}`}>{label}</Link>
          ))}
        </nav>
        <div className="justify-self-end hidden md:flex items-center gap-3">
          <button className="w-11 h-11 flex items-center justify-center rounded-full border border-line bg-white/60 shadow-sm backdrop-blur-md hover:bg-ink hover:text-white transition-all duration-300" type="button" onClick={() => setSearchOpen(true)} aria-label="Search the Dropwich menu"><Search size={18} /></button>
          <Link href="/account" className="h-11 px-5 border border-line rounded-full flex items-center gap-2 text-xs font-extrabold bg-white/60 shadow-sm backdrop-blur-md hover:bg-ink/5 transition-all duration-300"><UserRound size={16} /><span>Account</span></Link>
        </div>
        <button type="button" className="md:hidden justify-self-end p-2 text-ink" onClick={() => setOpen(true)} aria-label="Open navigation"><Menu size={28} /></button>
      </header>

      {searchOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4 bg-ink/40 backdrop-blur-sm transition-opacity" role="dialog" aria-modal="true" aria-labelledby="search-title" onMouseDown={() => setSearchOpen(false)}>
          <div className="w-full max-w-2xl bg-paper rounded-3xl shadow-2xl overflow-hidden border border-line animate-in fade-in slide-in-from-top-10 duration-300" onMouseDown={(event) => event.stopPropagation()}>
            <div className="p-8 border-b border-line flex justify-between items-start">
              <div>
                <span className="text-red text-xs font-extrabold tracking-wider uppercase">Menu search</span>
                <h2 id="search-title" className="text-3xl font-fraunces mt-1">What are you craving?</h2>
              </div>
              <button type="button" className="w-10 h-10 flex items-center justify-center rounded-full bg-line/50 hover:bg-line transition-colors" onClick={() => setSearchOpen(false)} aria-label="Close search"><X size={20} /></button>
            </div>
            <form action="/menu" role="search" className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-4">
              <Search className="text-muted" size={24} aria-hidden="true" />
              <label className="sr-only" htmlFor="site-search">Search sandwiches</label>
              <input ref={searchInput} id="site-search" name="q" type="search" placeholder="Try ham or Hungarian" autoComplete="off" className="flex-1 bg-transparent text-xl font-medium outline-none placeholder:text-muted/50" />
              <button type="submit" className="h-12 w-full sm:w-auto px-6 rounded-full bg-red text-white text-sm font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">Search</button>
            </form>
            <div className="px-6 sm:px-8 pb-8 flex flex-wrap items-center gap-3 sm:gap-4 text-sm font-semibold">
              <span className="text-muted">Popular</span>
              <Link href="/menu/plain" className="px-4 py-2 rounded-full bg-line/30 hover:bg-line/60 transition-colors">Plain</Link>
              <Link href="/menu/ham" className="px-4 py-2 rounded-full bg-line/30 hover:bg-line/60 transition-colors">Ham</Link>
              <Link href="/menu/hungarian" className="px-4 py-2 rounded-full bg-line/30 hover:bg-line/60 transition-colors">Hungarian</Link>
            </div>
          </div>
        </div>
      )}

      {open && (
        <div className="fixed inset-0 z-[100] min-h-dvh overflow-y-auto p-6 pt-[max(1.5rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))] flex flex-col bg-red text-white animate-in fade-in slide-in-from-top duration-300" role="dialog" aria-modal="true" aria-label="Navigation menu">
          <button type="button" className="self-end w-12 h-12 flex items-center justify-center rounded-full border border-white/50 hover:bg-white/10 transition-colors" onClick={() => setOpen(false)} aria-label="Close navigation"><X size={24} /></button>
          <div className="mt-8 flex items-center gap-4 text-2xl tracking-tight">
            <Image src="/dropwich-logo.png" unoptimized alt="" width={64} height={64} className="rounded-full shadow-lg" />
            <strong className="font-extrabold">DROPWICH</strong>
          </div>
          <form className="mt-10 flex items-center gap-3 pb-4 border-b border-white/30" action="/menu" role="search">
            <Search size={24} className="opacity-70" aria-hidden="true" />
            <label className="sr-only" htmlFor="mobile-site-search">Search sandwiches</label>
            <input id="mobile-site-search" name="q" type="search" placeholder="Search the menu" className="flex-1 bg-transparent text-xl text-white outline-none placeholder:text-white/50" />
          </form>
          <nav className="mt-6 flex flex-col">
            {[...links, ["Account", "/account"]].map(([label, href]) => (
              <Link key={href} href={href} className="py-4 text-[clamp(2rem,11vw,2.625rem)] font-fraunces font-extrabold leading-none border-b border-white/20 hover:text-yellow transition-colors" aria-current={active === label.toLowerCase() ? "page" : undefined} onClick={() => setOpen(false)}>{label}</Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
