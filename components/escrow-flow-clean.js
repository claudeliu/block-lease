export function EscrowFlowClean() {
  return (
    <section className="card glass-card">
      <div className="section-heading">
        <h2>How Escrow Works</h2>
        <p>
          Block Lease holds the deposit until the next step is clear: release to
          the landlord or refund to the renter.
        </p>
      </div>
      <div className="flow-diagram">
        <div className="flow-card">
          <strong>Deposit path</strong>
          <div className="flow-track">
            <div className="flow-node">Renter</div>
            <div className="flow-arrow">-&gt;</div>
            <div className="flow-node">Escrow</div>
            <div className="flow-arrow">-&gt;</div>
            <div className="flow-node">Landlord</div>
          </div>
        </div>
        <div className="flow-card">
          <strong>Refund path</strong>
          <div className="flow-track">
            <div className="flow-node">Renter</div>
            <div className="flow-arrow">-&gt;</div>
            <div className="flow-node">Escrow</div>
            <div className="flow-arrow">-&gt;</div>
            <div className="flow-node">Renter</div>
          </div>
        </div>
      </div>
      <p className="flow-note">
        A simple escrow path for move-ins, subleases, and lease handoffs.
      </p>
    </section>
  );
}
