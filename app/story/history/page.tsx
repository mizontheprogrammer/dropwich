import { Archive, Coins, RotateCcw, ShoppingBag } from "lucide-react";

const history = [
  {
    date: "2026",
    period: "PORTFOLIO RECONSTRUCTION",
    title: "The archive becomes a product.",
    copy: "Original reports and costing sheets were translated into a complete digital restaurant experience.",
    points: ["Menu and customization flow rebuilt", "Accounts and protected dashboard connected", "Historical records preserved as a case study"],
    icon: RotateCcw,
    accent: "orange",
  },
  {
    date: "DEC 2023",
    period: "THE CLOSE",
    title: "The company completes its term.",
    copy: "Dropwich formally concluded after its entrepreneurship requirement and preserved the record of what the team built.",
    points: ["Roles and sales records archived", "Product decisions documented", "Original student venture concluded"],
    icon: Archive,
    accent: "peach",
  },
  {
    date: "NOV 2023",
    period: "THE PIVOT",
    title: "Waste becomes a product lesson.",
    copy: "Leftover bread exposed a preventable loss, so the team introduced two butter-toast products for the school bazaar.",
    points: ["Bread waste identified", "Two low-waste items introduced", "Loss reframed as operating evidence"],
    icon: Coins,
    accent: "sage",
  },
  {
    date: "OCT 2023",
    period: "THE OPENING",
    title: "Three sandwiches enter the hallway.",
    copy: "Sampling moved into regular selling, turning a classroom proposal into a product classmates could actually order.",
    points: ["Sampling began on October 19", "Three original flavors launched", "Opening day sold out at a 60-order cap"],
    icon: ShoppingBag,
    accent: "yellow",
  },
];

export default function HistoryPage() {
  return (
    <>
      <section className="history-modern-hero">
        <div>
          <p className="about-kicker light"><span>04</span> HISTORY</p>
          <h1>Four moments.<br /><em>One continuous build.</em></h1>
        </div>
        <p>Dropwich did not move in a straight line. It launched, learned from waste, closed, and later returned as a portfolio reconstruction.</p>
        <div className="history-range" aria-label="Timeline from October 2023 to the 2026 reconstruction">
          <span>OCT 2023</span><i aria-hidden="true" /><b>→</b><i aria-hidden="true" /><span>2026 REBUILD</span>
        </div>
      </section>

      <section className="history-modern-timeline about-modern-section" aria-label="Dropwich history timeline">
        <div className="history-axis" aria-hidden="true"><i /></div>
        {history.map((entry, index) => {
          const Icon = entry.icon;
          return (
            <article className={`history-modern-entry history-${entry.accent}`} key={entry.period}>
              <div className="history-modern-date"><span>{String(index + 1).padStart(2, "0")}</span><time>{entry.date}</time></div>
              <div className="history-modern-marker" aria-hidden="true"><Icon /></div>
              <div className="history-modern-card">
                <small>{entry.period}</small>
                <h2>{entry.title}</h2>
                <p>{entry.copy}</p>
                <ul>{entry.points.map((point) => <li key={point}>{point}</li>)}</ul>
              </div>
            </article>
          );
        })}
      </section>

      <section className="history-afterword about-modern-section" aria-labelledby="history-afterword-title">
        <p className="about-kicker"><span>04A</span> WHAT REMAINS</p>
        <h2 id="history-afterword-title">The project ended.<br /><em>The evidence kept working.</em></h2>
        <div>
          <article><strong>2023</strong><span>Original venture</span></article>
          <article><strong>11</strong><span>Student operators</span></article>
          <article><strong>3</strong><span>Original products</span></article>
          <article><strong>2026</strong><span>Portfolio rebuild</span></article>
        </div>
      </section>
    </>
  );
}
