import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeDollarSign, Lightbulb, PackageCheck, Users } from "lucide-react";
import { SiteHeader } from "../components/SiteHeader";

const milestones = [
  { number: "01", time: "19 OCT 2023", title: "Ask before making.", copy: "Twenty-four product-sampling responses shaped flavor, presentation, and pricing before the first selling day.", note: "24 sampling responses" },
  { number: "02", time: "OPENING DAY", title: "The hallway said yes.", copy: "Three sandwich variants met real school demand. The first batch sold out and the class requirement became a working venture.", note: "Opening batch: sold out", image: "/products/plain.png" },
  { number: "03", time: "REGULAR SALES", title: "Capacity became the constraint.", copy: "Pre-orders were capped at 60 after-class orders so production could remain realistic, consistent, and organized.", note: "60-order operating limit" },
  { number: "04", time: "SCHOOL BAZAAR", title: "Waste became an idea.", copy: "Leftover bread inspired two butter-toast items—a practical response to one of the team’s clearest operating losses.", note: "2 products from leftovers" },
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
    <main className="route story-route archive-story">
      <SiteHeader active="story" />

      <section className="archive-cover" aria-labelledby="archive-title">
        <div className="archive-running-head"><span>DROPWICH / COMPANY RECORD</span><span>FILE 03–2023</span><span>ST. ANTHONY SCHOOL</span></div>
        <h1 id="archive-title">DROPWICH</h1>
        <div className="archive-subhead"><span>VENTURE ARCHIVE</span><span>ORIGINAL RECORDS · RECONSTRUCTED 2026</span></div>
        <div className="archive-cover-grid">
          <div className="archive-cover-lead">
            <small>EDITOR’S NOTE</small>
            <h2>Seven weeks.<br />One hallway.<br />A real business.</h2>
          </div>
          <div className="archive-cover-copy">
            <p>Dropwich was a Grade 12 entrepreneurship project that moved beyond a written plan. The team sampled products, accepted orders, managed production, recorded costs, and learned from waste.</p>
            <p>This page preserves that experience as a portfolio case study—not as a current operating restaurant.</p>
          </div>
          <nav className="archive-contents" aria-label="Story contents">
            <small>IN THIS FILE</small>
            <a href="#chronicle"><span>01–04</span>The selling record</a>
            <a href="#finance-note"><span>05</span>Finance field note</a>
            <a href="#company-record"><span>06</span>Company record</a>
          </nav>
        </div>
      </section>

      <section className="archive-ledger" aria-label="Project figures">
        <article><span>01</span><div><strong>SOLD OUT</strong><small>Opening-day result</small></div></article>
        <article><span>02</span><div><strong>60</strong><small>Order capacity</small></div></article>
        <article><span>03</span><div><strong>3</strong><small>Original flavors</small></div></article>
        <article><span>04</span><div><strong>₱7,515</strong><small>Week-one sales</small></div></article>
      </section>

      <section className="archive-chronicle" id="chronicle" aria-labelledby="chronicle-title">
        <header>
          <p>CHRONICLE / 2023</p>
          <h2 id="chronicle-title">The selling<br />record.</h2>
          <span>Four moments that changed how the team worked.</span>
        </header>
        <div className="archive-entries">
          {milestones.map(milestone => (
            <article className="archive-entry" key={milestone.number}>
              <div className="archive-entry-index"><b>{milestone.number}</b><span>{milestone.time}</span></div>
              <div className="archive-entry-copy"><h3>{milestone.title}</h3><p>{milestone.copy}</p></div>
              <aside className={milestone.image ? "archive-evidence has-image" : "archive-evidence"}>
                {milestone.image ? <Image src={milestone.image} unoptimized alt="Plain Dropwich from the reconstructed 2023 lineup" width={1254} height={1254} /> : <span>FIELD NOTE</span>}
                <strong>{milestone.note}</strong>
              </aside>
            </article>
          ))}
        </div>
      </section>

      <section className="archive-finance" id="finance-note" aria-labelledby="finance-title">
        <div className="archive-finance-label"><BadgeDollarSign /><span>FIELD NOTE / FINANCE</span></div>
        <div className="archive-finance-copy"><h2 id="finance-title">The numbers were part of the product.</h2><p>Recording cost, revenue, and loss changed what the team did next. Leftover bread was not only waste on a sheet—it became a reason to rethink the menu.</p></div>
        <blockquote>“Finance was seeing where money, materials, and decisions could work better next time.”</blockquote>
        <Link href="/dashboard">Read the finance case file <ArrowRight /></Link>
      </section>

      <section className="archive-team" id="company-record" aria-labelledby="team-title">
        <header>
          <div><p>COMPANY RECORD / PERSONNEL</p><h2 id="team-title">The people<br />on the file.</h2></div>
          <p>Historical company structure from the supplied 2023 class record. Product and operations branches report beneath the CPO line.</p>
        </header>
        <div className="org-chart archive-org-chart">
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
