import Image from "next/image";
import { ClipboardCheck, Sandwich, Users } from "lucide-react";
import { DropwichGallery, EggdropPattern } from "../../components/HomeExperience";

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
  { icon: Sandwich, title: "Familiar food, ownable character", copy: "Egg, cheese, toasted bread, and recognizable add-ons became a compact menu with a distinct point of view." },
  { icon: ClipboardCheck, title: "Evidence before assumption", copy: "Sampling, costing, sales, and waste records turned each decision into something the team could explain." },
  { icon: Users, title: "A company built by students", copy: "Eleven classmates divided product, finance, marketing, and operating work into clear responsibilities." },
];

const colors = [
  { name: "Egg yolk", className: "yolk" },
  { name: "Drop orange", className: "orange" },
  { name: "Toast ink", className: "ink" },
  { name: "Wrapper cream", className: "cream" },
];

const initials = (name: string) => name.split(" ").map((part) => part[0]).slice(0, 2).join("");

export default function BrandPage() {
  return (
    <>
      <section className="brand-modern-hero">
        <div className="brand-modern-copy">
          <h1>Built to be<br /><em>remembered.</em></h1>
          <p>Dropwich gave a familiar egg sandwich a student-made identity—warm, direct, affordable, and designed for the pace of a school day.</p>
        </div>

        <div className="brand-modern-art">
          <div className="brand-art-orbit" aria-hidden="true"><i /><i /><i /></div>
          <Image src="/dropwich-logo.png" unoptimized priority alt="Dropwich sandwich logo" width={520} height={520} />
          <div className="brand-art-word" aria-hidden="true"><span>DROP</span><span>WICH</span></div>
        </div>
      </section>

      <section className="about-ledger" aria-label="Original venture figures">
        <article><strong>₱89</strong><span className="ledger-label">Starting price</span></article>
        <article><strong>60</strong><span className="ledger-label">Order capacity</span></article>
        <article><strong>Sold out</strong><span className="ledger-label">Opening day</span></article>
        <article><strong>₱7,515</strong><span className="ledger-label">Week 1 revenue</span></article>
      </section>

      <section className="brand-principles-modern about-modern-section" aria-labelledby="principles-title">
        <header className="about-section-heading single">
          <h2 id="principles-title">Simple enough to understand.<br /><em>Specific enough to own.</em></h2>
        </header>
        <div className="brand-principle-grid">
          {principles.map((principle) => {
            const Icon = principle.icon;
            return (
              <article key={principle.title}>
                <div><Icon aria-hidden="true" /></div>
                <h3>{principle.title}</h3>
                <p>{principle.copy}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="brand-system about-modern-section" aria-labelledby="identity-title">
        <header className="about-section-heading light">
          <h2 id="identity-title">Warm enough for food.<br /><em>Sharp enough for business.</em></h2>
          <p>The bread mark, bold type, and four colors form the visual system.</p>
        </header>

        <div className="brand-system-grid">
          <article className="brand-logo-tile">
            <h3>Logo</h3>
            <Image src="/dropwich-logo.png" unoptimized alt="Dropwich primary sandwich mark" width={420} height={420} />
          </article>
          <article className="brand-type-tile">
            <h3>Typography</h3>
            <span>Display · Fraunces</span>
            <strong>Big flavor.<br />Small beginnings.</strong>
            <span>Utility · Manrope</span>
          </article>
          <article className="brand-palette-tile">
            <h3>Colors</h3>
            <div>
              {colors.map((color) => <section className={color.className} key={color.name}><i /><b>{color.name}</b></section>)}
            </div>
          </article>
        </div>
      </section>

      <EggdropPattern story />
      <DropwichGallery story />

      <section className="brand-team-modern about-modern-section" aria-labelledby="team-title">
        <header className="about-section-heading single">
          <h2 id="team-title">Eleven students.<br /><em>Clear responsibilities.</em></h2>
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
