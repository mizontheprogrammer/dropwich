"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const sections = [
  { label: "Brand", href: "/story/brand" },
  { label: "Why Dropwich", href: "/story/why" },
  { label: "Notice", href: "/story/notice" },
  { label: "History", href: "/story/history" },
];

export function AboutSubnav() {
  const pathname = usePathname();

  return (
    <nav className="about-subnav" aria-label="About Dropwich pages">
      <div className="about-subnav-links">
        {sections.map((section) => {
          const active = pathname === section.href;
          return (
            <Link key={section.href} href={section.href} aria-current={active ? "page" : undefined}>
              <b>{section.label}</b>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
