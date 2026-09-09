import type { ReactNode } from "react";
import { SiteHeader } from "../components/SiteHeader";
import { AboutMotion } from "./_components/AboutMotion";
import { AboutSubnav } from "./_components/AboutSubnav";

export default function StoryLayout({ children }: { children: ReactNode }) {
  return (
    <main id="main-content" className="route about-story about-multipage story-dossier">
      <SiteHeader active="story" />
      <AboutSubnav />
      <AboutMotion />
      {children}
    </main>
  );
}
