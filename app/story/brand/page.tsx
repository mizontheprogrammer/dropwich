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

const principles = [
  { number: "01", icon: Sandwich, title: "Familiar food, ownable character", copy: "Egg, cheese, toasted bread, and recognizable add-ons became a compact menu with a distinct point of view." },
  { number: "02", icon: ClipboardCheck, title: "Evidence before assumption", copy: "Sampling, costing, sales, and waste records turned each decision into something the team could explain." },
  { number: "03", icon: Users, title: "A company built by students", copy: "Eleven classmates divided product, finance, marketing, and operating work into clear responsibilities." },
];

const colors = [
  { name: "Egg yolk", value: "#FFC950", className: "yolk" },
  { name: "Drop orange", value: "#FF4B16", className: "orange" },
  { name: "Toast ink", value: "#17110E", className: "ink" },
  { name: "Wrapper cream", value: "#FFF8E8", className: "cream" },
];

const initials = (name: string) => name.split(" ").map((part) => part[0]).slice(0, 2).join("");

export default function BrandPage() {
  return (
    <>
      <section className="brand-modern-hero">
        <div className="brand-modern-copy">
          <p className="about-kicker"><span>01</span> BRAND</p>
          <h1>Built to be<br /><em>remembered.</em></h1>
          <p>Dropwich gave a familiar egg sandwich a student-made identity—warm, direct, affordable, and designed for the pace of a school day.</p>
          <div className="brand-hero-facts" aria-label="Dropwich brand facts">
            <span><b>3</b> original flavors</span>
            <span><b>11</b> student operators</span>
            <span><b>2023</b> school-born</span>
          </div>
        </div>

        <div className="brand-modern-art">
          <span className="brand-art-label">FROM THE SCHOOL HALLWAY</span>
          <div className="brand-art-orbit" aria-hidden="true"><i /><i /><i /></div>
          <Image src="/dropwich-logo.png" unoptimized priority alt="Dropwich sandwich logo" width={520} height={520} />
          <div className="brand-art-word" aria-hidden="true"><span>DROP</span><span>WICH</span></div>
          <small>DROP · EAT · REPEAT</small>
        </div>
      </section>

      <section className="about-ledger" aria-label="Original venture figures">
        <article><span>01</span><strong>₱89</strong><small>ORIGINAL STARTING PRICE</small></article>
        <article><span>02</span><strong>60</strong><small>ORDER CAPACITY</small></article>
        <article><span>03</span><strong>Sold out</strong><small>OPENING-DAY RESULT</small></article>
        <article><span>04</span><strong>₱7,515</strong><small>WEEK 1 REVENUE</small></article>
      </section>

      <section className="brand-principles-modern about-modern-section" aria-labelledby="principles-title">
        <header className="about-section-heading">
          <p className="about-kicker"><span>01A</span> BRAND PRINCIPLES</p>
          <h2 id="principles-title">Simple enough to understand.<br /><em>Specific enough to own.</em></h2>
          <p>The brand works because the product, records, and team structure all tell the same story: small scale, serious intent.</p>
        </header>
        <div className="brand-principle-grid">
          {principles.map((principle) => {
            const Icon = principle.icon;
            return (
              <article key={principle.number}>
                <div><span>{principle.number}</span><Icon aria-hidden="true" /></div>
                <h3>{principle.title}</h3>
                <p>{principle.copy}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="brand-system about-modern-section" aria-labelledby="identity-title">
        <header className="about-section-heading light">
          <p className="about-kicker"><span>01B</span> IDENTITY SYSTEM</p>
          <h2 id="identity-title">Warm enough for food.<br /><em>Sharp enough for business.</em></h2>
          <p>The original bread mark anchors a flexible visual system built from bold type, wrapper lines, and four high-contrast colors.</p>
        </header>

        <div className="brand-system-grid">
          <article className="brand-logo-tile">
            <span>PRIMARY MARK / 01</span>
            <Image src="/dropwich-logo.png" unoptimized alt="Dropwich primary sandwich mark" width={420} height={420} />
            <b>THE SANDWICH IS THE SYMBOL.</b>
          </article>
          <article className="brand-type-tile">
            <span>VOICE / 02</span>
            <p>DISPLAY</p>
            <strong>Big flavor.<br />Small beginnings.</strong>
            <p>UTILITY</p>
            <b>MANROPE / CLEAR, MODERN, DIRECT</b>
          </article>
          <article className="brand-palette-tile">
            <span>PALETTE / 03</span>
            <div>
              {colors.map((color) => <section className={color.className} key={color.name}><i /><b>{color.name}</b><small>{color.value}</small></section>)}
            </div>
          </article>
        </div>
      </section>

      <section className="brand-team-modern about-modern-section" aria-labelledby="team-title">
        <header className="about-section-heading">
          <p className="about-kicker"><span>01C</span> THE ORIGINAL COMPANY</p>
          <h2 id="team-title">Eleven students.<br /><em>Clear responsibilities.</em></h2>
          <p>The hierarchy records how the original venture divided ownership across executive, product, finance, marketing, and operating work.</p>
        </header>

        <div className="org-chart about-org-chart">
          <div className="org-level org-founder">
            <article className="person-card founder-card"><span className="person-avatar">JM</span><div><small>Chief Executive Officer</small><h3>Jovert Ken Mendoza</h3><b>CEO</b></div></article>
          </div>
          <div className="org-level org-leaders" aria-label="Executive officers">
            {leaders.map((leader) => <article className={`person-card leader-${leader.code.toLowerCase()}`} key={leader.code}><span className="person-avatar">{initials(leader.name)}</span><div><small>{leader.role}</small><h3>{leader.name}</h3><b>{leader.code}</b></div></article>)}
          </div>
          <div className="org-departments" aria-label="Product and operations teams aligned beneath the Chief Product Officer">
            {teams.map((team) => <section className="org-department" key={team.label} aria-label={team.label}><header><span>{team.lead}</span><h3>{team.label}</h3></header><div>{team.members.map((member) => <article className="member-card" key={member}><span className="person-avatar">{initials(member)}</span><h4>{member}</h4></article>)}</div></section>)}
          </div>
        </div>
      </section>
    </>
  );
}
