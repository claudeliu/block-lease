"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AgreementDashboard } from "@/components/agreement-dashboard";
import { AgreementDetailDialog } from "@/components/agreement-detail-dialog";
import { CreateAgreementForm } from "@/components/create-agreement-form";
import { MockWalletControl, useMockWallet } from "@/components/mock-wallet-control";
import { StatusBadge } from "@/components/status-badge";
import { mockAgreements } from "@/data/mock-agreements";
import { ToastViewport, useToastQueue } from "@/components/toast-viewport";

const initialForm = {
  title: "",
  renter: "",
  landlord: "",
  property: "",
  deposit: "",
  duration: "",
  scenario: "Sublease between students"
};

const statusOrder = [
  "Awaiting Deposit",
  "Funded",
  "Under Review",
  "Disputed",
  "Completed",
  "Refunded"
];

function getInitialAgreements() {
  return mockAgreements.map((agreement) => ({
    ...agreement,
    dispute: agreement.dispute
      ? {
          ...agreement.dispute,
          evidence: agreement.dispute.evidence.map((item) => ({ ...item }))
        }
      : null
  }));
}

function countByStatus(agreements, targetStatus) {
  return agreements.filter((agreement) => agreement.status === targetStatus).length;
}

function formatDisplayDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(date);
}

function buildAgreementId(agreements) {
  const maxId = agreements.reduce((highest, agreement) => {
    const numericId = Number(agreement.id.replace(/\D/g, ""));
    return Number.isNaN(numericId) ? highest : Math.max(highest, numericId);
  }, 100);

  return `AGR-${maxId + 1}`;
}

function buildEvidenceId() {
  return `EV-${Math.floor(Date.now() % 1000000)}`;
}

function createDisputeRecord(overrides = {}) {
  return {
    caseStatus: "Under Review",
    raisedBy: "Renter",
    issueType: "Move-in issue",
    summary: "Review opened while both sides confirm move-in details and expected deposit handling.",
    reviewStage: "Evidence submitted",
    evidence: [],
    resolution: "",
    ...overrides
  };
}

function isReviewState(status) {
  return status === "Under Review" || status === "Disputed";
}

function getActionAvailability(status) {
  return {
    fund: status === "Draft" || status === "Awaiting Deposit",
    release: status === "Funded",
    refund: status === "Funded" || status === "Awaiting Deposit",
    raiseDispute: status === "Funded",
    reviewActive: isReviewState(status),
    final: status === "Completed" || status === "Refunded",
    reset: true
  };
}

export function DemoShell() {
  const { address, connected, ready, toggleWallet } = useMockWallet();
  const [agreements, setAgreements] = useState(() => getInitialAgreements());
  const [selectedAgreementId, setSelectedAgreementId] = useState(() => mockAgreements[0]?.id ?? null);
  const [quickViewAgreementId, setQuickViewAgreementId] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [formErrors, setFormErrors] = useState({});
  const { dismissToast, pushToast, toasts } = useToastQueue();

  const selectedAgreement = useMemo(
    () => agreements.find((agreement) => agreement.id === selectedAgreementId) ?? null,
    [agreements, selectedAgreementId]
  );

  const quickViewAgreement = useMemo(
    () => agreements.find((agreement) => agreement.id === quickViewAgreementId) ?? null,
    [agreements, quickViewAgreementId]
  );

  const statusOverview = useMemo(
    () =>
      statusOrder.map((status) => ({
        status,
        count: countByStatus(agreements, status)
      })),
    [agreements]
  );

  function updateAgreementById(agreementId, updater) {
    setAgreements((current) =>
      current.map((agreement) =>
        agreement.id === agreementId ? updater(agreement) : agreement
      )
    );
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setFormErrors((current) => ({
      ...current,
      [name]: ""
    }));
  }

  function validateForm() {
    const nextErrors = {};

    if (!form.title.trim()) {
      nextErrors.title = "Enter an agreement name.";
    }

    if (!form.deposit || Number.isNaN(Number(form.deposit)) || Number(form.deposit) <= 0) {
      nextErrors.deposit = "Enter a valid deposit amount.";
    }

    if (!form.renter.trim()) {
      nextErrors.renter = "Enter the renter name.";
    }

    if (!form.landlord.trim()) {
      nextErrors.landlord = "Enter the landlord or sublessor.";
    }

    if (!form.property.trim()) {
      nextErrors.property = "Enter the property or unit.";
    }

    if (!form.duration.trim()) {
      nextErrors.duration = "Enter the agreement period.";
    }

    return nextErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = validateForm();

    if (Object.keys(nextErrors).length) {
      setFormErrors(nextErrors);
      return;
    }

    const createdAt = formatDisplayDate(new Date());
    const moveInDate = form.duration.split("-")[0]?.trim() || "TBD";

    const nextAgreement = {
      id: buildAgreementId(agreements),
      title: form.title,
      renter: form.renter,
      landlord: form.landlord,
      property: form.property,
      deposit: Number(form.deposit),
      currency: "USDC",
      duration: form.duration,
      scenario: form.scenario,
      status: "Awaiting Deposit",
      notes: "Deposit terms are in place and the agreement is ready for funding, release, or refund.",
      createdAt,
      moveInDate,
      dispute: null
    };

    setAgreements((current) => [nextAgreement, ...current]);
    setSelectedAgreementId(nextAgreement.id);
    setQuickViewAgreementId(nextAgreement.id);
    setForm(initialForm);
    setFormErrors({});
    pushToast("Escrow agreement created");
  }

  function resetDemo() {
    const nextAgreements = getInitialAgreements();
    setAgreements(nextAgreements);
    setSelectedAgreementId(mockAgreements[0]?.id ?? null);
    setQuickViewAgreementId(null);
    setForm(initialForm);
    setFormErrors({});
    pushToast("Escrow workspace reset");
  }

  function openAgreement(agreementId) {
    setSelectedAgreementId(agreementId);
    setQuickViewAgreementId(agreementId);
  }

  function fundAgreement(agreementId) {
    setSelectedAgreementId(agreementId);
    updateAgreementById(agreementId, (agreement) => ({
      ...agreement,
      status: "Funded"
    }));
    pushToast("Deposit funded");
  }

  function releaseAgreement(agreementId) {
    setSelectedAgreementId(agreementId);
    updateAgreementById(agreementId, (agreement) => ({
      ...agreement,
      status: "Completed"
    }));
    pushToast("Deposit released");
  }

  function refundAgreement(agreementId) {
    setSelectedAgreementId(agreementId);
    updateAgreementById(agreementId, (agreement) => ({
      ...agreement,
      status: "Refunded"
    }));
    pushToast("Deposit refunded");
  }

  function raiseDispute(agreementId) {
    setSelectedAgreementId(agreementId);
    setQuickViewAgreementId(agreementId);
    updateAgreementById(agreementId, (agreement) => ({
      ...agreement,
      status: "Under Review",
      dispute: agreement.dispute
        ? {
            ...agreement.dispute,
            caseStatus: "Under Review",
            reviewStage: "Evidence submitted",
            resolution: ""
          }
        : createDisputeRecord()
    }));
    pushToast("Agreement moved to review");
  }

  function changeDisputeField(agreementId, field, value) {
    updateAgreementById(agreementId, (agreement) => {
      const currentDispute = agreement.dispute ?? createDisputeRecord();
      let nextDispute = {
        ...currentDispute,
        [field]: value
      };

      let nextStatus = agreement.status;

      if (field === "caseStatus") {
        if (value === "Under Review" || value === "Disputed") {
          nextStatus = value;
          nextDispute = {
            ...nextDispute,
            reviewStage:
              currentDispute.caseStatus === "Closed"
                ? "Evidence submitted"
                : nextDispute.reviewStage,
            resolution: ""
          };
        } else if (value === "Closed" && isReviewState(agreement.status)) {
          nextStatus = "Funded";
        }
      }

      return {
        ...agreement,
        status: nextStatus,
        dispute: nextDispute
      };
    });

    if (field === "caseStatus") {
      if (value === "Under Review") {
        pushToast("Agreement moved to review");
      } else if (value === "Disputed") {
        pushToast("Dispute opened");
      } else if (value === "Closed") {
        pushToast("Review closed");
      }
    }
  }

  function addEvidenceItem(agreementId, label) {
    updateAgreementById(agreementId, (agreement) => {
      const currentDispute = agreement.dispute ?? createDisputeRecord();

      return {
        ...agreement,
        dispute: {
          ...currentDispute,
          evidence: [
            ...currentDispute.evidence,
            {
              id: buildEvidenceId(),
              label: label.trim()
            }
          ]
        }
      };
    });
    pushToast("Supporting material added");
  }

  function resolveReview(agreementId, resolutionType) {
    setSelectedAgreementId(agreementId);

    updateAgreementById(agreementId, (agreement) => {
      const currentDispute = agreement.dispute ?? createDisputeRecord();
      const baseDispute = {
        ...currentDispute,
        caseStatus: "Closed",
        reviewStage: "Closed"
      };

      if (resolutionType === "refund") {
        return {
          ...agreement,
          status: "Refunded",
          dispute: {
            ...baseDispute,
            resolution: "Full deposit refunded to the renter after review."
          }
        };
      }

      if (resolutionType === "release") {
        return {
          ...agreement,
          status: "Completed",
          dispute: {
            ...baseDispute,
            resolution: "Full deposit released to the landlord or sublessor after review."
          }
        };
      }

      if (resolutionType === "split") {
        return {
          ...agreement,
          status: "Completed",
          dispute: {
            ...baseDispute,
            resolution: "Deposit split 50 / 50 between renter and landlord as the final review outcome."
          }
        };
      }

      return {
        ...agreement,
        status: "Funded",
        dispute: {
          ...baseDispute,
          resolution: "Review closed. Funds remain in escrow and are available for the next payout action."
        }
      };
    });

    if (resolutionType === "refund") {
      pushToast("Deposit refunded");
      return;
    }

    if (resolutionType === "release") {
      pushToast("Deposit released");
      return;
    }

    if (resolutionType === "split") {
      pushToast("Deposit split");
      return;
    }

    pushToast("Review closed");
  }

  function handleWalletToggle() {
    toggleWallet();
    pushToast(connected ? "Wallet disconnected" : "Wallet connected");
  }

  const actionAvailability = selectedAgreement
    ? getActionAvailability(selectedAgreement.status)
    : getActionAvailability("Draft");

  return (
    <main className="page-shell">
      <header className="topbar">
        <div className="brand-block">
          <div className="brand-mark">BL</div>
          <div className="brand-copy">
            <strong>Block Lease</strong>
            <p>Rental deposit escrow operations</p>
          </div>
        </div>
        <div className="workspace-toolbar">
          <div className="topbar-status">
            {connected ? `Sandbox | ${address} connected` : "Sandbox | Wallet disconnected"}
          </div>
          <MockWalletControl
            compact
            address={address}
            connected={connected}
            ready={ready}
            onToggle={handleWalletToggle}
          />
          <Link className="secondary-button secondary-button-compact" href="/">
            Overview
          </Link>
        </div>
      </header>

      <section className="section-grid">
        <div className="section-stack">
          <CreateAgreementForm
            errors={formErrors}
            form={form}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </div>

        <div className="section-stack">
          <AgreementDashboard
            agreements={agreements}
            onOpenAgreement={openAgreement}
            selectedAgreementId={selectedAgreementId}
          />

          <aside className="detail-panel glass-card">
            <div className="section-heading">
              <h2>Escrow Details</h2>
              <p>
                Review participants, deposit status, and the next available
                escrow action.
              </p>
            </div>

            {selectedAgreement ? (
              <>
                <div className="detail-row">
                  <div>
                    <h3>{selectedAgreement.title}</h3>
                    <p className="support-text">{selectedAgreement.scenario}</p>
                  </div>
                  <StatusBadge status={selectedAgreement.status} />
                </div>

                <div className="detail-grid">
                  <div>
                    <strong>Participants</strong>
                    <p>
                      {selectedAgreement.renter} and {selectedAgreement.landlord}
                    </p>
                  </div>
                  <div>
                    <strong>Deposit held</strong>
                    <p>
                      {selectedAgreement.deposit} {selectedAgreement.currency}
                    </p>
                  </div>
                  <div>
                    <strong>Property</strong>
                    <p>{selectedAgreement.property}</p>
                  </div>
                  <div>
                    <strong>Rental term</strong>
                    <p>{selectedAgreement.duration}</p>
                  </div>
                  <div>
                    <strong>Current status</strong>
                    <p>
                      {selectedAgreement.status} within the current escrow lifecycle.
                    </p>
                  </div>
                  <div>
                    <strong>Deal context</strong>
                    <p>{selectedAgreement.notes}</p>
                  </div>
                </div>

                {actionAvailability.reviewActive ? (
                  <div className="review-lock-banner">
                    <strong>Funds are temporarily locked during review</strong>
                    <p className="support-text">
                      Release and refund actions are paused until the case is resolved from the agreement view.
                    </p>
                  </div>
                ) : null}

                <div className="action-column">
                  {actionAvailability.fund ? (
                    <button
                      className="action-button action-fund"
                      type="button"
                      onClick={() => fundAgreement(selectedAgreement.id)}
                    >
                      <span>Fund Deposit</span>
                      <small>Move the deposit into escrow.</small>
                    </button>
                  ) : null}
                  {actionAvailability.release ? (
                    <button
                      className="action-button action-release"
                      type="button"
                      onClick={() => releaseAgreement(selectedAgreement.id)}
                    >
                      <span>Release Funds</span>
                      <small>Release funds to the landlord or sublessor.</small>
                    </button>
                  ) : null}
                  {actionAvailability.refund ? (
                    <button
                      className="action-button action-refund"
                      type="button"
                      onClick={() => refundAgreement(selectedAgreement.id)}
                    >
                      <span>Refund Deposit</span>
                      <small>Return the deposit to the renter.</small>
                    </button>
                  ) : null}
                  {actionAvailability.raiseDispute ? (
                    <button
                      className="action-button action-review"
                      type="button"
                      onClick={() => raiseDispute(selectedAgreement.id)}
                    >
                      <span>Raise Dispute</span>
                      <small>Pause payout actions and open a review case.</small>
                    </button>
                  ) : null}
                  {actionAvailability.reviewActive ? (
                    <button
                      className="secondary-button"
                      type="button"
                      onClick={() => openAgreement(selectedAgreement.id)}
                    >
                      Open Review Panel
                    </button>
                  ) : null}
                  {actionAvailability.final ? (
                    <div className="action-state-card">
                      <strong>{selectedAgreement.status}</strong>
                      <p className="support-text">
                        This agreement is already in a final escrow state.
                      </p>
                    </div>
                  ) : null}
                  <button
                    className="action-button action-reset"
                    type="button"
                    onClick={resetDemo}
                  >
                    <span>Reset Workspace</span>
                    <small>Restore the default workspace state.</small>
                  </button>
                </div>

                <div className="note-box">
                  <strong>Available actions</strong>
                  <p className="support-text">
                    Fund agreements into escrow, release or refund funded deposits,
                    and send active cases into review when either side needs a protected pause.
                  </p>
                </div>
                {selectedAgreement.dispute ? (
                  <div className="note-box">
                    <strong>Review snapshot</strong>
                    <p className="support-text">
                      {selectedAgreement.dispute.raisedBy} raised a{" "}
                      {selectedAgreement.dispute.issueType.toLowerCase()} case.
                      Current stage: {selectedAgreement.dispute.reviewStage}.
                    </p>
                  </div>
                ) : null}
              </>
            ) : (
              <p className="empty-state">
                Select an agreement to view deposit status and available actions.
              </p>
            )}

            <div className="note-box">
              <strong>Status overview</strong>
              <div className="status-overview-grid">
                {statusOverview.map((item) => (
                  <div className="status-overview-item" key={item.status}>
                    <span>{item.status}</span>
                    <strong>{item.count}</strong>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <AgreementDetailDialog
        agreement={quickViewAgreement}
        onAddEvidence={addEvidenceItem}
        onChangeDisputeField={changeDisputeField}
        onClose={() => setQuickViewAgreementId(null)}
        onFundAgreement={fundAgreement}
        onRaiseDispute={raiseDispute}
        onRefundAgreement={refundAgreement}
        onReleaseAgreement={releaseAgreement}
        onResolveReview={resolveReview}
      />
      <ToastViewport toasts={toasts} onDismiss={dismissToast} />
    </main>
  );
}
