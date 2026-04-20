export function EscrowFlowClean() {
  return (
    <section className="card glass-card">
      <div className="section-heading">
        <h2>How Escrow Works</h2>
        <p>
          The renter funds the deposit, Block Lease holds it during the
          agreement, and the outcome is resolved when the final condition is
          clear.
        </p>
      </div>
      <div className="lifecycle-flow">
        <div className="lifecycle-steps">
          <article className="lifecycle-step-card">
            <span className="lifecycle-step-number">1</span>
            <strong>Fund into escrow</strong>
            <p>
              The renter sends the deposit into Block Lease instead of sending
              it directly to the other side.
            </p>
            <div className="lifecycle-mini-track">
              <span className="flow-node">Renter</span>
              <span className="lifecycle-inline-arrow">-&gt;</span>
              <span className="flow-node flow-node-accent">Block Lease Escrow</span>
            </div>
          </article>

          <div className="lifecycle-arrow" aria-hidden="true">
            -&gt;
          </div>

          <article className="lifecycle-step-card lifecycle-step-highlight">
            <span className="lifecycle-step-number">2</span>
            <strong>Held during the agreement</strong>
            <p>
              The deposit stays in escrow while move-in, handoff, and agreement
              terms are being confirmed.
            </p>
            <div className="lifecycle-hold-pill">Deposit secured in escrow</div>
          </article>

          <div className="lifecycle-arrow" aria-hidden="true">
            -&gt;
          </div>

          <article className="lifecycle-step-card">
            <span className="lifecycle-step-number">3</span>
            <strong>Resolved at the end</strong>
            <p>
              Once the outcome is clear, the escrow is resolved according to the
              agreement or review outcome.
            </p>
            <div className="lifecycle-outcomes">
              <div className="lifecycle-outcome">Refund to renter</div>
              <div className="lifecycle-outcome">Release to landlord / sublessor</div>
              <div className="lifecycle-outcome">Split after review</div>
            </div>
          </article>
        </div>
      </div>
      <p className="flow-note">
        Escrow is the holding layer first. Release, refund, or split only
        happens after the agreement outcome is clear.
      </p>
    </section>
  );
}
