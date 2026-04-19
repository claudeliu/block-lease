"use client";

import { EscrowFlowClean } from "@/components/escrow-flow-clean";
import { FeatureCards } from "@/components/feature-cards";
import { LandingHero } from "@/components/landing-hero";
import { MockWalletControl, useMockWallet } from "@/components/mock-wallet-control";
import { ScenarioCards } from "@/components/scenario-cards";
import { ToastViewport, useToastQueue } from "@/components/toast-viewport";

export function LandingShell() {
  const { address, connected, ready, toggleWallet } = useMockWallet();
  const { dismissToast, pushToast, toasts } = useToastQueue();

  function handleWalletToggle() {
    toggleWallet();
    pushToast(connected ? "Wallet disconnected" : "Wallet connected");
  }

  return (
    <main className="page-shell landing-shell">
      <header className="topbar">
        <div className="brand-block">
          <div className="brand-mark">BL</div>
          <div className="brand-copy">
            <strong>Block Lease</strong>
            <p>Rental deposit escrow for student housing, subleases, and cross-border move-ins</p>
          </div>
        </div>
        <MockWalletControl
          address={address}
          connected={connected}
          ready={ready}
          onToggle={handleWalletToggle}
        />
      </header>

      <LandingHero />

      <FeatureCards />
      <ScenarioCards />
      <EscrowFlowClean />
      <ToastViewport toasts={toasts} onDismiss={dismissToast} />
    </main>
  );
}
