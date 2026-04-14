"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: wire to real mailing list service once chosen (Mailchimp, Buttondown, etc).
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div
        style={{
          marginTop: "0.7rem",
          fontSize: "0.88rem",
          color: "var(--moss)",
        }}
      >
        You&rsquo;re on the list — welcome!
      </div>
    );
  }

  return (
    <form className="footer-nl-row" onSubmit={onSubmit}>
      <input
        type="email"
        className="footer-nl-input"
        placeholder="Your email address"
        aria-label="Email address"
        required
      />
      <button type="submit" className="footer-nl-btn">
        Join
      </button>
    </form>
  );
}
