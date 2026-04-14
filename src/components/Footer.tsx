import Image from "next/image";
import Link from "next/link";
import { business, footerLinks } from "@/lib/nav";
import { NewsletterForm } from "./NewsletterForm";

export function Footer() {
  return (
    <footer className="footer-wrap">
      <div className="footer-grid">
        <div>
          <div className="footer-heading">Stay Fresh</div>
          <p className="footer-body">
            Join our community to stay updated on seasonal arrivals, bakery
            specials, upcoming events, and workshops.
          </p>
          <NewsletterForm />
        </div>

        <div>
          <div className="footer-section-label">Explore</div>
          <ul className="footer-links">
            {footerLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ textAlign: "right" }}>
          <Image
            src="/images/logo.png"
            alt="Country Gardens"
            width={150}
            height={65}
            style={{ height: 65, width: "auto", borderRadius: 3, marginLeft: "auto" }}
          />
          <p
            style={{
              fontSize: "0.62rem",
              letterSpacing: 1,
              opacity: 0.38,
              color: "var(--cream)",
              marginTop: "0.8rem",
            }}
          >
            ESTABLISHED {business.established} · ROBBINSVILLE, NJ
          </p>
          <p
            style={{
              fontSize: "0.7rem",
              color: "var(--cream)",
              opacity: 0.38,
              marginTop: "0.3rem",
            }}
          >
            {business.address}
            <br />
            {business.phone}
          </p>
          <div className="footer-social">
            <a href={business.instagramUrl} target="_blank" rel="noreferrer">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ flexShrink: 0 }}
                aria-hidden
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
              Instagram
            </a>
            <a href={business.facebookUrl} target="_blank" rel="noreferrer">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                style={{ flexShrink: 0 }}
                aria-hidden
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
              Facebook
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} {business.name}. All Rights Reserved.
        </span>
        <span>Hand-crafted in Mercer County, NJ</span>
      </div>
    </footer>
  );
}
