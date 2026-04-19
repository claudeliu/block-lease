import Link from "next/link";

export function LandingHero() {
  return (
    <section className="hero-layout">
      <div className="glass-card hero-card">
        <p className="eyebrow">Rental deposit escrow</p>
        <div className="hero-copy-block">
          <h1>Rental deposit escrow built for student housing.</h1>
          <p className="hero-description">
            Block Lease gives renters, landlords, and student sublessors a
            neutral way to secure deposits before move-in. It reduces trust
            friction for cross-border rentals, subleases, lease takeovers, and
            remote bookings by holding funds until agreed conditions are met.
          </p>
        </div>
        <div className="hero-actions">
          <Link className="primary-button" href="/demo#create-agreement">
            Start Escrow
          </Link>
          <Link className="secondary-button" href="/demo#dashboard">
            View Dashboard
          </Link>
        </div>
      </div>
      <aside className="glass-card side-panel">
        <div className="mini-stat">
          <strong>Cross-border ready</strong>
          <span className="support-text">
            Create a stronger commitment path when renters arrive without local banking history.
          </span>
        </div>
        <div className="mini-stat">
          <strong>Built for subleases</strong>
          <span className="support-text">
            Replace risky direct transfers with escrow for student-to-student housing deals.
          </span>
        </div>
        <div className="mini-stat">
          <strong>Release or refund logic</strong>
          <span className="support-text">
            Hold the deposit until move-in, release, or refund conditions are clear.
          </span>
        </div>
      </aside>
    </section>
  );
}
