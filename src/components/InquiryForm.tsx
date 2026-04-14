"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FORMSPREE_ENDPOINT } from "@/lib/formspree";

type InquiryType = "landscape" | "catering" | "other";

const VALID_TYPES = new Set<InquiryType>(["landscape", "catering", "other"]);

type Step = 1 | 2 | 3;

const TYPE_LABELS: Record<InquiryType, string> = {
  landscape: "Landscape Job",
  catering: "Catering Order",
  other: "General Inquiry",
};

const FIELD_LABELS: Record<string, string> = {
  first_name: "First Name",
  last_name: "Last Name",
  email: "Email",
  phone: "Phone",
  best_contact_time: "Best Time",
  landscape_type: "Work Type",
  property_address: "Property",
  landscape_timeline: "Timeline",
  landscape_budget: "Budget",
  landscape_description: "Description",
  catering_type: "Event Type",
  event_date: "Event Date",
  guest_count: "Guests",
  pickup_delivery: "Pickup/Delivery",
  dietary_notes: "Dietary",
  catering_description: "Details",
  other_type: "Topic",
  other_subject: "Subject",
  message: "Message",
};

const SKIP_FIELDS = new Set(["_subject", "inquiry_type", "additional_notes"]);

export function InquiryForm() {
  const searchParams = useSearchParams();
  const [type, setType] = useState<InquiryType | null>(null);
  const [step, setStep] = useState<Step>(1);
  const [summary, setSummary] = useState<{ label: string; value: string }[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Pre-select the form variant when the URL has ?type=landscape|catering|other.
  // This powers the sidebar shortcuts like "Request a Landscape Quote", which
  // should land the user directly on the filled-out variant instead of the chooser.
  useEffect(() => {
    const raw = searchParams?.get("type");
    if (!raw) return;
    const candidate = raw.toLowerCase();
    if (VALID_TYPES.has(candidate as InquiryType)) {
      setType(candidate as InquiryType);
      setStep(1);
      // Scroll the form into view so the user sees step 1 immediately.
      requestAnimationFrame(() => {
        wrapRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, [searchParams]);

  const subject = useMemo(
    () =>
      type ? `New ${TYPE_LABELS[type]} — Country Gardens` : "New Inquiry — Country Gardens",
    [type],
  );

  function scrollToForm() {
    requestAnimationFrame(() => {
      wrapRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function selectType(t: InquiryType) {
    setType(t);
    setStep(1);
    setError(null);
    scrollToForm();
  }

  function goToStep(next: Step) {
    if (!formRef.current) {
      setStep(next);
      return;
    }

    // When moving to step 3 the HTML5 validation should fire on the visible fields.
    if (next === 3) {
      const form = formRef.current;
      // Only validate the currently visible inputs.
      const visible = form.querySelectorAll<HTMLElement>(".inq-panel.active [required]");
      for (const el of Array.from(visible)) {
        const input = el as HTMLInputElement;
        if (!input.checkValidity()) {
          input.reportValidity();
          return;
        }
      }

      // Build summary
      const data = new FormData(form);
      const entries: { label: string; value: string }[] = [];
      data.forEach((v, k) => {
        if (SKIP_FIELDS.has(k)) return;
        const str = typeof v === "string" ? v.trim() : "";
        if (!str) return;
        entries.push({ label: FIELD_LABELS[k] ?? k, value: str });
      });
      setSummary(entries);
    }

    setStep(next);
    scrollToForm();
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formRef.current) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: new FormData(formRef.current),
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error("Request failed");
      setSent(true);
    } catch {
      setError("Something went wrong — please try again or call (609) 259-1221.");
    } finally {
      setSubmitting(false);
    }
  }

  function reset() {
    formRef.current?.reset();
    setType(null);
    setStep(1);
    setSummary([]);
    setSent(false);
    setError(null);
  }

  return (
    <>
      {/* Type-chooser chips */}
      <div className="inq-types">
        {(
          [
            {
              t: "landscape" as const,
              icon: "LANDSCAPE",
              title: "Landscape Job",
              desc: "Design, installation, hardscaping, lawn care & maintenance",
            },
            {
              t: "catering" as const,
              icon: "CATERING",
              title: "Catering Order",
              desc: "Holiday dinners, platters, party packages & custom menus",
            },
            {
              t: "other" as const,
              icon: "INQUIRE",
              title: "Other Inquiry",
              desc: "Fundraising, general questions, or anything else",
            },
          ]
        ).map((opt) => (
          <button
            key={opt.t}
            type="button"
            className={`inq-type-btn${type === opt.t ? " selected" : ""}`}
            onClick={() => selectType(opt.t)}
          >
            <span className="inq-type-icon">{opt.icon}</span>
            <span className="inq-type-title">{opt.title}</span>
            <span className="inq-type-desc">{opt.desc}</span>
          </button>
        ))}
      </div>

      <div
        ref={wrapRef}
        className={`inq-form-wrap${type ? " open" : ""}`}
        aria-hidden={!type}
      >
        {type && !sent ? (
          <div className="inq-form-box">
            <div className="inq-steps">
              {[1, 2, 3].map((n) => {
                const cls =
                  step === n ? "inq-step active" : step > n ? "inq-step done" : "inq-step";
                return (
                  <div key={n} style={{ display: "flex", alignItems: "center" }}>
                    <div className={cls}>
                      <div className="inq-step-num">
                        <span>{n}</span>
                      </div>
                      <span>{n === 1 ? "Your Info" : n === 2 ? "Details" : "Review"}</span>
                    </div>
                    {n < 3 ? <div className="inq-step-line" /> : null}
                  </div>
                );
              })}
            </div>

            <form ref={formRef} onSubmit={handleSubmit}>
              <input type="hidden" name="_subject" value={subject} />
              <input type="hidden" name="inquiry_type" value={type} />

              {/* STEP 1 */}
              <div className={`inq-panel${step === 1 ? " active" : ""}`}>
                <div className="inq-row">
                  <div className="inq-field">
                    <label className="inq-label">
                      First Name <span className="inq-req">*</span>
                    </label>
                    <input
                      className="inq-input"
                      type="text"
                      name="first_name"
                      required
                      placeholder="Jane"
                    />
                  </div>
                  <div className="inq-field">
                    <label className="inq-label">
                      Last Name <span className="inq-req">*</span>
                    </label>
                    <input
                      className="inq-input"
                      type="text"
                      name="last_name"
                      required
                      placeholder="Smith"
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
                      placeholder="jane@email.com"
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
                  <label className="inq-label">Best Time to Reach You</label>
                  <select
                    className="inq-select"
                    name="best_contact_time"
                    defaultValue=""
                  >
                    <option value="">— Select —</option>
                    <option>Morning (8am–12pm)</option>
                    <option>Afternoon (12pm–4pm)</option>
                    <option>Evening (4pm–6pm)</option>
                    <option>Anytime</option>
                  </select>
                </div>
                <div className="inq-nav">
                  <span />
                  <button
                    type="button"
                    className="inq-next"
                    onClick={() => goToStep(2)}
                  >
                    Next — Details →
                  </button>
                </div>
              </div>

              {/* STEP 2 — Landscape */}
              {type === "landscape" ? (
                <div className={`inq-panel${step === 2 ? " active" : ""}`}>
                  <div className="inq-field">
                    <label className="inq-label">
                      Type of Work <span className="inq-req">*</span>
                    </label>
                    <div className="inq-chips">
                      {[
                        "Design & Installation",
                        "Hardscaping / Patio",
                        "Lawn Maintenance",
                        "Mulch / Topsoil",
                        "Other",
                      ].map((val, i) => (
                        <div key={val} style={{ display: "contents" }}>
                          <input
                            className="inq-chip"
                            type="radio"
                            name="landscape_type"
                            id={`ls${i + 1}`}
                            value={val}
                            required={i === 0}
                            defaultChecked={false}
                          />
                          <label htmlFor={`ls${i + 1}`}>{val}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="inq-row">
                    <div className="inq-field">
                      <label className="inq-label">Property Address</label>
                      <input
                        className="inq-input"
                        type="text"
                        name="property_address"
                        placeholder="123 Main St, Robbinsville NJ"
                      />
                    </div>
                    <div className="inq-field">
                      <label className="inq-label">Timeline</label>
                      <select
                        className="inq-select"
                        name="landscape_timeline"
                        defaultValue=""
                      >
                        <option value="">— Select —</option>
                        <option>As soon as possible</option>
                        <option>Within 1 month</option>
                        <option>1–3 months</option>
                        <option>3–6 months</option>
                        <option>Just planning ahead</option>
                      </select>
                    </div>
                  </div>
                  <div className="inq-field">
                    <label className="inq-label">Approximate Budget</label>
                    <select
                      className="inq-select"
                      name="landscape_budget"
                      defaultValue=""
                    >
                      <option value="">— Select —</option>
                      <option>Under $1,000</option>
                      <option>$1,000 – $5,000</option>
                      <option>$5,000 – $15,000</option>
                      <option>$15,000+</option>
                      <option>Not sure yet</option>
                    </select>
                  </div>
                  <div className="inq-field">
                    <label className="inq-label">Project Description</label>
                    <textarea
                      className="inq-textarea"
                      name="landscape_description"
                      placeholder="Describe what you have in mind — the more detail the better!"
                    />
                  </div>
                  <div className="inq-nav">
                    <button
                      type="button"
                      className="inq-back"
                      onClick={() => goToStep(1)}
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      className="inq-next"
                      onClick={() => goToStep(3)}
                    >
                      Review &amp; Send →
                    </button>
                  </div>
                </div>
              ) : null}

              {/* STEP 2 — Catering */}
              {type === "catering" ? (
                <div className={`inq-panel${step === 2 ? " active" : ""}`}>
                  <div className="inq-field">
                    <label className="inq-label">
                      Type of Event <span className="inq-req">*</span>
                    </label>
                    <div className="inq-chips">
                      {[
                        "Holiday Dinner",
                        "Birthday / Party",
                        "Corporate Event",
                        "Deli Platter",
                        "Other",
                      ].map((val, i) => (
                        <div key={val} style={{ display: "contents" }}>
                          <input
                            className="inq-chip"
                            type="radio"
                            name="catering_type"
                            id={`ct${i + 1}`}
                            value={val}
                            required={i === 0}
                          />
                          <label htmlFor={`ct${i + 1}`}>{val}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="inq-row">
                    <div className="inq-field">
                      <label className="inq-label">
                        Event Date <span className="inq-req">*</span>
                      </label>
                      <input
                        className="inq-input"
                        type="date"
                        name="event_date"
                        required
                      />
                    </div>
                    <div className="inq-field">
                      <label className="inq-label">
                        Number of Guests <span className="inq-req">*</span>
                      </label>
                      <select
                        className="inq-select"
                        name="guest_count"
                        required
                        defaultValue=""
                      >
                        <option value="">— Select —</option>
                        <option>Under 10</option>
                        <option>10 – 25</option>
                        <option>25 – 50</option>
                        <option>50 – 100</option>
                        <option>100+</option>
                      </select>
                    </div>
                  </div>
                  <div className="inq-field">
                    <label className="inq-label">Pickup or Delivery?</label>
                    <select
                      className="inq-select"
                      name="pickup_delivery"
                      defaultValue=""
                    >
                      <option value="">— Select —</option>
                      <option>Pickup from Country Gardens</option>
                      <option>Delivery needed</option>
                      <option>Not sure yet</option>
                    </select>
                  </div>
                  <div className="inq-field">
                    <label className="inq-label">Dietary Needs or Restrictions</label>
                    <input
                      className="inq-input"
                      type="text"
                      name="dietary_notes"
                      placeholder="e.g. vegetarian, nut allergy, gluten free…"
                    />
                  </div>
                  <div className="inq-field">
                    <label className="inq-label">Additional Details</label>
                    <textarea
                      className="inq-textarea"
                      name="catering_description"
                      placeholder="Tell us about your event — menu preferences, budget, anything special!"
                    />
                  </div>
                  <div className="inq-nav">
                    <button
                      type="button"
                      className="inq-back"
                      onClick={() => goToStep(1)}
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      className="inq-next"
                      onClick={() => goToStep(3)}
                    >
                      Review &amp; Send →
                    </button>
                  </div>
                </div>
              ) : null}

              {/* STEP 2 — Other */}
              {type === "other" ? (
                <div className={`inq-panel${step === 2 ? " active" : ""}`}>
                  <div className="inq-field">
                    <label className="inq-label">
                      What Can We Help With? <span className="inq-req">*</span>
                    </label>
                    <div className="inq-chips">
                      {[
                        "Fundraising",
                        "Employment",
                        "General Question",
                        "Something Else",
                      ].map((val, i) => (
                        <div key={val} style={{ display: "contents" }}>
                          <input
                            className="inq-chip"
                            type="radio"
                            name="other_type"
                            id={`ot${i + 1}`}
                            value={val}
                            required={i === 0}
                          />
                          <label htmlFor={`ot${i + 1}`}>{val}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="inq-field">
                    <label className="inq-label">
                      Subject <span className="inq-req">*</span>
                    </label>
                    <input
                      className="inq-input"
                      type="text"
                      name="other_subject"
                      required
                      placeholder="Brief subject line"
                    />
                  </div>
                  <div className="inq-field">
                    <label className="inq-label">
                      Your Message <span className="inq-req">*</span>
                    </label>
                    <textarea
                      className="inq-textarea"
                      name="message"
                      required
                      placeholder="How can we help you?"
                    />
                  </div>
                  <div className="inq-nav">
                    <button
                      type="button"
                      className="inq-back"
                      onClick={() => goToStep(1)}
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      className="inq-next"
                      onClick={() => goToStep(3)}
                    >
                      Review &amp; Send →
                    </button>
                  </div>
                </div>
              ) : null}

              {/* STEP 3 */}
              <div className={`inq-panel${step === 3 ? " active" : ""}`}>
                <div className="inq-summary-card">
                  <div className="inq-summary-label">Your Submission Summary</div>
                  <div className="inq-summary-body">
                    {summary.length === 0 ? (
                      <em style={{ opacity: 0.6 }}>Nothing to review yet.</em>
                    ) : (
                      summary.map((row) => (
                        <div key={row.label}>
                          <strong>{row.label}:</strong> {row.value}
                        </div>
                      ))
                    )}
                  </div>
                </div>
                <div className="inq-field">
                  <label className="inq-label">Anything else we should know?</label>
                  <textarea
                    className="inq-textarea"
                    name="additional_notes"
                    placeholder="Optional final notes"
                    style={{ minHeight: 80 }}
                  />
                </div>
                <p className="inq-disclaimer">
                  By submitting you agree to be contacted by Country Gardens.
                  We&rsquo;ll respond within one business day.
                </p>
                {error ? <p className="inq-error">{error}</p> : null}
                <div className="inq-nav">
                  <button
                    type="button"
                    className="inq-back"
                    onClick={() => goToStep(2)}
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    className="inq-next"
                    disabled={submitting}
                  >
                    {submitting ? "Sending…" : "Send My Inquiry"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        ) : null}

        {sent ? (
          <div className="inq-form-box">
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
              <h3>We&rsquo;ve received your inquiry!</h3>
              <p>
                Thank you — a member of the Country Gardens team will be in
                touch within one business day.
              </p>
              <button type="button" className="inq-reset-link" onClick={reset}>
                Submit Another Inquiry
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
