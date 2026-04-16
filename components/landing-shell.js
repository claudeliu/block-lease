"use client";

import Link from "next/link";
import { EscrowFlowClean } from "@/components/escrow-flow-clean";
import { FeatureCards } from "@/components/feature-cards";
import { LandingHero } from "@/components/landing-hero";
import { MockWalletControl, useMockWallet } from "@/components/mock-wallet-control";

export function LandingShell() {
  const { connected, ready, toggleWallet } = useMockWallet();

  return (
    <main className="page-shell landing-shell">
      <header className="topbar">
        <div className="brand-block">
          <div className="brand-mark">BL</div>
          <div className="brand-copy">
            <strong>Block Lease</strong>
            <p>Blockchain rental deposit escrow for student rentals and subleases</p>
          </div>
        </div>
        <MockWalletControl
          connected={connected}
          ready={ready}
          onToggle={toggleWallet}
        />
      </header>

      <LandingHero />

      <div className="landing-actions-bar glass-card">
        <div>
          <strong>Presentation flow</strong>
          <p className="support-text">
            Start with the concept here, then move into the demo workspace for
            agreement creation and escrow actions.
          </p>
        </div>
        <div className="hero-actions">
          <Link className="primary-button" href="/demo#create-agreement">
            Create Demo Agreement
          </Link>
          <Link className="secondary-button" href="/demo#dashboard">
            View Sample Dashboard
          </Link>
        </div>
      </div>

      <FeatureCards />
      <EscrowFlowClean />
    </main>
  );
}
