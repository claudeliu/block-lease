export function LandingHero() {
  return (
    <section className="hero-layout">
      <div className="glass-card hero-card">
        <p className="eyebrow">Classroom demo</p>
        <div className="hero-copy-block">
          <h1>Secure rental deposit escrow for student housing.</h1>
          <p className="hero-description">
            This demo shows a blockchain-based rental deposit escrow flow where
            renters send the deposit into escrow instead of paying landlords
            directly. It is designed for student rentals, short subleases, and
            international students navigating low-trust rental situations with
            strangers.
          </p>
          <p className="hero-description">
            Deposits are represented with stablecoins in simple terms: the funds
            stay protected in escrow until the agreement is completed, refunded,
            or released based on the rental outcome.
          </p>
        </div>
        <div className="hero-points">
          <div className="hero-point">Designed for student rentals and subleases</div>
          <div className="hero-point">Useful when renter and landlord do not know each other</div>
          <div className="hero-point">Stablecoin-based protection with no real wallet required here</div>
          <div className="hero-point">Simple local demo for presentation and walkthroughs</div>
        </div>
        <div className="hero-actions">
          <a className="primary-button" href="#create-agreement">
            Create Demo Agreement
          </a>
          <a className="secondary-button" href="#dashboard">
            View Dashboard
          </a>
        </div>
      </div>
      <aside className="glass-card side-panel">
        <div className="mini-stat">
          <strong>Escrow first</strong>
          <span className="support-text">
            Renter deposits are held neutrally before landlord release.
          </span>
        </div>
        <div className="mini-stat">
          <strong>Low-trust friendly</strong>
          <span className="support-text">
            Useful for cross-border, short-term, and stranger-to-stranger rentals.
          </span>
        </div>
        <div className="mini-stat">
          <strong>Presentation ready</strong>
          <span className="support-text">
            Mock wallet and mock smart contract behavior keep the demo easy to run.
          </span>
        </div>
      </aside>
    </section>
  );
}
