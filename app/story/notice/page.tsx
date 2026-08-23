import { Archive, BadgeInfo, ReceiptText } from "lucide-react";

const notices = [
  { date: "2026.08", dateTime: "2026-08", title: "Portfolio reconstruction published", copy: "The original reports, costs, menu, ordering flow, accounts, and finance model were rebuilt as one full-stack portfolio project.", type: "PROJECT" },
  { date: "2023.12", dateTime: "2023-12", title: "Student venture formally concluded", copy: "The company completed its entrepreneurship term and archived its roles, sales records, and product decisions.", type: "NOTICE" },
  { date: "2023.11", dateTime: "2023-11", title: "Waste-reduction items introduced", copy: "Leftover bread prompted two butter-toast products for the school bazaar and became a documented operating lesson.", type: "MENU" },
  { date: "2023.10", dateTime: "2023-10", title: "Opening-day orders sold out", copy: "Three Dropwich flavors entered regular selling after sampling, with daily orders limited to the team’s 60-order capacity.", type: "SALES" },
];

const recordNotes = [
  { icon: Archive, title: "Historical source", copy: "Names, roles, dates, prices, and figures come from the original student documents." },
  { icon: ReceiptText, title: "Recorded prices", copy: "Menu prices are presented as documented historical figures, not current commercial offers." },
  { icon: BadgeInfo, title: "Portfolio context", copy: "The ordering and dashboard experiences demonstrate development work; they do not represent an operating restaurant." },
];

export default function NoticePage() {
  return (
    <>
      <section className="notice-modern-hero">
        <div>
          <p className="about-kicker light"><span>03</span> NOTICE</p>
          <h1>Read this<br /><em>before the rest.</em></h1>
          <p>This page separates the real 2023 student venture from the digital portfolio experience reconstructed in 2026.</p>
        </div>
        <aside className="notice-primary-disclosure">
          <span>PORTFOLIO DISCLOSURE / 001</span>
          <strong>Dropwich is not currently operating as a commercial restaurant.</strong>
          <p>The site preserves the original company record, then uses it to demonstrate product design, development, operations, and finance thinking.</p>
        </aside>
      </section>

      <section className="notice-record about-modern-section" aria-labelledby="notice-title">
        <header className="about-section-heading">
          <p className="about-kicker"><span>03A</span> PROJECT RECORD</p>
          <h2 id="notice-title">What changed—<br /><em>and when.</em></h2>
          <p>A concise record of the venture’s closing months and the later portfolio reconstruction.</p>
        </header>

        <div className="notice-modern-list">
          {notices.map((notice, index) => (
            <article key={notice.title}>
              <div><span>{String(index + 1).padStart(2, "0")}</span><time dateTime={notice.dateTime}>{notice.date}</time></div>
              <div><b>{notice.type}</b><h3>{notice.title}</h3><p>{notice.copy}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="notice-record-notes about-modern-section" aria-labelledby="record-notes-title">
        <header><p className="about-kicker"><span>03B</span> HOW TO READ THE SITE</p><h2 id="record-notes-title">Archive first.<br /><em>Experience second.</em></h2></header>
        <div>
          {recordNotes.map((note) => {
            const Icon = note.icon;
            return <article key={note.title}><Icon aria-hidden="true" /><h3>{note.title}</h3><p>{note.copy}</p></article>;
          })}
        </div>
      </section>
    </>
  );
}
