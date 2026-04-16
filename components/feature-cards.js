const features = [
  {
    title: "Escrow Instead of Direct Payment",
    description:
      "The renter sends the deposit into escrow first, so funds are not handed directly to a stranger."
  },
  {
    title: "Built for Student Rentals",
    description:
      "Designed for subleases, semester housing, and international student moves where trust is limited."
  },
  {
    title: "Stablecoin-Based Protection",
    description:
      "The demo explains deposit protection with stablecoins in simple language, without real blockchain setup."
  }
];

export function FeatureCards() {
  return (
    <section className="feature-section">
      <div className="section-heading">
        <h2>Why This Demo Exists</h2>
        <p>
          A short, presentation-friendly explanation of why blockchain escrow is
          useful for student rental deposits.
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
