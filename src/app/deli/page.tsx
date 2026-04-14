import Image from "next/image";
import { PageHeader } from "@/components/PageHeader";
import { business } from "@/lib/nav";
import { toastImages } from "@/lib/images";

export const metadata = { title: "Country Deli — Boar's Head Made to Order" };

/**
 * Deli page.
 *
 * Intentionally does NOT list specific menu items — the live menu lives on
 * Toast and rotates with the seasons. The page sells the experience and
 * then hands the user off to Toast for ordering.
 */
export default function DeliPage() {
  return (
    <>
      <PageHeader
        kicker="Made to Order"
        title="Country Deli"
        description="Fresh, local & delicious — every day."
        bgWord="DELI"
      />

      <section className="section section-light">
        <div className="two-col" style={{ marginBottom: "2rem" }}>
          <Image
            src={toastImages.sandwich}
            alt="Boar's Head sandwich from the Country Deli"
            width={900}
            height={675}
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
            <div>
              <span className="kicker">The Country Deli</span>
              <h3 className="sh3">Fresh, Local &amp; Delicious &mdash; Every Day!</h3>
              <p className="slead" style={{ maxWidth: "100%" }}>
                Stop by our Country Deli for made-to-order sandwiches featuring
                Boar&rsquo;s Head, premium lunch meats, and hearty house-made
                soups. Pair your meal with fresh-baked muffins, donuts, loaf
                cakes, and more &mdash; all perfect with a cup from our coffee
                bar.
              </p>
            </div>

            <div className="exc">
              <div className="ext">What we&rsquo;re known for</div>
              <p className="exd">
                Boar&rsquo;s Head deli meats and cheeses sliced to order,
                house-made soups rotating daily, fresh-baked breads and
                pastries, organic coffee, and a deep lineup of local dairy and
                Jersey-fresh grocery picks.
              </p>
            </div>
          </div>
        </div>

        <div id="order" className="btn-row" style={{ marginBottom: "0.85rem" }}>
          <a
            href={business.toastOrderUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-green"
          >
            View Full Menu &amp; Order via Toast ↗
          </a>
          <a href={business.phoneHref} className="btn btn-outline-dark">
            Call {business.phone}
          </a>
        </div>
        <p style={{ fontSize: "0.73rem", color: "var(--walnut)", opacity: 0.65 }}>
          Menu rotates with the seasons &mdash; Toast always has the live list.
          Pickup at {business.address}.
        </p>
      </section>
    </>
  );
}
