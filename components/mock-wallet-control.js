"use client";

import { useEffect, useState } from "react";

const storageKey = "blocklease-wallet-connected";
const walletAddress = "0x71...2A9F";

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
    address: walletAddress,
    connected,
    ready,
    toggleWallet
  };
}

export function MockWalletControl({
  compact = false,
  address: addressProp,
  connected: connectedProp,
  ready: readyProp,
  onToggle
}) {
  const wallet = useMockWallet();
  const address = addressProp ?? wallet.address;
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
      <span>{ready ? (connected ? address : "Connect Wallet") : "Loading Wallet"}</span>
    </button>
  );
}
