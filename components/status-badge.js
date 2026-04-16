const statusClassNames = {
  Draft: "status-draft",
  "Awaiting Deposit": "status-awaiting-deposit",
  Funded: "status-funded",
  Completed: "status-completed",
  Refunded: "status-refunded",
  Disputed: "status-disputed"
};

export function StatusBadge({ status }) {
  const statusClassName = statusClassNames[status] || "status-draft";

  return <span className={`status-badge ${statusClassName}`}>{status}</span>;
}
