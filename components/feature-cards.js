const features = [
  {
    title: "Hold the Deposit in Escrow",
    description:
      "Keep funds in a neutral escrow flow instead of sending them directly to a landlord or sublessor."
  },
  {
    title: "Reduce Trust Friction",
    description:
      "Give both sides a clearer commitment process when timing, identity, and payment proof create hesitation."
  },
  {
    title: "Built for Student Housing",
    description:
      "Designed for subleases, lease takeovers, remote bookings, and cross-border rentals, with blockchain-based escrow and stablecoin settlement under the hood."
  }
];

export function FeatureCards() {
  return (
    <section className="feature-section">
      <div className="section-heading">
        <h2>Why Block Lease</h2>
        <p>
          A better way to move from interest to commitment when student housing
          decisions depend on trust, timing, and payment confidence.
        </p>
      </div>
      <div className="feature-grid">
        {features.map((feature) => (
          <article className="card glass-card feature-card" key={feature.title}>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
