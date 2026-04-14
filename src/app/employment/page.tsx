import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { TwoColWithImage } from "@/components/TwoColWithImage";
import { toastImages } from "@/lib/images";

export const metadata = {
  title: "Employment — Country Gardens",
  description:
    "Country Gardens Farm Market & Deli is hiring in Robbinsville, NJ. Current openings include deli positions and a farm market manager. Full and part time available.",
};

/**
 * Current openings. Sourced verbatim from the Country Gardens employment page.
 * Update this array when the hiring manager fills a role or posts a new one.
 */
const openings = [
  {
    id: "deli",
    title: "Deli Positions",
    schedule: "Full Time & Part Time",
    tagline: "Hands-on, behind-the-counter roles in our Country Deli.",
    requirements: [
      "Experienced meat slicer",
      "Sandwich making",
      "Comfort working in a fast-paced kitchen and counter environment",
    ],
  },
  {
    id: "market-manager",
    title: "Farm Market Manager",
    schedule: "Full Time & Part Time",
    tagline:
      "Day-to-day leadership of the market floor \u2014 ordering, merchandising, team.",
    requirements: [
      "Experienced in sales",
      "Inventory management",
      "Comfort leading a small team through a busy season",
    ],
  },
] as const;

const DOMINIC_PHONE = "(609) 915-8400";
const DOMINIC_PHONE_HREF = "tel:6099158400";

export default function EmploymentPage() {
  return (
    <>
      <PageHeader
        kicker="Join Our Team"
        title="We're Hiring"
        description="Country Gardens has been family-owned and operated in Robbinsville since 1986. We're looking for friendly, hardworking people to join the team across our deli and farm market."
        bgWord="CAREERS"
      />

      {/* INTRO */}
      <section className="section section-light">
        <TwoColWithImage
          imagePosition="right"
          image={{
            src: toastImages.heroStorefront,
            alt: "Country Gardens Farm Market & Deli storefront, Robbinsville NJ",
            aspect: "4/3",
          }}
        >
          <div>
            <span className="kicker">Why Country Gardens</span>
            <h3 className="sh3">Real work, real food, real community.</h3>
            <p className="slead" style={{ maxWidth: "100%", marginBottom: "1rem" }}>
              We&rsquo;re a small, family-run operation &mdash; the same family
              that&rsquo;s been running it since 1986. That means you work
              alongside the owners, decisions move quickly, and good work gets
              noticed.
            </p>
            <p className="slead" style={{ maxWidth: "100%" }}>
              Whether you&rsquo;re slicing a fresh hoagie at the deli counter or
              keeping the market floor stocked for a Saturday-morning rush,
              you&rsquo;re part of a team that cares about doing things the right
              way. Full and part-time positions are available below.
            </p>
          </div>
        </TwoColWithImage>
      </section>

      {/* CURRENT OPENINGS */}
      <section id="openings" className="section section-parchment">
        <div style={{ marginBottom: "2rem" }}>
          <span className="kicker">Current Openings</span>
          <h3 className="sh3" style={{ marginBottom: "0.4rem" }}>
            Open Positions
          </h3>
          <p className="slead" style={{ maxWidth: "60ch" }}>
            Roles we&rsquo;re actively hiring for right now. Reach out directly
            for details, schedules, and to set up a conversation.
          </p>
        </div>

        <div className="job-grid">
          {openings.map((role) => (
            <article key={role.id} className="job-card">
              <span className="kicker">{role.schedule}</span>
              <h4 className="job-card-title">{role.title}</h4>
              <p className="job-card-tagline">{role.tagline}</p>
              <ul className="job-card-list">
                {role.requirements.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
              <a href={DOMINIC_PHONE_HREF} className="job-card-cta">
                Call Dominic: {DOMINIC_PHONE} &rarr;
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* HOW TO APPLY */}
      <section className="section section-dark">
        <div style={{ textAlign: "center", maxWidth: "60ch", margin: "0 auto" }}>
          <span className="kicker" style={{ color: "var(--cream)" }}>
            How to Apply
          </span>
          <h3 className="sh3" style={{ color: "#fff", marginBottom: "0.75rem" }}>
            Ready to join us?
          </h3>
          <p
            className="slead"
            style={{
              color: "rgba(255,255,255,0.85)",
              marginBottom: "1.75rem",
            }}
          >
            The fastest way to get started is a phone call. Dominic handles
            hiring directly &mdash; give him a ring, tell him which role
            you&rsquo;re interested in, and he&rsquo;ll take it from there. If
            you&rsquo;d rather send your info in writing, our inquiry form works
            too.
          </p>
          <div className="btn-row" style={{ justifyContent: "center" }}>
            <a href={DOMINIC_PHONE_HREF} className="btn btn-green">
              Call {DOMINIC_PHONE}
            </a>
            <Link href="/inquire?type=other" className="btn btn-outline-light">
              Send Your Info
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
