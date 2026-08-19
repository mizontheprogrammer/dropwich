import { SchoolIllustration } from "./SchoolIllustration";

const reasons = [
  { number: "01", title: "A real audience", copy: "Sampling responses and actual orders replaced guesswork with direct customer feedback." },
  { number: "02", title: "A manageable system", copy: "A 60-order cap connected customer demand to the team’s true production capacity." },
  { number: "03", title: "Visible decisions", copy: "Costing records showed how ingredients, waste, and pricing affected the venture." },
  { number: "04", title: "A useful portfolio", copy: "The original work now demonstrates product thinking, UI design, finance, and full-stack development." },
];

export default function WhyDropwichPage() {
  return (
    <>
      <section className="why-school-hero">
        <div className="why-school-copy">
          <span>02 / WHY DROPWICH</span>
          <h1>A hallway<br />became a market.</h1>
          <p>The venture’s value was never its scale. It was learning how a product behaves when real classmates become the customers.</p>
        </div>
        <SchoolIllustration />
      </section>

      <section className="why-principles about-page-section" aria-labelledby="why-principles-title">
        <header><span>WHY IT MATTERED</span><h2 id="why-principles-title">Small business.<br />Real consequences.</h2><p>Each sale connected a classroom idea to production limits, customer feedback, and actual money.</p></header>
        <div className="why-reasons">
          {reasons.map((reason) => <article key={reason.number}><b>{reason.number}</b><h3>{reason.title}</h3><p>{reason.copy}</p></article>)}
        </div>
      </section>
    </>
  );
}
