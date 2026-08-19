import Image from "next/image";
import { ClipboardCheck, Sandwich, Users } from "lucide-react";

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

const initials = (name: string) => name.split(" ").map((part) => part[0]).slice(0, 2).join("");

export default function BrandPage() {
  return (
    <>
      <section className="about-page-head brand-page-head">
        <span>01 / BRAND</span>
        <h1>Made between<br />class bells.</h1>
        <p>Dropwich turned a familiar egg sandwich into a student-built product: warm, affordable, recognizable, and practical for a busy school day.</p>
      </section>

      <section className="brand-pillars about-page-section" aria-label="Dropwich brand principles">
        <article><Sandwich aria-hidden="true" /><b>Simple food,<br />clear character</b><p>Three focused flavors built from egg, cheese, toasted bread, and familiar add-ons.</p></article>
        <article><ClipboardCheck aria-hidden="true" /><b>Records before<br />assumptions</b><p>Sampling, costing, sales, and waste were documented throughout the venture.</p></article>
        <article><Users aria-hidden="true" /><b>Student-built<br />operations</b><p>Eleven people worked across executive, product, finance, marketing, and operations roles.</p></article>
      </section>

      <section className="brand-identity about-page-section" aria-labelledby="identity-title">
        <div className="brand-identity-heading">
          <small>BRAND IDENTITY</small>
          <h2 id="identity-title">One sandwich.<br />Many ways to drop in.</h2>
          <p>The identity begins with the original bread-and-filling mark, then expands through warm colors and a modular line system inspired by the sandwich wrapper.</p>
        </div>
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
      </section>

      <section className="brand-company-record about-page-section" aria-labelledby="team-title">
        <header><span>THE ORIGINAL COMPANY</span><h2 id="team-title">Eleven students.<br />Clear responsibilities.</h2></header>
        <div className="org-chart about-org-chart">
          <div className="org-level org-founder"><article className="person-card founder-card"><span className="person-avatar">JM</span><div><small>Chief Executive Officer</small><h3>Jovert Ken Mendoza</h3><b>CEO</b></div></article></div>
          <div className="org-level org-leaders" aria-label="Executive officers">
            {leaders.map((leader) => <article className={`person-card leader-${leader.code.toLowerCase()}`} key={leader.code}><span className="person-avatar">{initials(leader.name)}</span><div><small>{leader.role}</small><h3>{leader.name}</h3><b>{leader.code}</b></div></article>)}
          </div>
          <div className="org-departments" aria-label="Product and operations teams reporting beneath the Chief Product Officer">
            {teams.map((team) => <section className="org-department" key={team.label} aria-label={team.label}><header><span>{team.lead}</span><h3>{team.label}</h3></header><div>{team.members.map((member) => <article className="member-card" key={member}><span className="person-avatar">{initials(member)}</span><h4>{member}</h4></article>)}</div></section>)}
          </div>
        </div>
      </section>
    </>
  );
}
