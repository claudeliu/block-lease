"use client";

import { useEffect, useState } from "react";
import { StatusBadge } from "@/components/status-badge";

const progressSteps = [
  {
    key: "created",
    label: "Agreement Created"
  },
  {
    key: "funded",
    label: "Deposit Funded"
  },
  {
    key: "review",
    label: "Review / Dispute"
  },
  {
    key: "resolved",
    label: "Released / Refunded"
  }
];

function isReviewState(status) {
  return status === "Under Review" || status === "Disputed";
}

function getStageState(agreement, stepKey) {
  const { status, dispute } = agreement;

  if (status === "Awaiting Deposit" || status === "Draft") {
    if (stepKey === "created") {
      return "step-current";
    }

    return "step-muted";
  }

  if (status === "Funded") {
    if (stepKey === "created") {
      return "step-complete";
    }

    if (stepKey === "funded") {
      return "step-current";
    }

    return "step-muted";
  }

  if (isReviewState(status)) {
    if (stepKey === "review") {
      return "step-current";
    }

    if (stepKey === "created" || stepKey === "funded") {
      return "step-complete";
    }

    return "step-muted";
  }

  if (status === "Completed" || status === "Refunded") {
    if (stepKey === "resolved") {
      return "step-current";
    }

    if (stepKey === "review") {
      return dispute ? "step-complete" : "step-muted";
    }

    return "step-complete";
  }

  return "step-muted";
}

function getStageDescription(agreement) {
  if (agreement.status === "Awaiting Deposit") {
    return "The agreement is ready to be funded into escrow.";
  }

  if (agreement.status === "Funded") {
    return "Funds are secured in escrow and can now be released, refunded, or sent into review.";
  }

  if (agreement.status === "Under Review") {
    return "Funds are temporarily locked during review while both sides submit supporting details.";
  }

  if (agreement.status === "Disputed") {
    return "Payout actions are paused while this case is under dispute review.";
  }

  if (agreement.status === "Refunded") {
    return "The deposit has been returned to the renter.";
  }

  if (agreement.status === "Completed") {
    return "The deposit has been released and the escrow is complete.";
  }

  return "The agreement is ready for the next escrow step.";
}

function getPrimaryActions(status) {
  if (status === "Awaiting Deposit" || status === "Draft") {
    return [
      {
        key: "fund",
        label: "Fund Deposit",
        helper: "Move the deposit into escrow.",
        className: "action-fund"
      }
    ];
  }

  if (status === "Funded") {
    return [
      {
        key: "release",
        label: "Release Deposit",
        helper: "Release funds to the landlord or sublessor.",
        className: "action-release"
      },
      {
        key: "refund",
        label: "Refund Deposit",
        helper: "Return the deposit to the renter.",
        className: "action-refund"
      },
      {
        key: "review",
        label: "Raise Dispute",
        helper: "Pause payout actions and open a review case.",
        className: "action-review"
      }
    ];
  }

  return [];
}

export function AgreementDetailDialog({
  agreement,
  onAddEvidence,
  onChangeDisputeField,
  onClose,
  onFundAgreement,
  onRaiseDispute,
  onRefundAgreement,
  onReleaseAgreement,
  onResolveReview
}) {
  const [evidenceDraft, setEvidenceDraft] = useState("");

  useEffect(() => {
    if (!agreement) {
      return undefined;
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    setEvidenceDraft("");
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [agreement, onClose]);

  if (!agreement) {
    return null;
  }

  const primaryActions = getPrimaryActions(agreement.status);
  const dispute = agreement.dispute;
  const reviewActive = isReviewState(agreement.status);
  const hasResolution = Boolean(dispute?.resolution);

  function handlePrimaryAction(actionKey) {
    if (actionKey === "fund") {
      onFundAgreement(agreement.id);
      return;
    }

    if (actionKey === "release") {
      onReleaseAgreement(agreement.id);
      return;
    }

    if (actionKey === "refund") {
      onRefundAgreement(agreement.id);
      return;
    }

    if (actionKey === "review") {
      onRaiseDispute(agreement.id);
    }
  }

  function handleAddEvidence() {
    if (!evidenceDraft.trim()) {
      return;
    }

    onAddEvidence(agreement.id, evidenceDraft);
    setEvidenceDraft("");
  }

  return (
    <div className="modal-scrim" onClick={onClose} role="presentation">
      <div
        className="modal-card agreement-modal"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Agreement detail"
      >
        <div className="modal-head">
          <div>
            <StatusBadge status={agreement.status} />
            <h3>{agreement.title}</h3>
            <p className="support-text modal-subcopy">{agreement.scenario}</p>
          </div>
          <button
            className="icon-button"
            type="button"
            onClick={onClose}
            aria-label="Close agreement detail"
          >
            X
          </button>
        </div>

        <section className="modal-stage-panel">
          <div className="modal-stage-copy">
            <strong>Escrow progress</strong>
            <p className="support-text">{getStageDescription(agreement)}</p>
          </div>
          <div className="stage-steps">
            {progressSteps.map((step) => (
              <div
                key={step.key}
                className={`stage-step ${getStageState(agreement, step.key)}`}
              >
                <span className="stage-dot" />
                <span>{step.label}</span>
              </div>
            ))}
          </div>
        </section>

        {reviewActive ? (
          <section className="review-lock-banner">
            <strong>Funds are temporarily locked during review</strong>
            <p className="support-text">
              Payout actions are paused while this case is reviewed and a resolution is selected.
            </p>
          </section>
        ) : null}

        <div className="detail-grid modal-detail-grid">
          <div>
            <strong>Renter</strong>
            <p>{agreement.renter}</p>
          </div>
          <div>
            <strong>Landlord / sublessor</strong>
            <p>{agreement.landlord}</p>
          </div>
          <div>
            <strong>Property / unit</strong>
            <p>{agreement.property}</p>
          </div>
          <div>
            <strong>Deposit amount</strong>
            <p>
              {agreement.deposit} {agreement.currency}
            </p>
          </div>
          <div>
            <strong>Agreement type</strong>
            <p>{agreement.scenario}</p>
          </div>
          <div>
            <strong>Escrow window</strong>
            <p>{agreement.duration}</p>
          </div>
          <div>
            <strong>Created</strong>
            <p>{agreement.createdAt}</p>
          </div>
          <div>
            <strong>Move-in target</strong>
            <p>{agreement.moveInDate}</p>
          </div>
          <div className="detail-wide">
            <strong>Agreement note</strong>
            <p>{agreement.notes}</p>
          </div>
        </div>

        <section className="modal-action-panel">
          <strong>Escrow actions</strong>
          {primaryActions.length ? (
            <div className="modal-actions">
              {primaryActions.map((action) => (
                <button
                  key={action.key}
                  className={`action-button ${action.className}`}
                  type="button"
                  onClick={() => handlePrimaryAction(action.key)}
                >
                  <span>{action.label}</span>
                  <small>{action.helper}</small>
                </button>
              ))}
            </div>
          ) : (
            <div className="action-state-card">
              <strong>
                {reviewActive
                  ? "Review is active"
                  : agreement.status === "Refunded"
                    ? "Deposit refunded"
                    : "Escrow complete"}
              </strong>
              <p className="support-text">
                {reviewActive
                  ? "Normal release and refund actions are paused until the review is resolved."
                  : agreement.status === "Refunded"
                    ? "This agreement has already been refunded to the renter."
                    : "This agreement has already reached its final release state."}
              </p>
            </div>
          )}
        </section>

        {dispute ? (
          <section className="review-panel">
            <div className="section-heading">
              <h2>Dispute Details</h2>
              <p>
                Track the issue, who raised it, and the current review stage without leaving the dashboard.
              </p>
            </div>
            <div className="review-grid">
              <label className="field">
                <span>Dispute status</span>
                <select
                  value={dispute.caseStatus}
                  onChange={(event) =>
                    onChangeDisputeField(agreement.id, "caseStatus", event.target.value)
                  }
                >
                  <option>Under Review</option>
                  <option>Disputed</option>
                  <option>Closed</option>
                </select>
              </label>
              <label className="field">
                <span>Raised by</span>
                <select
                  value={dispute.raisedBy}
                  onChange={(event) =>
                    onChangeDisputeField(agreement.id, "raisedBy", event.target.value)
                  }
                >
                  <option>Renter</option>
                  <option>Landlord</option>
                </select>
              </label>
              <label className="field">
                <span>Issue type</span>
                <select
                  value={dispute.issueType}
                  onChange={(event) =>
                    onChangeDisputeField(agreement.id, "issueType", event.target.value)
                  }
                >
                  <option>Move-in issue</option>
                  <option>Property condition</option>
                  <option>Cancellation timing</option>
                  <option>Deposit return disagreement</option>
                  <option>Other</option>
                </select>
              </label>
              <label className="field">
                <span>Current review stage</span>
                <select
                  value={dispute.reviewStage}
                  onChange={(event) =>
                    onChangeDisputeField(agreement.id, "reviewStage", event.target.value)
                  }
                >
                  <option>Evidence submitted</option>
                  <option>Counterparty response</option>
                  <option>Resolution discussion</option>
                  <option>Ready to resolve</option>
                  <option>Closed</option>
                </select>
              </label>
              <label className="field field-wide textarea-field">
                <span>Dispute summary</span>
                <textarea
                  rows="4"
                  value={dispute.summary}
                  onChange={(event) =>
                    onChangeDisputeField(agreement.id, "summary", event.target.value)
                  }
                />
              </label>
              {hasResolution ? (
                <div className="detail-wide action-state-card">
                  <strong>Resolution recorded</strong>
                  <p className="support-text">{dispute.resolution}</p>
                </div>
              ) : null}
            </div>
          </section>
        ) : null}

        {dispute ? (
          <section className="review-panel">
            <div className="section-heading">
              <h2>Supporting Materials</h2>
              <p>
                Add notes or evidence references that help explain the review decision.
              </p>
            </div>
            <div className="supporting-list">
              {dispute.evidence.length ? (
                dispute.evidence.map((item) => (
                  <div className="supporting-item" key={item.id}>
                    <span className="supporting-dot" />
                    <span>{item.label}</span>
                  </div>
                ))
              ) : (
                <div className="action-state-card">
                  <strong>No supporting materials yet</strong>
                  <p className="support-text">
                    Add a note, image reference, or chat summary to document the review.
                  </p>
                </div>
              )}
            </div>
            <div className="supporting-composer">
              <label className="field field-wide">
                <span>Add supporting material</span>
                <input
                  list="supporting-material-options"
                  placeholder="Move-in photos, chat screenshots, repair receipt"
                  value={evidenceDraft}
                  onChange={(event) => setEvidenceDraft(event.target.value)}
                />
              </label>
              <button
                className="secondary-button supporting-add-button"
                type="button"
                disabled={!evidenceDraft.trim()}
                onClick={handleAddEvidence}
              >
                Add Item
              </button>
              <datalist id="supporting-material-options">
                <option value="Move-in photos" />
                <option value="Chat screenshots" />
                <option value="Lease screenshot" />
                <option value="Repair receipt" />
                <option value="Written note" />
              </datalist>
            </div>
          </section>
        ) : null}

        {reviewActive ? (
          <section className="review-panel">
            <div className="section-heading">
              <h2>Resolution Options</h2>
              <p>
                Choose how the escrow should resolve once both sides have been reviewed.
              </p>
            </div>
            <div className="resolution-grid">
              <button
                className="action-button action-refund"
                type="button"
                onClick={() => onResolveReview(agreement.id, "refund")}
              >
                <span>Refund Full Deposit</span>
                <small>Return the entire escrow amount to the renter.</small>
              </button>
              <button
                className="action-button action-release"
                type="button"
                onClick={() => onResolveReview(agreement.id, "release")}
              >
                <span>Release Full Deposit</span>
                <small>Release the escrow amount to the landlord or sublessor.</small>
              </button>
              <button
                className="action-button action-split"
                type="button"
                onClick={() => onResolveReview(agreement.id, "split")}
              >
                <span>Split Deposit 50 / 50</span>
                <small>Record a balanced split as the final resolution.</small>
              </button>
              <button
                className="action-button action-reset"
                type="button"
                onClick={() => onResolveReview(agreement.id, "close")}
              >
                <span>Close Review</span>
                <small>Return the agreement to funded escrow without releasing funds.</small>
              </button>
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
