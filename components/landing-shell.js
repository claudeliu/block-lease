import Link from "next/link";
import { LandingWaitlistForm } from "@/components/landing-waitlist-form";

const painPoints = [
  "Paying a deposit to a stranger feels risky",
  "Refund rules are often unclear",
  "Cross-border payment is stressful for international students"
];

const steps = [
  {
    title: "Place deposit into escrow",
    description:
      "The renter deposits funds into a neutral holding flow instead of sending money directly to the other party."
  },
  {
    title: "Confirm move-in terms",
    description:
      "Both sides align on the move-in timeline, refund expectations, and what needs to happen before the deposit is released."
  },
  {
    title: "Release or refund based on agreed rules",
    description:
      "The deposit outcome follows the terms both sides agreed to up front, reducing confusion and last-minute conflict."
  }
];

const benefits = [
  "Reduce deposit fraud risk",
  "Make refund rules transparent",
  "Simplify student rental payments"
];

const faqs = [
  {
    question: "Who is Block Lease for?",
    answer:
      "Block Lease is designed for student renters, sublessors, landlords, and especially international students arranging housing remotely."
  },
  {
    question: "Does this replace a housing marketplace?",
    answer:
      "No. The idea is to add a trusted deposit layer to subleases and lease takeovers rather than replace where students discover listings."
  },
  {
    question: "When is the deposit released or refunded?",
    answer:
      "The goal is to follow agreed move-in and refund rules so both sides know the outcome path before money changes hands."
  },
  {
    question: "Is this live today?",
    answer:
      "This version is an assignment-ready landing page and demo used to validate demand, gather waitlist interest, and show how the workflow could work."
  }
];

export function LandingShell() {
  return (
    <main className="page-shell marketing-page">
      <header className="marketing-topbar">
        <div className="brand-block">
          <div className="brand-mark">BL</div>
          <div className="brand-copy">
            <strong>Block Lease</strong>
            <p>Deposit protection for student subleases and remote move-ins</p>
          </div>
        </div>
        <nav className="marketing-nav" aria-label="Primary">
          <Link className="marketing-link" href="#waitlist">
            Waitlist
          </Link>
          <Link className="secondary-button secondary-button-compact" href="/demo">
            View Demo
          </Link>
        </nav>
      </header>

      <section className="marketing-hero glass-card">
        <div className="marketing-hero-copy">
          <p className="eyebrow">Student housing, with clearer deposit protection</p>
          <h1>Secure deposits for student subleases</h1>
          <p className="hero-description">
            Block Lease helps international students and student renters protect
            rental deposits through escrow, reducing fraud risk, refund
            disputes, and payment friction.
          </p>
          <div className="hero-actions">
            <Link className="primary-button" href="#waitlist">
              Join the Waitlist
            </Link>
            <Link className="secondary-button" href="/demo">
              View Demo
            </Link>
          </div>
          <p className="marketing-footnote">
            Designed for lease takeovers, student subleases, and renting before
            arrival.
          </p>
        </div>

        <aside className="marketing-hero-panel">
          <div className="marketing-highlight-card">
            <span className="marketing-highlight-label">Why students care</span>
            <strong>Rental deposits often depend on trust before move-in.</strong>
            <p>
              A neutral escrow flow can make remote renting feel safer for both
              sides without turning the experience into a complicated product
              pitch.
            </p>
          </div>

          <div className="marketing-mini-grid">
            <div className="marketing-mini-card">
              <strong>Remote-first</strong>
              <p>Useful when a renter is booking from another city or country.</p>
            </div>
            <div className="marketing-mini-card">
              <strong>Clearer expectations</strong>
              <p>Deposit release and refund terms are set before the handoff.</p>
            </div>
            <div className="marketing-mini-card">
              <strong>Student-focused</strong>
              <p>Built around subleases, takeovers, and semester housing.</p>
            </div>
          </div>
        </aside>
      </section>

      <section className="marketing-section">
        <div className="section-heading">
          <h2>Why this matters</h2>
          <p>
            Block Lease is built around the specific moments where student
            renters feel uncertainty before sending a deposit.
          </p>
        </div>
        <div className="marketing-card-grid">
          {painPoints.map((point) => (
            <article className="marketing-card glass-card" key={point}>
              <span className="marketing-card-kicker">Pain point</span>
              <h3>{point}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="marketing-section">
        <div className="section-heading">
          <h2>How it works</h2>
          <p>
            The flow is intentionally simple: hold the deposit, confirm the
            terms, then follow the agreed outcome.
          </p>
        </div>
        <div className="marketing-step-grid">
          {steps.map((step, index) => (
            <article className="marketing-step-card glass-card" key={step.title}>
              <span className="marketing-step-number">{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="marketing-section">
        <div className="marketing-benefit-panel glass-card">
          <div className="section-heading marketing-benefit-heading">
            <h2>What Block Lease aims to improve</h2>
            <p>
              The value proposition is practical: make student rental deposits
              feel more predictable and less risky.
            </p>
          </div>
          <ul className="marketing-benefit-list">
            {benefits.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="marketing-section" id="waitlist">
        <div className="section-heading">
          <h2>Join the waitlist</h2>
          <p>
            Share your email and where you fit so we can gauge interest from
            student renters and property-side users.
          </p>
        </div>
        <div className="waitlist-grid">
          <div className="glass-card waitlist-card">
            <LandingWaitlistForm />
          </div>
          <aside className="glass-card waitlist-sidecard">
            <span className="marketing-card-kicker">Assignment focus</span>
            <h3>Validate demand before building more.</h3>
            <p>
              This landing page is meant to test whether students and landlords
              want a safer deposit workflow before the product becomes more
              feature-heavy.
            </p>
            <ul className="marketing-aside-list">
              <li>Useful for international students renting remotely</li>
              <li>Clear for a class presentation or entrepreneurship submission</li>
              <li>Easy to extend later with a real form provider or CRM</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="marketing-section">
        <div className="section-heading">
          <h2>FAQ</h2>
          <p>Short answers for the most likely questions from classmates and reviewers.</p>
        </div>
        <div className="faq-list">
          {faqs.map((item) => (
            <article className="faq-item glass-card" key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
