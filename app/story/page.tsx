import Image from "next/image";
import { ClipboardCheck, Coins, Lightbulb, MapPin, PackageCheck, RotateCcw, Sandwich, School, ShoppingBag, Users } from "lucide-react";
import { SiteHeader } from "../components/SiteHeader";

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

const notices = [
  { date: "2026.08", title: "Dropwich portfolio reconstruction published", type: "PROJECT" },
  { date: "2023.12", title: "Entrepreneurship venture formally concluded", type: "NOTICE" },
  { date: "2023.11", title: "School bazaar menu and waste-reduction items introduced", type: "MENU" },
  { date: "2023.10", title: "Opening-day orders sold out", type: "SALES" },
];

const history = [
  { year: "2026", title: "Portfolio reconstruction", copy: "Original reports, costing sheets, team records, and product decisions were rebuilt into this digital case study.", icon: RotateCcw },
  { year: "2023", title: "The venture operated", copy: "Product sampling began on October 19. Three Dropwich flavors entered regular selling, opening day sold out, and orders were capped at 60.", icon: ShoppingBag },
  { year: "2023", title: "The team learned from waste", copy: "Leftover bread from production led to two butter-toast items for the school bazaar and a clearer lesson in cost control.", icon: Coins },
  { year: "2023", title: "Dropwich was formed", copy: "An eleven-member Grade 12 team at St. Anthony School organized product, marketing, finance, and operations around one egg sandwich concept.", icon: School },
];

const initials = (name: string) => name.split(" ").map(part => part[0]).slice(0, 2).join("");

export default function StoryPage() {
  return (
    <main className="route story-route about-story">
      <SiteHeader active="story" />

      <section className="about-intro">
        <p>ABOUT DROPWICH</p>
        <h1>A student venture<br />with a real record.</h1>
        <span>Created at St. Anthony School in 2023 · Reconstructed as a portfolio case study in 2026</span>
      </section>

      <nav className="about-subnav" aria-label="About Dropwich sections">
        <a href="#brand">BRAND</a><a href="#why">WHY DROPWICH</a><a href="#notice">NOTICE</a><a href="#history">HISTORY</a>
      </nav>

      <section className="about-brand" id="brand" aria-labelledby="brand-title">
        <header><span>01 / BRAND</span><h2 id="brand-title">Made between<br />class bells.</h2><p>Dropwich turns the familiar egg sandwich into a student-built product: warm, affordable, recognizable, and designed to be carried through a busy school day.</p></header>
        <div className="brand-pillars">
          <article><Sandwich /><b>Simple food,<br />clear character</b><p>Three focused flavors built from egg, cheese, toasted bread, and familiar add-ons.</p></article>
          <article><ClipboardCheck /><b>Records before<br />assumptions</b><p>Sampling, costing, sales, and waste were documented throughout the venture.</p></article>
          <article><Users /><b>Student-built<br />operations</b><p>Eleven people worked across executive, product, finance, marketing, and operations roles.</p></article>
        </div>

        <div className="brand-identity" aria-labelledby="identity-title">
          <div className="brand-identity-heading"><small>BRAND IDENTITY</small><h3 id="identity-title">One sandwich.<br />Many ways to drop in.</h3><p>The identity begins with the original bread-and-filling mark, then expands through bold warm colors and a modular line system inspired by the sandwich wrapper.</p></div>
          <div className="brand-mark-stage">
            <div className="brand-mark-main"><Image src="/dropwich-logo.png" unoptimized alt="Dropwich sandwich logo" width={440} height={440} /></div>
            <div className="brand-wordmark">DROP<br />WICH</div>
            <div className="brand-tagline">DROP · EAT · REPEAT</div>
          </div>
          <div className="brand-colors" aria-label="Dropwich color palette">
            <article><span /><b>EGG YOLK</b><small>#FFC950</small></article>
            <article><span /><b>DROP ORANGE</b><small>#FF4B16</small></article>
            <article><span /><b>TOAST INK</b><small>#17110E</small></article>
            <article><span /><b>WRAPPER CREAM</b><small>#FFF8E8</small></article>
          </div>
        </div>

        <div className="brand-company-record" aria-labelledby="team-title">
          <header><span>THE ORIGINAL COMPANY</span><h3 id="team-title">Eleven students.<br />Clear responsibilities.</h3></header>
          <div className="org-chart about-org-chart">
            <div className="org-level org-founder"><article className="person-card founder-card"><span className="person-avatar">JM</span><div><small>Chief Executive Officer</small><h3>Jovert Ken Mendoza</h3><b>CEO</b></div></article></div>
            <div className="org-level org-leaders" aria-label="Executive officers">{leaders.map(leader => <article className={`person-card leader-${leader.code.toLowerCase()}`} key={leader.code}><span className="person-avatar">{initials(leader.name)}</span><div><small>{leader.role}</small><h3>{leader.name}</h3><b>{leader.code}</b></div></article>)}</div>
            <div className="org-departments" aria-label="Product and operations teams reporting beneath the Chief Product Officer">{teams.map(team => <section className="org-department" key={team.label} aria-label={team.label}><header><span>{team.lead}</span><h3>{team.label}</h3></header><div>{team.members.map(member => <article className="member-card" key={member}><span className="person-avatar">{initials(member)}</span><h4>{member}</h4></article>)}</div></section>)}</div>
          </div>
        </div>
      </section>

      <section className="about-why" id="why" aria-labelledby="why-title">
        <header><span>02 / WHY DROPWICH</span><h2 id="why-title">Born here.<br />Built to be practical.</h2><p>The venture’s value was not scale. It was learning how a product behaves when real classmates become customers.</p></header>
        <div className="school-map-stage">
          <Image src="/about/st-anthony-line-map.png" unoptimized alt="Minimal line illustration and map route leading to St. Anthony School" width={2048} height={683} />
          <div className="school-map-label"><MapPin /><span><b>ST. ANTHONY SCHOOL</b>Singalong Manila, Philippines</span></div>
        </div>
        <div className="why-reasons">
          <article><b>01</b><h3>A real audience</h3><p>Sampling responses and actual orders replaced guesswork with direct customer feedback.</p></article>
          <article><b>02</b><h3>A manageable system</h3><p>A 60-order cap connected demand to the team’s true production capacity.</p></article>
          <article><b>03</b><h3>Visible decisions</h3><p>Costing records showed how ingredients, waste, and pricing affected the venture.</p></article>
          <article><b>04</b><h3>A useful portfolio</h3><p>The original work now demonstrates product thinking, UI design, finance, and full-stack development.</p></article>
        </div>
      </section>

      <section className="about-notice" id="notice" aria-labelledby="notice-title">
        <header><span>03 / NOTICE</span><h2 id="notice-title">Dropwich notes.</h2><p>Project disclosures and selected events from the original venture.</p></header>
        <div className="notice-list">{notices.map((notice, index) => <article key={notice.title}><span>{String(index + 1).padStart(2, "0")}</span><time>{notice.date}</time><h3>{notice.title}</h3><b>{notice.type}</b></article>)}</div>
        <div className="notice-disclosure"><strong>PORTFOLIO NOTICE</strong><p>Dropwich is not currently operating as a commercial restaurant. Prices, names, sales records, and company roles on this site document the 2023 student venture.</p></div>
      </section>

      <section className="about-history" id="history" aria-labelledby="history-title">
        <header><span>04 / HISTORY</span><h2 id="history-title">The Dropwich story.</h2><p>Scroll through the route from school project to digital case study.</p></header>
        <div className="history-route" aria-label="Dropwich history timeline">
          {history.map((item, index) => {
            const Icon = item.icon;
            return <article className={`history-stop stop-${index + 1}`} key={`${item.year}-${item.title}`}>
              <div className="history-line" aria-hidden="true"><i /><span><Icon /></span></div>
              <div className="history-year">{item.year}</div>
              <div className="history-copy"><small>0{history.length - index}</small><h3>{item.title}</h3><p>{item.copy}</p></div>
            </article>;
          })}
        </div>
      </section>

      <section className="story-credits">
        <div><Users /><span>11-person student team</span></div><div><PackageCheck /><span>40–70 sandwiches per selling day</span></div><div><Lightbulb /><span>One real loss, one smarter product decision</span></div>
        <p><b>Finance Officer:</b> Misha Andrei Recente · Historical project, reconstructed in 2026</p>
      </section>
      <div className="route-footer dark-footer"><span>ST. ANTHONY SCHOOL / 2023</span><p>Historical names and records are used for portfolio documentation.</p><span>03 — ABOUT</span></div>
    </main>
  );
}
