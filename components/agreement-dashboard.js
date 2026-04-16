import { StatusBadge } from "@/components/status-badge";

export function AgreementDashboard({
  agreements,
  onSelect,
  onQuickView,
  selectedAgreementId
}) {
  return (
    <section className="card glass-card" id="dashboard">
      <div className="section-heading">
        <h2>Agreement Dashboard</h2>
        <p>
          Mock agreements show how a blockchain-based rental deposit escrow can
          protect student rentals and subleases from draft to deposit outcome.
        </p>
      </div>
      <div className="dashboard-grid">
        {agreements.length === 0 ? (
          <p className="empty-state">No agreements yet. Create one to begin the demo.</p>
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
                  onClick={() => onQuickView(agreement)}
                >
                  Quick View
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
                  className="secondary-button"
                  type="button"
                  onClick={() => {
                    onSelect(agreement.id);
                    onQuickView(null);
                  }}
                >
                  Open Details
                </button>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
