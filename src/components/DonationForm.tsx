"use client";

import { useState } from "react";
import { FORMSPREE_ENDPOINT } from "@/lib/formspree";

export function DonationForm() {
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error("Request failed");
      setSent(true);
      form.reset();
    } catch {
      setError(
        "Something went wrong — please try again or call (609) 259-1221.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <div className="inq-form-box" style={{ maxWidth: 700 }}>
        <div className="inq-success-inline">
          <div className="inq-success-check">
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h3>Request Received!</h3>
          <p>
            Thank you — we&rsquo;ll review your request and follow up within
            one week.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="inq-form-box" style={{ maxWidth: 700 }}>
      <form onSubmit={handleSubmit}>
        <input
          type="hidden"
          name="_subject"
          value="Donation Request — Country Gardens"
        />
        <input type="hidden" name="form_type" value="Donation Request" />
        <div className="inq-row">
          <div className="inq-field">
            <label className="inq-label">
              Organization Name <span className="inq-req">*</span>
            </label>
            <input
              className="inq-input"
              type="text"
              name="organization"
              required
              placeholder="Your organization name"
            />
          </div>
          <div className="inq-field">
            <label className="inq-label">
              Contact Name <span className="inq-req">*</span>
            </label>
            <input
              className="inq-input"
              type="text"
              name="contact_name"
              required
              placeholder="Your full name"
            />
          </div>
        </div>
        <div className="inq-row">
          <div className="inq-field">
            <label className="inq-label">
              Email <span className="inq-req">*</span>
            </label>
            <input
              className="inq-input"
              type="email"
              name="email"
              required
              placeholder="your@email.com"
            />
          </div>
          <div className="inq-field">
            <label className="inq-label">Phone</label>
            <input
              className="inq-input"
              type="tel"
              name="phone"
              placeholder="(609) 555-1234"
            />
          </div>
        </div>
        <div className="inq-field">
          <label className="inq-label">
            Type of Organization <span className="inq-req">*</span>
          </label>
          <select className="inq-select" name="org_type" required defaultValue="">
            <option value="">— Select —</option>
            <option>School / PTA</option>
            <option>Nonprofit Organization</option>
            <option>Sports Team / League</option>
            <option>Religious Organization</option>
            <option>Community Group</option>
            <option>Other</option>
          </select>
        </div>
        <div className="inq-field">
          <label className="inq-label">What Are You Requesting?</label>
          <input
            className="inq-input"
            type="text"
            name="request_type"
            placeholder="e.g. gift card, food donation, raffle item…"
          />
        </div>
        <div className="inq-field">
          <label className="inq-label">
            Event or Purpose <span className="inq-req">*</span>
          </label>
          <input
            className="inq-input"
            type="text"
            name="event_purpose"
            required
            placeholder="Describe the event or cause"
          />
        </div>
        <div className="inq-row">
          <div className="inq-field">
            <label className="inq-label">Event Date</label>
            <input className="inq-input" type="date" name="event_date" />
          </div>
          <div className="inq-field">
            <label className="inq-label">Date Needed By</label>
            <input className="inq-input" type="date" name="needed_by" />
          </div>
        </div>
        <div className="inq-field">
          <label className="inq-label">Additional Information</label>
          <textarea
            className="inq-textarea"
            name="additional_info"
            placeholder="Any other details that would help us understand your request…"
          />
        </div>
        <p className="inq-disclaimer">
          We review all requests and respond within one week. Submitting a
          request does not guarantee a donation.
        </p>
        {error ? <p className="inq-error">{error}</p> : null}
        <button type="submit" className="btn btn-green" disabled={submitting}>
          {submitting ? "Sending…" : "Submit Donation Request"}
        </button>
      </form>
    </div>
  );
}
