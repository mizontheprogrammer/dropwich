import { Archive, ClipboardCheck, Cloud, Coins, RotateCcw, Sandwich, School, ShoppingBag } from "lucide-react";

const history = [
  {
    year: "2026",
    period: "PORTFOLIO RECONSTRUCTION",
    points: ["Original reports and costing sheets digitized", "Restaurant experience rebuilt as a full-stack project", "Menu, ordering, accounts, and finance dashboard connected"],
    icon: RotateCcw,
    accent: "orange",
  },
  {
    year: "2023",
    period: "DECEMBER / THE CLOSE",
    points: ["Student venture formally concluded", "Roles, sales records, and product decisions archived", "The original team completed its entrepreneurship term"],
    icon: Archive,
    accent: "peach",
  },
  {
    year: "2023",
    period: "NOVEMBER / THE PIVOT",
    points: ["Leftover bread revealed a preventable cost", "Two butter-toast items were introduced for the school bazaar", "Waste became a documented product lesson"],
    icon: Coins,
    accent: "sage",
  },
  {
    year: "2023",
    period: "OCTOBER / OPENING",
    points: ["Product sampling began on October 19", "Three Dropwich flavors entered regular selling", "Opening day sold out and orders were capped at 60"],
    icon: ShoppingBag,
    accent: "yellow",
  },
];

const supportingIcons = [Cloud, ClipboardCheck, School, Sandwich];

export default function HistoryPage() {
  return (
    <>
      <section className="history-page-head">
        <span>04 / HISTORY</span>
        <h1>From first order<br />to full rebuild.</h1>
        <p>A compact record of the decisions that shaped Dropwich—drawn as one continuous route.</p>
      </section>

      <section className="compact-history" aria-label="Dropwich history timeline">
        {history.map((entry, index) => {
          const Icon = entry.icon;
          const SupportingIcon = supportingIcons[index];
          return (
            <article className={`history-compact-row history-accent-${entry.accent}`} key={`${entry.period}-${index}`}>
              <div className="history-compact-track" aria-hidden="true"><i /><span><Icon /></span></div>
              <SupportingIcon className="history-supporting-icon" aria-hidden="true" />
              <div className="history-compact-copy">
                <time>{entry.year}</time>
                <div><small>{entry.period}</small><ul>{entry.points.map((point) => <li key={point}>{point}</li>)}</ul></div>
              </div>
            </article>
          );
        })}
      </section>
    </>
  );
}
