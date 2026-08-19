const notices = [
  { date: "2026.08", title: "Dropwich portfolio reconstruction published", type: "PROJECT" },
  { date: "2023.12", title: "Entrepreneurship venture formally concluded", type: "NOTICE" },
  { date: "2023.11", title: "School bazaar menu and waste-reduction items introduced", type: "MENU" },
  { date: "2023.10", title: "Opening-day orders sold out", type: "SALES" },
];

export default function NoticePage() {
  return (
    <>
      <section className="about-page-head notice-page-head">
        <span>03 / NOTICE</span>
        <h1>The project<br />record.</h1>
        <p>Selected events, disclosures, and milestones from the original 2023 venture and its 2026 portfolio reconstruction.</p>
      </section>
      <section className="about-notice about-page-section" aria-labelledby="notice-title">
        <div className="notice-title-row"><small>DROPWICH NOTICE BOARD</small><h2 id="notice-title">What changed—and when.</h2></div>
        <div className="notice-list">
          {notices.map((notice, index) => <article key={notice.title}><span>{String(index + 1).padStart(2, "0")}</span><time>{notice.date}</time><h3>{notice.title}</h3><b>{notice.type}</b></article>)}
        </div>
        <div className="notice-disclosure"><strong>PORTFOLIO NOTICE</strong><p>Dropwich is not currently operating as a commercial restaurant. Prices, names, sales records, and company roles on this site document the 2023 student venture.</p></div>
      </section>
    </>
  );
}
