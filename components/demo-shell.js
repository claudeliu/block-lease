"use client";

import { useMemo, useState } from "react";
import { AgreementDashboard } from "@/components/agreement-dashboard";
import { AgreementDetailModal } from "@/components/agreement-detail-modal";
import { CreateAgreementForm } from "@/components/create-agreement-form";
import { EscrowFlow } from "@/components/escrow-flow";
import { LandingHero } from "@/components/landing-hero";
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

function countByStatus(agreements, targetStatus) {
  return agreements.filter((agreement) => agreement.status === targetStatus).length;
}

export function DemoShell() {
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

  return (
    <main className="page-shell">
      <header className="topbar">
        <div className="brand-block">
          <div className="brand-mark">BL</div>
          <div className="brand-copy">
            <strong>Block Lease</strong>
            <p>Blockchain rental deposit escrow demo</p>
          </div>
        </div>
        <div className="topbar-status">Mock wallet connected | Demo mode</div>
      </header>

      <LandingHero />

      <section className="section-grid">
        <div className="section-stack">
          <CreateAgreementForm
            form={form}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
          <EscrowFlow />
        </div>

        <div className="section-stack">
          <AgreementDashboard
            agreements={agreements}
            onSelect={setSelectedAgreementId}
            onQuickView={setQuickViewAgreement}
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
                </div>

                <div className="action-column">
                  <button
                    className="action-button action-fund"
                    type="button"
                    onClick={() => updateAgreementStatus("Funded")}
                  >
                    Fund Deposit
                  </button>
                  <button
                    className="action-button action-release"
                    type="button"
                    onClick={() => updateAgreementStatus("Completed")}
                  >
                    Release Deposit
                  </button>
                  <button
                    className="action-button action-refund"
                    type="button"
                    onClick={() => updateAgreementStatus("Refunded")}
                  >
                    Refund Deposit
                  </button>
                  <button
                    className="action-button action-reset"
                    type="button"
                    onClick={resetDemo}
                  >
                    Reset Demo
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

      <AgreementDetailModal
        agreement={quickViewAgreement}
        onClose={() => setQuickViewAgreement(null)}
      />
    </main>
  );
}
