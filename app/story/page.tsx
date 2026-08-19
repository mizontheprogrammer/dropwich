import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeDollarSign, Lightbulb, PackageCheck, Users } from "lucide-react";
import { SiteHeader } from "../components/SiteHeader";

const milestones = [
  { number: "01", time: "OCT 19", title: "We asked before we made.", copy: "Twenty-four product-sampling responses helped the team shape flavor, presentation, and price before launch." },
  { number: "02", time: "OPENING DAY", title: "The first batch sold out.", copy: "Three sandwich variants met real demand in the school hallway and turned a class requirement into a working venture." },
  { number: "03", time: "REGULAR SALES", title: "Demand taught us capacity.", copy: "Pre-orders were capped at 60 after-class orders so production could stay realistic, consistent, and organized." },
  { number: "04", time: "SCHOOL BAZAAR", title: "Waste became a new product.", copy: "Leftover bread inspired two butter-toast items—a practical response to one of the team’s clearest operating losses." },
];

const leaders = [
  { role: "Chief Finance Officer", name: "Misha Andrei Recente", code: "CFO" },
  { role: "Chief Marketing Officer", name: "Bryelle Eauxyrish Martinez", code: "CMO" },
  { role: "Chief Product Officer", name: "Bianca Leanne Del Mundo", code: "CPO" },
  { role: "Chief Operating Officer", name: "Sabian Aristeo Sevilla", code: "COO" },
];

const teams = [
  { label: "Product team", lead: "CPO", members: ["Kenneth De Guzman", "Jarvis Roux Dela Cruz", "Joshua Cedric Madridano", "Tom James Lanawan"] },
  { label: "Operations team", lead: "COO", members: ["Jonahres Angeles", "Louis Jefferson Cruz"] },
];

const initials = (name: string) => name.split(" ").map(part => part[0]).slice(0, 2).join("");

export default function StoryPage() {
  return (
    <main className="route story-route story-redesign">
      <SiteHeader active="story" />

      <section className="story-hero-redesign">
        <div className="story-hero-copy">
          <p className="micro-label"><span /> A REAL 2023 STUDENT VENTURE</p>
          <h1>From class<br />brief to <em>sellout.</em></h1>
          <p>Dropwich began as a Grade 12 entrepreneurship project at St. Anthony School. Over seven weeks, it became a real lesson in customers, capacity, pricing, waste, and teamwork.</p>
          <div className="story-hero-actions">
            <Link className="pill-button dark" href="/menu">See what we sold <ArrowRight /></Link>
            <Link href="/dashboard">Open the numbers <ArrowRight /></Link>
          </div>
        </div>

        <div className="story-hero-art" aria-label="Original Dropwich product reconstruction">
          <span className="story-year">2023</span>
          <div className="story-art-disc"><Image src="/products/hungarian.png" unoptimized alt="Hungarian Dropwich in the original branded packaging" width={1254} height={1254} priority /></div>
          <div className="story-origin-stamp"><b>7</b><span>WEEKS OF<br />REAL SELLING</span></div>
        </div>

        <div className="story-proof-strip" aria-label="Project highlights">
          <article><strong>SOLD OUT</strong><span>Opening-day result</span></article>
          <article><strong>60</strong><span>Order capacity</span></article>
          <article><strong>3</strong><span>Original flavors</span></article>
          <article><strong>₱7,515</strong><span>Week-one sales</span></article>
        </div>
      </section>

      <section className="story-journey" aria-labelledby="journey-title">
        <header>
          <p className="micro-label light"><span /> FOUR CHAPTERS, ONE REAL PROJECT</p>
          <h2 id="journey-title">The hallway<br />was our classroom.</h2>
          <p>Every selling day created a new constraint to solve. The strongest lessons came from what customers did—not what the plan predicted.</p>
        </header>
        <div className="story-chapters">
          {milestones.map(milestone => (
            <article key={milestone.number}>
              <span>{milestone.number}</span>
              <div><small>{milestone.time}</small><h3>{milestone.title}</h3><p>{milestone.copy}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="story-lesson" aria-labelledby="lesson-title">
        <div><p className="micro-label"><span /> THE LESSON THAT STAYED</p><h2 id="lesson-title">A small venture.<br /><em>Real consequences.</em></h2></div>
        <blockquote>“Finance was not only recording what happened. It was seeing where money, materials, and decisions could work better next time.”</blockquote>
        <Link href="/dashboard">Explore the finance case study <ArrowRight /></Link>
      </section>

      <section className="full-team story-team-redesign" aria-labelledby="team-title">
        <header>
          <p className="micro-label light"><span /> THE PEOPLE BEHIND DROPWICH</p>
          <h2 id="team-title">Built by<br />a student team.</h2>
          <p>Historical company structure from the supplied 2023 class record. Product and operations branches are shown beneath the CPO line.</p>
          <div className="story-team-facts"><span><Users />11 members</span><span><BadgeDollarSign />Finance-led case study</span></div>
        </header>
        <div className="org-chart story-org-chart">
          <div className="org-level org-founder"><article className="person-card founder-card"><span className="person-avatar">JM</span><div><small>Chief Executive Officer</small><h3>Jovert Ken Mendoza</h3><b>CEO</b></div></article></div>
          <div className="org-level org-leaders" aria-label="Executive officers">{leaders.map(leader => <article className={`person-card leader-${leader.code.toLowerCase()}`} key={leader.code}><span className="person-avatar">{initials(leader.name)}</span><div><small>{leader.role}</small><h3>{leader.name}</h3><b>{leader.code}</b></div></article>)}</div>
          <div className="org-departments" aria-label="Product and operations teams reporting beneath the Chief Product Officer">{teams.map(team => <section className="org-department" key={team.label} aria-label={team.label}><header><span>{team.lead}</span><h3>{team.label}</h3></header><div>{team.members.map(member => <article className="member-card" key={member}><span className="person-avatar">{initials(member)}</span><h4>{member}</h4></article>)}</div></section>)}</div>
        </div>
      </section>

      <section className="story-credits">
        <div><Users /><span>11-person student team</span></div><div><PackageCheck /><span>40–70 sandwiches per selling day</span></div><div><Lightbulb /><span>One real loss, one smarter product decision</span></div>
        <p><b>Finance Officer:</b> Misha Andrei Recente · Historical project, reconstructed in 2026</p>
      </section>
      <div className="route-footer dark-footer"><span>ST. ANTHONY SCHOOL / 2023</span><p>Historical names and records are used for portfolio documentation.</p><span>03 — STORY</span></div>
    </main>
  );
}
