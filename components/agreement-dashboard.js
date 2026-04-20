import { StatusBadge } from "@/components/status-badge";

export function AgreementDashboard({
  agreements,
  onOpenAgreement,
  selectedAgreementId
}) {
  return (
    <section className="card glass-card" id="dashboard">
      <div className="section-heading">
        <h2>Escrow Dashboard</h2>
        <p>
          Track funded deposits, active reviews, and resolved escrow agreements
          across student housing, subleases, cross-border move-ins, and lease
          handoffs.
        </p>
      </div>
      <div className="dashboard-grid">
        {agreements.length === 0 ? (
          <p className="empty-state">No agreements yet. Create an escrow agreement to get started.</p>
        ) : (
          agreements.map((agreement) => (
            <article
              className={`agreement-card ${
                agreement.id === selectedAgreementId ? "agreement-card-active" : ""
              }`}
              key={agreement.id}
            >
              <div className="agreement-topline">
                <StatusBadge status={agreement.status} />
                <button
                  className="link-button"
                  type="button"
                  onClick={() => onOpenAgreement(agreement.id)}
                >
                  Preview
                </button>
              </div>
              <h3>{agreement.title}</h3>
              <p className="agreement-meta">
                {agreement.renter} and {agreement.landlord}
                <br />
                {agreement.property}
                <br />
                Deposit: {agreement.deposit} {agreement.currency}
              </p>
              <div className="agreement-footer">
                <span className="support-text">{agreement.scenario}</span>
                <button
                  className="secondary-button agreement-open-button"
                  type="button"
                  onClick={() => onOpenAgreement(agreement.id)}
                >
                  Open Agreement
                </button>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
