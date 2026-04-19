"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function useToastQueue() {
  const [toasts, setToasts] = useState([]);
  const timersRef = useRef(new Map());

  const dismissToast = useCallback((id) => {
    const timeoutId = timersRef.current.get(id);

    if (timeoutId) {
      window.clearTimeout(timeoutId);
      timersRef.current.delete(id);
    }

    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const pushToast = useCallback(
    (message) => {
      const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;

      setToasts((current) => [...current, { id, message }]);

      const timeoutId = window.setTimeout(() => {
        dismissToast(id);
      }, 2600);

      timersRef.current.set(id, timeoutId);
    },
    [dismissToast]
  );

  useEffect(() => {
    return () => {
      timersRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
      timersRef.current.clear();
    };
  }, []);

  return {
    toasts,
    pushToast,
    dismissToast
  };
}

export function ToastViewport({ toasts, onDismiss }) {
  if (!toasts.length) {
    return null;
  }

  return (
    <div className="toast-viewport" aria-live="polite" aria-atomic="true">
      {toasts.map((toast) => (
        <div className="toast-card" key={toast.id}>
          <span className="toast-indicator" />
          <span>{toast.message}</span>
          <button
            className="toast-close"
            type="button"
            onClick={() => onDismiss(toast.id)}
            aria-label="Dismiss notification"
          >
            X
          </button>
        </div>
      ))}
    </div>
  );
}
