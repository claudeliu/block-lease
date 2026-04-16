import Link from "next/link";

export function LandingHero() {
  return (
    <section className="hero-layout">
      <div className="glass-card hero-card">
        <p className="eyebrow">Classroom demo</p>
        <div className="hero-copy-block">
          <h1>Secure rental deposit escrow for student rentals and subleases.</h1>
          <p className="hero-description">
            This demo shows how renters send a security deposit into escrow
            instead of paying a landlord or sublessor directly. It is designed
            for student rentals, campus subleases, and international students
            dealing with low-trust rental situations.
          </p>
          <p className="hero-description">
            In simple terms, a stablecoin deposit stays protected in escrow
            until the rental is completed, refunded, or released. That makes the
            concept easier to explain in stranger-to-stranger rental scenarios.
          </p>
        </div>
        <div className="hero-actions">
          <Link className="primary-button" href="/demo#create-agreement">
            Create Demo Agreement
          </Link>
          <Link className="secondary-button" href="/demo#dashboard">
            View Sample Dashboard
          </Link>
        </div>
      </div>
      <aside className="glass-card side-panel">
        <div className="mini-stat">
          <strong>Escrow first</strong>
          <span className="support-text">
            The renter sends the deposit to escrow first, not directly to the landlord.
          </span>
        </div>
        <div className="mini-stat">
          <strong>Student-focused</strong>
          <span className="support-text">
            Useful for student leases, short subleases, and international arrivals.
          </span>
        </div>
        <div className="mini-stat">
          <strong>Low-trust protection</strong>
          <span className="support-text">
            Helps explain why escrow matters when two parties do not know each other yet.
          </span>
        </div>
        <div className="mini-stat">
          <strong>Mock product flow</strong>
          <span className="support-text">
            Connect a mock wallet, open the workspace, and walk through funding, release, and refund.
          </span>
        </div>
      </aside>
    </section>
  );
}
