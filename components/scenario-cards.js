const scenarios = [
  {
    title: "Cross-Border Move-Ins",
    description:
      "Secure a deposit before arrival when the renter may not yet have local banking history, and both sides need a stronger commitment signal."
  },
  {
    title: "Subleases Between Strangers",
    description:
      "Create confidence for semester and summer subleases when renter and sublessor have never met and direct payment feels risky."
  },
  {
    title: "Remote Booking Before Arrival",
    description:
      "Bridge the gap between interest and move-in when a renter books from abroad or another city before seeing the room in person."
  },
  {
    title: "First-Time Student Sublessors",
    description:
      "Add structure to peer-to-peer housing when the listing is real but the person receiving the deposit is not a professional manager."
  },
  {
    title: "Lease Takeovers",
    description:
      "Support mid-lease handoffs and roommate replacements with a clear deposit path during the transition."
  }
];

export function ScenarioCards() {
  return (
    <section className="scenario-section">
      <div className="section-heading">
        <h2>Built for Real Student Housing Situations</h2>
        <p>
          Block Lease is designed for the moments where student rentals feel
          real, urgent, and harder to trust.
        </p>
      </div>
      <div className="scenario-grid">
        {scenarios.map((scenario) => (
          <article className="card glass-card scenario-card" key={scenario.title}>
            <h3>{scenario.title}</h3>
            <p>{scenario.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
