import Link from "next/link";
import Image from "next/image";
import { PageHeader } from "@/components/PageHeader";
import { business } from "@/lib/nav";

export const metadata = { title: "Catering & Events" };

export default function CateringPage() {
  return (
    <>
      <PageHeader
        kicker="Catering & Events"
        title={
          <>
            We Handle the Food.
            <br />
            You Enjoy the Moment.
          </>
        }
        description="Holiday packages, platters, hot entrées and custom menus for any occasion — large or small."
        bgWord="CATERING"
      />
      <section className="section section-light">
        <div className="two-col" style={{ marginBottom: "2.2rem" }}>
          <Image
            src="https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=80&fit=crop"
            alt="Catering spread"
            width={800}
            height={600}
            sizes="(max-width: 900px) 100vw, 50vw"
            style={{
              width: "100%",
              maxWidth: "100%",
              borderRadius: 6,
              aspectRatio: "4/3",
              objectFit: "cover",
              display: "block",
            }}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            <div id="holiday" className="exc">
              <div className="ext">Holiday Dinners</div>
              <p className="exd">
                Fully cooked Thanksgiving, Christmas and Easter meals — ready to
                heat and serve. Order early for major holidays.
              </p>
            </div>
            <div id="platters" className="exc">
              <div className="ext">Party Platters &amp; Events</div>
              <p className="exd">
                Cold platters, hot entrées, sandwich trays, charcuterie boards
                and custom menus for any gathering.
              </p>
            </div>
            <div id="fundraising" className="exc">
              <div className="ext">Fundraising Programs</div>
              <p className="exd">
                We partner with area schools and nonprofits — pies, poinsettias,
                wreaths and more throughout the year.
              </p>
            </div>
          </div>
        </div>
        <div id="quote" className="btn-row" style={{ marginBottom: ".85rem" }}>
          <a
            href={business.toastOrderUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-green"
          >
            Order Catering via Toast
          </a>
          <Link href="/inquire" className="btn btn-outline-dark">
            Request a Custom Quote
          </Link>
        </div>
        <p style={{ fontSize: "0.73rem", color: "var(--walnut)", opacity: 0.65 }}>
          We recommend ordering 1–2 weeks in advance. Call {business.phone} for
          custom requests.
        </p>
      </section>
    </>
  );
}
