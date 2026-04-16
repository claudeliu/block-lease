export function CreateAgreementForm({ form, onChange, onSubmit }) {
  return (
    <section className="card glass-card" id="create-agreement">
      <div className="section-heading">
        <h2>Create Agreement</h2>
        <p>
          Build a mock blockchain escrow agreement for a student lease or
          sublease with no backend required.
        </p>
      </div>
      <form onSubmit={onSubmit}>
        <div className="form-grid">
          <label className="field">
            <span>Agreement title</span>
            <input
              name="title"
              value={form.title}
              onChange={onChange}
              placeholder="Spring semester sublease"
              required
            />
          </label>
          <label className="field">
            <span>Deposit amount</span>
            <input
              name="deposit"
              type="number"
              min="0"
              value={form.deposit}
              onChange={onChange}
              placeholder="900"
              required
            />
          </label>
          <label className="field">
            <span>Renter</span>
            <input
              name="renter"
              value={form.renter}
              onChange={onChange}
              placeholder="Student renter"
              required
            />
          </label>
          <label className="field">
            <span>Landlord or sublessor</span>
            <input
              name="landlord"
              value={form.landlord}
              onChange={onChange}
              placeholder="Property owner or current tenant"
              required
            />
          </label>
          <label className="field field-wide">
            <span>Property</span>
            <input
              name="property"
              value={form.property}
              onChange={onChange}
              placeholder="Apartment near campus"
              required
            />
          </label>
          <label className="field">
            <span>Rental scenario</span>
            <select name="scenario" value={form.scenario} onChange={onChange}>
              <option>Student sublease</option>
              <option>International student arrival</option>
              <option>Short-term summer rental</option>
              <option>Low-trust first-time arrangement</option>
            </select>
          </label>
          <label className="field">
            <span>Status</span>
            <select name="status" value={form.status} onChange={onChange}>
              <option>Draft</option>
              <option>Awaiting Deposit</option>
              <option>Disputed</option>
            </select>
          </label>
          <label className="field field-wide">
            <span>Agreement period</span>
            <input
              name="duration"
              value={form.duration}
              onChange={onChange}
              placeholder="Aug 15 - Dec 20"
              required
            />
          </label>
        </div>
        <div className="form-actions">
          <button className="primary-button" type="submit">
            Add Mock Agreement
          </button>
          <span className="support-text">
            New entries stay in local demo state only and can be funded,
            released, or refunded from the detail panel.
          </span>
        </div>
      </form>
    </section>
  );
}
