import { SchoolIllustration } from "./SchoolIllustration";

const reasons = [
  { title: "A real audience", copy: "Sampling responses and actual orders replaced guesswork with direct customer feedback." },
  { title: "A manageable system", copy: "A 60-order cap connected customer demand to the team’s true production capacity." },
  { title: "Visible decisions", copy: "Costing records showed how ingredients, waste, and pricing affected the venture." },
  { title: "A useful portfolio", copy: "The original work now demonstrates product thinking, interface design, finance, and full-stack development." },
];

export default function WhyDropwichPage() {
  return (
    <>
      <section className="why-modern-hero">
        <div className="why-modern-copy">
          <h1>Real customers.<br /><em>Real consequences.</em></h1>
          <p>The venture mattered because classmates were not imaginary users. They tasted the product, placed orders, waited for food, and exposed what the team could actually deliver.</p>
        </div>
        <SchoolIllustration />
      </section>

      <section className="why-thesis about-modern-section" aria-labelledby="why-thesis-title">
        <div>
          <h2 id="why-thesis-title">The hallway was small.<br /><em>The learning was not.</em></h2>
        </div>
        <p>Dropwich connected a familiar sandwich to planning volume, assigning roles, calculating costs, and reducing waste.</p>
      </section>

      <section className="why-reasons-modern about-modern-section" aria-labelledby="why-reasons-title">
        <header className="about-section-heading single">
          <h2 id="why-reasons-title">Why it<br /><em>mattered.</em></h2>
        </header>
        <div>
          {reasons.map((reason) => (
            <article key={reason.title}>
              <h3>{reason.title}</h3>
              <p>{reason.copy}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
