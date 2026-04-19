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
  scenario: "Sublease between students",
  status: "Awaiting Deposit"
};

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

function getActionAvailability(status) {
  return {
    funded: status === "Draft" || status === "Awaiting Deposit",
    release: status === "Funded",
    refund: status === "Funded" || status === "Awaiting Deposit" || status === "Disputed",
    reset: true
  };
}

function getStatusToastMessage(status) {
  if (status === "Funded") {
    return "Deposit funded";
  }

  if (status === "Completed") {
    return "Deposit released";
  }

  if (status === "Refunded") {
    return "Deposit refunded";
  }

  return "Agreement updated";
}

export function DemoShell() {
  const { address, connected, ready, toggleWallet } = useMockWallet();
  const [agreements, setAgreements] = useState(mockAgreements);
  const [selectedAgreementId, setSelectedAgreementId] = useState(mockAgreements[0]?.id ?? null);
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
      id: `AGR-${100 + agreements.length + 1}`,
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
      moveInDate
    };

    setAgreements((current) => [nextAgreement, ...current]);
    setSelectedAgreementId(nextAgreement.id);
    setQuickViewAgreementId(nextAgreement.id);
    setForm(initialForm);
    setFormErrors({});
    pushToast("Escrow agreement created");
  }

  function updateAgreementStatus(targetStatus) {
    if (!selectedAgreementId) {
      return;
    }

    setAgreements((current) =>
      current.map((agreement) =>
        agreement.id === selectedAgreementId
          ? {
              ...agreement,
              status: targetStatus
            }
          : agreement
      )
    );
  }

  function resetDemo() {
    setAgreements(mockAgreements);
    setSelectedAgreementId(mockAgreements[0]?.id ?? null);
    setQuickViewAgreementId(null);
    setForm(initialForm);
    setFormErrors({});
    pushToast("Workspace reset");
  }

  function openAgreement(agreementId) {
    setSelectedAgreementId(agreementId);
    setQuickViewAgreementId(agreementId);
  }

  function updateAgreementStatusById(agreementId, targetStatus) {
    setAgreements((current) =>
      current.map((agreement) =>
        agreement.id === agreementId
          ? {
              ...agreement,
              status: targetStatus
            }
          : agreement
      )
    );
    pushToast(getStatusToastMessage(targetStatus));
  }

  function handleWalletToggle() {
    toggleWallet();
    pushToast(connected ? "Wallet disconnected" : "Wallet connected");
  }

  const actionAvailability = selectedAgreement
    ? getActionAvailability(selectedAgreement.status)
    : getActionAvailability("Draft");

  const quickViewActionAvailability = quickViewAgreement
    ? getActionAvailability(quickViewAgreement.status)
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
                      {selectedAgreement.status} within the current escrow
                      lifecycle.
                    </p>
                  </div>
                  <div>
                    <strong>Deal context</strong>
                    <p>{selectedAgreement.notes}</p>
                  </div>
                </div>

                <div className="action-column">
                  {actionAvailability.funded ? (
                    <button
                      className="action-button action-fund"
                      type="button"
                      onClick={() => updateAgreementStatusById(selectedAgreement.id, "Funded")}
                    >
                      <span>Fund Deposit</span>
                      <small>Move the deposit into escrow.</small>
                    </button>
                  ) : null}
                  {actionAvailability.release ? (
                    <button
                      className="action-button action-release"
                      type="button"
                      onClick={() => updateAgreementStatusById(selectedAgreement.id, "Completed")}
                    >
                      <span>Release Funds</span>
                      <small>Release funds to the landlord or sublessor.</small>
                    </button>
                  ) : null}
                  {actionAvailability.refund ? (
                    <button
                      className="action-button action-refund"
                      type="button"
                      onClick={() => updateAgreementStatusById(selectedAgreement.id, "Refunded")}
                    >
                      <span>Refund Deposit</span>
                      <small>Return the deposit to the renter.</small>
                    </button>
                  ) : null}
                  {!actionAvailability.funded &&
                  !actionAvailability.release &&
                  !actionAvailability.refund ? (
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
                    Fund from Draft or Awaiting Deposit. Release after funding.
                    Refund for awaiting, funded, or disputed agreements.
                  </p>
                </div>
              </>
            ) : (
              <p className="empty-state">
                Select an agreement to view deposit status and available actions.
              </p>
            )}

            <div className="note-box">
              <strong>Status overview</strong>
              <p className="support-text">
                Draft: {countByStatus(agreements, "Draft")} | Awaiting Deposit:{" "}
                {countByStatus(agreements, "Awaiting Deposit")} | Funded:{" "}
                {countByStatus(agreements, "Funded")} | Completed:{" "}
                {countByStatus(agreements, "Completed")} | Refunded:{" "}
                {countByStatus(agreements, "Refunded")}
              </p>
            </div>
          </aside>
        </div>
      </section>

      <AgreementDetailDialog
        agreement={quickViewAgreement}
        actionAvailability={quickViewActionAvailability}
        onOpenAgreementAction={(targetStatus) => {
          if (!quickViewAgreement) {
            return;
          }

          setSelectedAgreementId(quickViewAgreement.id);
          updateAgreementStatusById(quickViewAgreement.id, targetStatus);
        }}
        onClose={() => setQuickViewAgreementId(null)}
      />
      <ToastViewport toasts={toasts} onDismiss={dismissToast} />
    </main>
  );
}
