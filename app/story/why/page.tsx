import { BarChart3, Boxes, MessageSquareText, MonitorSmartphone } from "lucide-react";
import { SchoolIllustration } from "./SchoolIllustration";

const reasons = [
  { number: "01", title: "A real audience", copy: "Sampling responses and actual orders replaced guesswork with direct customer feedback." },
  { number: "02", title: "A manageable system", copy: "A 60-order cap connected customer demand to the team’s true production capacity." },
  { number: "03", title: "Visible decisions", copy: "Costing records showed how ingredients, waste, and pricing affected the venture." },
  { number: "04", title: "A useful portfolio", copy: "The original work now demonstrates product thinking, interface design, finance, and full-stack development." },
];

const outcomes = [
  { icon: MessageSquareText, title: "Customer feedback", copy: "Sampling became product evidence instead of a classroom assumption." },
  { icon: Boxes, title: "Operating limits", copy: "Capacity and leftovers revealed where the system needed to change." },
  { icon: BarChart3, title: "Financial thinking", copy: "Prices, costs, revenue, and waste became decisions the team could measure." },
  { icon: MonitorSmartphone, title: "Digital reconstruction", copy: "The 2026 build turns those records into a working restaurant experience." },
];

export default function WhyDropwichPage() {
  return (
    <>
      <section className="why-modern-hero">
        <div className="why-modern-copy">
          <p className="about-kicker"><span>02</span> WHY DROPWICH</p>
          <h1>Real customers.<br /><em>Real consequences.</em></h1>
          <p>The venture mattered because classmates were not imaginary users. They tasted the product, placed orders, waited for food, and exposed what the team could actually deliver.</p>
          <div className="why-proof" aria-label="Original venture proof points">
            <article><strong>60</strong><span>orders at capacity</span></article>
            <article><strong>3</strong><span>original flavors</span></article>
            <article><strong>Sold out</strong><span>opening-day result</span></article>
          </div>
        </div>
        <SchoolIllustration />
      </section>

      <section className="why-thesis about-modern-section" aria-labelledby="why-thesis-title">
        <p className="about-kicker"><span>02A</span> THE POINT</p>
        <div>
          <h2 id="why-thesis-title">The hallway was small.<br /><em>The learning was not.</em></h2>
          <blockquote>“A product becomes real when somebody outside the team has to choose it, pay for it, and wait for it.”</blockquote>
        </div>
        <p>Dropwich connected a familiar sandwich to the less visible work behind it: planning volume, assigning roles, calculating costs, responding to waste, and making the next selling day better.</p>
      </section>

      <section className="why-reasons-modern about-modern-section" aria-labelledby="why-reasons-title">
        <header className="about-section-heading">
          <p className="about-kicker"><span>02B</span> WHY IT MATTERED</p>
          <h2 id="why-reasons-title">Four reasons the project<br /><em>still earns its place.</em></h2>
        </header>
        <div>
          {reasons.map((reason) => (
            <article key={reason.number}>
              <span>{reason.number}</span>
              <h3>{reason.title}</h3>
              <p>{reason.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="why-outcome about-modern-section" aria-labelledby="why-outcome-title">
        <header>
          <p className="about-kicker"><span>2023—2026</span> THE RECONSTRUCTION</p>
          <h2 id="why-outcome-title">A classroom exercise became<br /><em>a full-stack case study.</em></h2>
        </header>
        <div className="why-outcome-grid">
          {outcomes.map((outcome) => {
            const Icon = outcome.icon;
            return <article key={outcome.title}><Icon aria-hidden="true" /><h3>{outcome.title}</h3><p>{outcome.copy}</p></article>;
          })}
        </div>
      </section>
    </>
  );
}
