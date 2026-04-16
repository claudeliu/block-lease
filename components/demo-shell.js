"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AgreementDashboard } from "@/components/agreement-dashboard";
import { AgreementDetailDialog } from "@/components/agreement-detail-dialog";
import { CreateAgreementForm } from "@/components/create-agreement-form";
import { MockWalletControl, useMockWallet } from "@/components/mock-wallet-control";
import { StatusBadge } from "@/components/status-badge";
import { mockAgreements } from "@/data/mock-agreements";

const initialForm = {
  title: "",
  renter: "",
  landlord: "",
  property: "",
  deposit: "",
  duration: "",
  scenario: "Student sublease",
  status: "Draft"
};

const actionConfig = {
  funded: {
    label: "Fund Deposit",
    nextStatus: "Funded",
    className: "action-fund",
    helper: "Simulate renter sending the stablecoin deposit into escrow."
  },
  release: {
    label: "Release Deposit",
    nextStatus: "Completed",
    className: "action-release",
    helper: "Simulate escrow releasing funds to the landlord at lease completion."
  },
  refund: {
    label: "Refund Deposit",
    nextStatus: "Refunded",
    className: "action-refund",
    helper: "Simulate escrow returning the deposit to the renter."
  }
};

function countByStatus(agreements, targetStatus) {
  return agreements.filter((agreement) => agreement.status === targetStatus).length;
}

function getActionAvailability(status) {
  return {
    funded: status === "Draft" || status === "Awaiting Deposit",
    release: status === "Funded",
    refund: status === "Funded" || status === "Awaiting Deposit" || status === "Disputed",
    reset: true
  };
}

export function DemoShell() {
  const { connected, ready, toggleWallet } = useMockWallet();
  const [agreements, setAgreements] = useState(mockAgreements);
  const [selectedAgreementId, setSelectedAgreementId] = useState(mockAgreements[0]?.id ?? null);
  const [quickViewAgreement, setQuickViewAgreement] = useState(null);
  const [form, setForm] = useState(initialForm);

  const selectedAgreement = useMemo(
    () => agreements.find((agreement) => agreement.id === selectedAgreementId) ?? null,
    [agreements, selectedAgreementId]
  );

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

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
      status: form.status,
      notes: "Created locally for the class demo. Mock escrow and mock contract behavior only."
    };

    setAgreements((current) => [nextAgreement, ...current]);
    setSelectedAgreementId(nextAgreement.id);
    setForm(initialForm);
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
    setQuickViewAgreement(null);
    setForm(initialForm);
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
            <p>Demo workspace for rental deposit escrow</p>
          </div>
        </div>
        <div className="workspace-toolbar">
          <div className="topbar-status">
            {connected ? "Mock wallet connected | Demo mode" : "Wallet not connected | Demo mode"}
          </div>
          <MockWalletControl
            compact
            connected={connected}
            ready={ready}
            onToggle={toggleWallet}
          />
          <Link className="secondary-button secondary-button-compact" href="/">
            Back to Landing
          </Link>
        </div>
      </header>

      <section className="workspace-intro glass-card">
        <div className="section-heading">
          <h2>Demo Workspace</h2>
          <p>
            This is the interactive part of the classroom demo. Create a sample
            agreement, inspect status badges, and walk through the escrow
            actions with a mock wallet state.
          </p>
        </div>
      </section>

      <section className="section-grid">
        <div className="section-stack">
          <CreateAgreementForm
            form={form}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </div>

        <div className="section-stack">
          <AgreementDashboard
            agreements={agreements}
            onSelect={setSelectedAgreementId}
            onQuickView={setQuickViewAgreement}
            selectedAgreementId={selectedAgreementId}
          />

          <aside className="detail-panel glass-card">
            <div className="section-heading">
              <h2>Agreement Detail</h2>
              <p>
                Use the action buttons below to simulate funding, release,
                refund, or a full demo reset.
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
                      {selectedAgreement.status} in the mock escrow flow for a
                      student rental or sublease.
                    </p>
                  </div>
                  <div>
                    <strong>Scenario note</strong>
                    <p>{selectedAgreement.notes}</p>
                  </div>
                </div>

                <div className="action-column">
                  {Object.entries(actionConfig).map(([key, action]) => (
                    <button
                      key={key}
                      className={`action-button ${action.className}`}
                      type="button"
                      disabled={!actionAvailability[key]}
                      onClick={() => updateAgreementStatus(action.nextStatus)}
                    >
                      <span>{action.label}</span>
                      <small>{action.helper}</small>
                    </button>
                  ))}
                  <button
                    className="action-button action-reset"
                    type="button"
                    onClick={resetDemo}
                  >
                    <span>Reset Demo</span>
                    <small>Restore the original classroom sample agreements.</small>
                  </button>
                </div>

                <div className="note-box">
                  <strong>Demo explanation</strong>
                  <p className="support-text">
                    In this concept, the renter sends the deposit into escrow
                    first. The landlord receives funds only after the agreed
                    outcome, while refund remains possible when the rental fails
                    or conditions are not met.
                  </p>
                </div>
                <div className="note-box">
                  <strong>Button logic</strong>
                  <p className="support-text">
                    Fund works from Draft or Awaiting Deposit. Release works
                    only after funding. Refund works for awaiting, funded, or
                    disputed agreements.
                  </p>
                </div>
              </>
            ) : (
              <p className="empty-state">
                Select an agreement to display the demo controls.
              </p>
            )}

            <div className="note-box">
              <strong>Presentation snapshot</strong>
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
        onClose={() => setQuickViewAgreement(null)}
      />
    </main>
  );
}
