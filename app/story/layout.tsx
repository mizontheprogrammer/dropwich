import type { ReactNode } from "react";
import { SiteHeader } from "../components/SiteHeader";
import { AboutSubnav } from "./_components/AboutSubnav";

export default function StoryLayout({ children }: { children: ReactNode }) {
  return (
    <main className="route about-story about-multipage">
      <SiteHeader active="story" />
      <AboutSubnav />
      {children}
      <div className="route-footer dark-footer about-route-footer">
        <span>ST. ANTHONY SCHOOL / 2023</span>
        <p>Historical names and records are used for portfolio documentation.</p>
        <span>ABOUT DROPWICH</span>
      </div>
    </main>
  );
}
