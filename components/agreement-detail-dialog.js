"use client";

import { useEffect } from "react";
import { StatusBadge } from "@/components/status-badge";

const escrowSteps = ["Draft", "Awaiting Deposit", "Funded", "Completed"];

function getAvailableActions(status) {
  if (status === "Awaiting Deposit" || status === "Draft") {
    return [
      {
        key: "fund",
        label: "Fund Deposit",
        helper: "Move the deposit into escrow.",
        nextStatus: "Funded",
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
        nextStatus: "Completed",
        className: "action-release"
      },
      {
        key: "refund",
        label: "Refund Deposit",
        helper: "Return the deposit to the renter.",
        nextStatus: "Refunded",
        className: "action-refund"
      }
    ];
  }

  return [];
}

function getStageState(status, step) {
  if (status === "Refunded") {
    if (step === "Awaiting Deposit" || step === "Funded") {
      return "step-complete";
    }

    return "step-muted";
  }

  const currentIndex = escrowSteps.indexOf(status);
  const stepIndex = escrowSteps.indexOf(step);

  if (currentIndex > stepIndex) {
    return "step-complete";
  }

  if (currentIndex === stepIndex) {
    return "step-current";
  }

  return "step-muted";
}

export function AgreementDetailDialog({
  agreement,
  onClose,
  onOpenAgreementAction,
  actionAvailability
}) {
  useEffect(() => {
    if (!agreement) {
      return undefined;
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

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

  const availableActions = getAvailableActions(agreement.status);

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
            <p className="support-text">
              Current stage: {agreement.status}
            </p>
          </div>
          <div className="stage-steps">
            {escrowSteps.map((step) => (
              <div
                key={step}
                className={`stage-step ${getStageState(agreement.status, step)}`}
              >
                <span className="stage-dot" />
                <span>{step}</span>
              </div>
            ))}
            {agreement.status === "Refunded" ? (
              <div className="stage-step step-current">
                <span className="stage-dot" />
                <span>Refunded</span>
              </div>
            ) : null}
          </div>
        </section>

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

        <div className="modal-action-panel">
          <strong>Escrow actions</strong>
          {availableActions.length ? (
            <div className="modal-actions">
              {availableActions.map((action) => (
                <button
                  key={action.key}
                  className={`action-button ${action.className}`}
                  type="button"
                  disabled={!actionAvailability?.[action.key]}
                  onClick={() => onOpenAgreementAction(action.nextStatus)}
                >
                  <span>{action.label}</span>
                  <small>{action.helper}</small>
                </button>
              ))}
            </div>
          ) : (
            <div className="action-state-card">
              <strong>{agreement.status === "Refunded" ? "Deposit refunded" : "Escrow complete"}</strong>
              <p className="support-text">
                {agreement.status === "Refunded"
                  ? "This agreement has already been refunded to the renter."
                  : "This agreement has already reached its final release state."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
