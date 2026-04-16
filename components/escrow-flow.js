export function EscrowFlow() {
  return (
    <section className="card glass-card">
      <div className="section-heading">
        <h2>Simple Escrow Flow</h2>
        <p>
          The core idea is that the deposit sits in escrow between both sides
          until there is a clear outcome.
        </p>
      </div>
      <div className="flow-diagram">
        <div className="flow-card">
          <strong>Deposit funding</strong>
          <div className="flow-track">
            <div className="flow-node">Renter</div>
            <div className="flow-arrow">→</div>
            <div className="flow-node">Escrow</div>
            <div className="flow-arrow">→</div>
            <div className="flow-node">Landlord</div>
          </div>
        </div>
        <div className="flow-card">
          <strong>Refund path</strong>
          <div className="flow-track">
            <div className="flow-node">Renter</div>
            <div className="flow-arrow">→</div>
            <div className="flow-node">Escrow</div>
            <div className="flow-arrow">→</div>
            <div className="flow-node">Renter</div>
          </div>
        </div>
      </div>
      <p className="flow-note">
        This is a mock visualization only, with no live blockchain connection.
      </p>
    </section>
  );
}
