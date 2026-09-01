import type { ReactNode } from "react";
import { SiteHeader } from "../components/SiteHeader";
import { AboutMotion } from "./_components/AboutMotion";
import { AboutSubnav } from "./_components/AboutSubnav";

export default function StoryLayout({ children }: { children: ReactNode }) {
  return (
    <main className="route about-story about-multipage">
      <SiteHeader active="story" />
      <AboutSubnav />
      <AboutMotion />
      {children}
      <footer className="about-route-footer">
        <p>Dropwich was a 2023 student venture. This website is a 2026 portfolio reconstruction.</p>
      </footer>
    </main>
  );
}
