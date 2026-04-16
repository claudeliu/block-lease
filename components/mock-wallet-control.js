"use client";

import { useEffect, useState } from "react";

const storageKey = "blocklease-wallet-connected";

export function useMockWallet() {
  const [connected, setConnected] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const storedValue = window.localStorage.getItem(storageKey);
    setConnected(storedValue === "true");
    setReady(true);
  }, []);

  function toggleWallet() {
    setConnected((current) => {
      const next = !current;
      window.localStorage.setItem(storageKey, String(next));
      return next;
    });
  }

  return {
    connected,
    ready,
    toggleWallet
  };
}

export function MockWalletControl({
  compact = false,
  connected: connectedProp,
  ready: readyProp,
  onToggle
}) {
  const wallet = useMockWallet();
  const connected = connectedProp ?? wallet.connected;
  const ready = readyProp ?? wallet.ready;
  const toggleWallet = onToggle ?? wallet.toggleWallet;

  return (
    <button
      className={`wallet-button ${connected ? "wallet-connected" : "wallet-disconnected"} ${
        compact ? "wallet-compact" : ""
      }`}
      type="button"
      onClick={toggleWallet}
      aria-pressed={connected}
    >
      <span className="wallet-dot" />
      <span>{ready ? (connected ? "Wallet Connected" : "Connect Wallet") : "Loading Wallet"}</span>
    </button>
  );
}
