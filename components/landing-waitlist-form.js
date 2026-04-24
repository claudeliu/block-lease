"use client";

import { useState } from "react";

const initialForm = {
  email: "",
  role: "",
  schoolOrCity: ""
};

const initialErrors = {
  email: "",
  role: ""
};

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function LandingWaitlistForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState(initialErrors);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value
    }));

    setErrors((current) => ({
      ...current,
      [name]: ""
    }));
    setServerError("");
  }

  function validateForm() {
    const nextErrors = { ...initialErrors };

    if (!form.email.trim()) {
      nextErrors.email = "Enter your email address.";
    } else if (!isValidEmail(form.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!form.role) {
      nextErrors.role = "Choose whether you are a renter or landlord.";
    }

    return nextErrors;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = validateForm();
    const hasErrors = Object.values(nextErrors).some(Boolean);

    if (hasErrors) {
      setErrors(nextErrors);
      return;
    }

    setSubmitting(true);
    setServerError("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: form.email.trim(),
          role: form.role,
          schoolOrCity: form.schoolOrCity.trim()
        })
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || "Something went wrong.");
      }

      setSubmittedEmail(form.email.trim());
      setForm(initialForm);
      setErrors(initialErrors);
    } catch (error) {
      setServerError(error.message || "Unable to submit right now.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submittedEmail) {
    return (
      <div className="waitlist-success" role="status">
        <div className="waitlist-form-copy">
          <h3>You're on the list.</h3>
          <p>
            We captured <strong>{submittedEmail}</strong>. Thanks for helping
            validate interest in Block Lease.
          </p>
        </div>
        <button
          className="secondary-button"
          type="button"
          onClick={() => setSubmittedEmail("")}
        >
          Submit another response
        </button>
      </div>
    );
  }

  return (
    <form className="waitlist-form" onSubmit={handleSubmit} noValidate>
      <div className="waitlist-form-copy">
        <h3>Get early access updates</h3>
        <p>
          Join the waitlist to show interest in a safer deposit flow for
          student rentals and remote move-ins.
        </p>
      </div>

      <div className="form-grid">
        <label className={`field field-wide ${errors.email ? "field-invalid" : ""}`}>
          <span>Email</span>
          <input
            autoComplete="email"
            name="email"
            placeholder="you@school.edu"
            required
            type="email"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email ? <span className="field-error">{errors.email}</span> : null}
        </label>

        <label className={`field ${errors.role ? "field-invalid" : ""}`}>
          <span>Role</span>
          <select name="role" required value={form.role} onChange={handleChange}>
            <option value="">Select one</option>
            <option value="renter">Renter</option>
            <option value="landlord">Landlord</option>
          </select>
          {errors.role ? <span className="field-error">{errors.role}</span> : null}
        </label>

        <label className="field">
          <span>School or city</span>
          <input
            name="schoolOrCity"
            placeholder="Boston University or Boston"
            type="text"
            value={form.schoolOrCity}
            onChange={handleChange}
          />
        </label>
      </div>

      {serverError ? <p className="field-error">{serverError}</p> : null}

      <div className="form-actions">
        <button className="primary-button" disabled={submitting} type="submit">
          {submitting ? "Submitting..." : "Join the Waitlist"}
        </button>
      </div>

      <p className="waitlist-note">
        Submissions are stored locally in this project for the assignment demo
        and can be swapped to Formspree or another form backend later.
      </p>
    </form>
  );
}
