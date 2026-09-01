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
    </main>
  );
}
