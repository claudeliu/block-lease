export function CreateAgreementForm({ errors, form, onChange, onSubmit }) {
  return (
    <section className="card glass-card" id="create-agreement">
      <div className="section-heading">
        <h2>Create Escrow Agreement</h2>
        <p>
          Open a deposit agreement for a sublease, lease takeover, remote
          booking, or cross-border move-in.
        </p>
      </div>
      <form onSubmit={onSubmit}>
        <div className="form-grid">
          <label className={`field ${errors.title ? "field-invalid" : ""}`}>
            <span>Agreement name</span>
            <input
              aria-invalid={Boolean(errors.title)}
              name="title"
              value={form.title}
              onChange={onChange}
              placeholder="Spring semester sublease"
            />
            {errors.title ? <small className="field-error">{errors.title}</small> : null}
          </label>
          <label className={`field ${errors.deposit ? "field-invalid" : ""}`}>
            <span>Deposit amount</span>
            <input
              aria-invalid={Boolean(errors.deposit)}
              name="deposit"
              type="number"
              min="0"
              value={form.deposit}
              onChange={onChange}
              placeholder="900"
            />
            {errors.deposit ? <small className="field-error">{errors.deposit}</small> : null}
          </label>
          <label className={`field ${errors.renter ? "field-invalid" : ""}`}>
            <span>Renter</span>
            <input
              aria-invalid={Boolean(errors.renter)}
              name="renter"
              value={form.renter}
              onChange={onChange}
              placeholder="Student renter"
            />
            {errors.renter ? <small className="field-error">{errors.renter}</small> : null}
          </label>
          <label className={`field ${errors.landlord ? "field-invalid" : ""}`}>
            <span>Landlord or sublessor</span>
            <input
              aria-invalid={Boolean(errors.landlord)}
              name="landlord"
              value={form.landlord}
              onChange={onChange}
              placeholder="Property owner or current tenant"
            />
            {errors.landlord ? <small className="field-error">{errors.landlord}</small> : null}
          </label>
          <label className={`field field-wide ${errors.property ? "field-invalid" : ""}`}>
            <span>Property</span>
            <input
              aria-invalid={Boolean(errors.property)}
              name="property"
              value={form.property}
              onChange={onChange}
              placeholder="Apartment near campus"
            />
            {errors.property ? <small className="field-error">{errors.property}</small> : null}
          </label>
          <label className="field">
            <span>Use case</span>
            <select name="scenario" value={form.scenario} onChange={onChange}>
              <option>Sublease between students</option>
              <option>Cross-border move-in</option>
              <option>Remote booking</option>
              <option>Lease takeover</option>
            </select>
          </label>
          <label className={`field field-wide ${errors.duration ? "field-invalid" : ""}`}>
            <span>Agreement period</span>
            <input
              aria-invalid={Boolean(errors.duration)}
              name="duration"
              value={form.duration}
              onChange={onChange}
              placeholder="Aug 15 - Dec 20"
            />
            {errors.duration ? <small className="field-error">{errors.duration}</small> : null}
          </label>
        </div>
        <div className="form-actions">
          <button className="primary-button" type="submit">
            Create Escrow
          </button>
          <span className="support-text">
            New agreements appear instantly in the workspace and can move
            through funding, review, release, or refund.
          </span>
        </div>
      </form>
    </section>
  );
}
