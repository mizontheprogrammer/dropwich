const notices = [
  { date: "2026.08", dateTime: "2026-08", title: "Portfolio reconstruction published", copy: "The original reports, costs, menu, ordering flow, accounts, and finance model were rebuilt as one full-stack portfolio project." },
  { date: "2023.12", dateTime: "2023-12", title: "Student venture formally concluded", copy: "The company completed its entrepreneurship term and archived its roles, sales records, and product decisions." },
  { date: "2023.11", dateTime: "2023-11", title: "Waste-reduction items introduced", copy: "Leftover bread prompted two butter-toast products for the school bazaar and became a documented operating lesson." },
  { date: "2023.10", dateTime: "2023-10", title: "Opening-day orders sold out", copy: "Three Dropwich flavors entered regular selling after sampling, with daily orders limited to the team’s 60-order capacity." },
];

export default function NoticePage() {
  return (
    <>
      <section className="notice-modern-hero">
        <div>
          <h1>About this<br /><em>project.</em></h1>
        </div>
        <aside className="notice-primary-disclosure">
          <strong>Dropwich is not currently operating as a commercial restaurant.</strong>
          <p>Dropwich was a 2023 school venture. This website is a 2026 portfolio reconstruction based on its original records.</p>
        </aside>
      </section>

      <section className="notice-record about-modern-section" aria-labelledby="notice-title">
        <header className="about-section-heading single">
          <h2 id="notice-title">What changed—<br /><em>and when.</em></h2>
        </header>

        <div className="notice-modern-list">
          {notices.map((notice) => (
            <article key={notice.title}>
              <time dateTime={notice.dateTime}>{notice.date}</time>
              <div><h3>{notice.title}</h3><p>{notice.copy}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="notice-source-note about-modern-section" aria-labelledby="source-note-title">
        <h2 id="source-note-title">Source note</h2>
        <p>Names, roles, dates, prices, and figures come from the original student records. Prices are historical, not current offers.</p>
      </section>
    </>
  );
}
