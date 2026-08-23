import type { ReactNode } from "react";
import { SiteHeader } from "../components/SiteHeader";
import { AboutSubnav } from "./_components/AboutSubnav";

export default function StoryLayout({ children }: { children: ReactNode }) {
  return (
    <main className="route about-story about-multipage">
      <SiteHeader active="story" />
      <AboutSubnav />
      {children}
      <footer className="about-route-footer">
        <div><span>DROPWICH®</span><b>STUDENT VENTURE ARCHIVE</b></div>
        <p>Historical names, prices, roles, and records are presented as portfolio documentation of the 2023 entrepreneurship project.</p>
        <div><span>ST. ANTHONY SCHOOL</span><b>MANILA · 2023</b></div>
      </footer>
    </main>
  );
}
