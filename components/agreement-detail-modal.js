import { StatusBadge } from "@/components/status-badge";

export function AgreementDetailModal({ agreement, onClose }) {
  if (!agreement) {
    return null;
  }

  return (
    <div className="modal-scrim" onClick={onClose} role="presentation">
      <div
        className="modal-card"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Agreement detail"
      >
        <div className="modal-head">
          <div>
            <StatusBadge status={agreement.status} />
            <h3>{agreement.title}</h3>
          </div>
          <button className="icon-button" type="button" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="detail-grid">
          <div>
            <strong>Participants</strong>
            <p>
              {agreement.renter} and {agreement.landlord}
            </p>
          </div>
          <div>
            <strong>Property</strong>
            <p>{agreement.property}</p>
          </div>
          <div>
            <strong>Deposit</strong>
            <p>
              {agreement.deposit} {agreement.currency}
            </p>
          </div>
          <div>
            <strong>Duration</strong>
            <p>{agreement.duration}</p>
          </div>
          <div>
            <strong>Scenario</strong>
            <p>{agreement.scenario}</p>
          </div>
          <div>
            <strong>Notes</strong>
            <p>{agreement.notes}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
