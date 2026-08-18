import { ArrowRight, Lightbulb, PackageCheck, Users } from "lucide-react";
import Link from "next/link";
import { SiteHeader } from "../components/SiteHeader";

const milestones = [
  ["OCT 19", "Product sampling", "24 responses shaped the product before launch."],
  ["OPENING", "Day-one sellout", "Three sandwich variants met real school demand."],
  ["REGULAR", "Capacity learned", "Pre-orders were limited to 60 after-class orders."],
  ["BAZAAR", "Waste became a product", "Leftover bread inspired two butter-toast items."],
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
  return <main className="route story-route">
    <SiteHeader active="story" />
    <section className="story-stage">
      <div className="story-lead">
        <p className="micro-label light"><span /> THE ORIGINAL PROJECT</p>
        <h1>We learned<br />by <em>selling.</em></h1>
        <p>Dropwich began as a Grade 12 entrepreneurship project at St. Anthony School. It became a seven-week lesson in customer feedback, production limits, pricing, waste, and teamwork.</p>
        <Link href="/dashboard">See the finance view <ArrowRight /></Link>
      </div>
      <div className="story-timeline">
        {milestones.map(([time, title, copy], index) => <article key={title}><span>0{index + 1}</span><div><small>{time}</small><h2>{title}</h2><p>{copy}</p></div></article>)}
      </div>
    </section>
    <section className="full-team" aria-labelledby="team-title">
      <header><p className="micro-label light"><span /> THE PEOPLE BEHIND DROPWICH</p><h2 id="team-title">One team.<br />Clear roles.</h2><p>Historical company structure from the supplied 2023 class record.</p></header>
      <div className="org-chart">
        <div className="org-level org-founder"><article className="person-card founder-card"><span className="person-avatar">JM</span><div><small>Chief Executive Officer</small><h3>Jovert Ken Mendoza</h3><b>CEO</b></div></article></div>
        <div className="org-level org-leaders" aria-label="Executive officers">{leaders.map(leader => <article className={`person-card leader-${leader.code.toLowerCase()}`} key={leader.code}><span className="person-avatar">{initials(leader.name)}</span><div><small>{leader.role}</small><h3>{leader.name}</h3><b>{leader.code}</b></div></article>)}</div>
        <div className="org-departments" aria-label="Product and operations teams reporting beneath the Chief Product Officer">{teams.map(team => <section className="org-department" key={team.label} aria-label={team.label}><header><span>{team.lead}</span><h3>{team.label}</h3></header><div>{team.members.map(member => <article className="member-card" key={member}><span className="person-avatar">{initials(member)}</span><h4>{member}</h4></article>)}</div></section>)}</div>
      </div>
    </section>
    <section className="story-credits">
      <div><Users /><span>10-person student team</span></div><div><PackageCheck /><span>40–70 sandwiches per selling day</span></div><div><Lightbulb /><span>One real loss, one smarter product decision</span></div>
      <p><b>Finance Officer:</b> Misha Andrei Recente · Historical project, reconstructed in 2026</p>
    </section>
    <div className="route-footer dark-footer"><span>ST. ANTHONY SCHOOL / 2023</span><p>Historical names and records are used for portfolio documentation.</p><span>03 — STORY</span></div>
  </main>;
}
