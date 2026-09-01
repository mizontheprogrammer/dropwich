import { Archive, Coins, RotateCcw, ShoppingBag } from "lucide-react";

const history = [
  {
    date: "2026",
    dateTime: "2026",
    title: "The archive becomes a product.",
    copy: "Original reports and costing sheets were rebuilt into a menu, ordering system, accounts, protected dashboard, and finance case study.",
    icon: RotateCcw,
    accent: "orange",
  },
  {
    date: "DEC 2023",
    dateTime: "2023-12",
    title: "The company completes its term.",
    copy: "The entrepreneurship term ended, and the team archived its roles, sales records, and product decisions.",
    icon: Archive,
    accent: "peach",
  },
  {
    date: "NOV 2023",
    dateTime: "2023-11",
    title: "Waste becomes a product lesson.",
    copy: "Leftover bread prompted two butter-toast products for the school bazaar, turning waste into an operating lesson.",
    icon: Coins,
    accent: "sage",
  },
  {
    date: "OCT 2023",
    dateTime: "2023-10",
    title: "Three sandwiches enter the hallway.",
    copy: "Sampling began October 19. Three flavors launched, and opening day sold out at the 60-order cap.",
    icon: ShoppingBag,
    accent: "yellow",
  },
];

export default function HistoryPage() {
  return (
    <>
      <section className="history-modern-hero">
        <div>
          <h1>Four moments.<br /><em>One continuous build.</em></h1>
        </div>
        <p>Dropwich launched, adapted to waste, closed, and later returned as a portfolio reconstruction.</p>
      </section>

      <section className="history-modern-timeline about-modern-section" aria-label="Dropwich history timeline">
        <div className="history-axis" aria-hidden="true"><i /></div>
        {history.map((entry) => {
          const Icon = entry.icon;
          return (
            <article className={`history-modern-entry history-${entry.accent}`} key={entry.date}>
              <div className="history-modern-date"><time dateTime={entry.dateTime}>{entry.date}</time></div>
              <div className="history-modern-marker" aria-hidden="true"><Icon /></div>
              <div className="history-modern-card">
                <h2>{entry.title}</h2>
                <p>{entry.copy}</p>
              </div>
            </article>
          );
        })}
      </section>
    </>
  );
}
