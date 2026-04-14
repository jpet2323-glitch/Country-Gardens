import { PageHeader } from "@/components/PageHeader";
import { TwoColWithImage } from "@/components/TwoColWithImage";
import { GardenFeatureList } from "@/components/GardenFeature";
import { business } from "@/lib/nav";

export const metadata = { title: "Gift Cards — The Perfect Gift" };

export default function GiftCardsPage() {
  return (
    <>
      <PageHeader
        kicker="Give the Gift of Fresh"
        title="Gift Cards"
        description="Country Gardens gift cards — perfect for any occasion. Redeemable in-store and online through Toast."
        bgWord="GIFTS"
      />
      <section className="section section-light">
        <TwoColWithImage
          imagePosition="right"
          image={{
            src: "https://images.unsplash.com/photo-1555244162-803834f70033?w=900&q=80&fit=crop",
            alt: "Gift giving",
          }}
        >
          <div>
            <span className="kicker">Gift Cards</span>
            <h3 className="sh3">The Perfect Gift for Any Occasion</h3>
            <p className="slead" style={{ maxWidth: "100%", marginBottom: "1.5rem" }}>
              Whether it&rsquo;s for a birthday, holiday, thank-you, or just
              because — a Country Gardens gift card is always a great choice.
              Redeemable for anything in our deli, bakery, and market.
            </p>
            <GardenFeatureList
              features={[
                {
                  code: "STR",
                  id: "in-store",
                  title: "In-Store Gift Cards",
                  description:
                    "Available at the register in any amount. Great for last-minute gifts.",
                },
                {
                  code: "ONL",
                  id: "online",
                  title: "Online via Toast",
                  description:
                    "Purchase digital gift cards through our Toast ordering platform — delivered instantly by email.",
                },
                {
                  code: "USE",
                  id: "redeem",
                  title: "How to Redeem",
                  description:
                    "Use in-store at checkout or enter the code when ordering online through Toast.",
                },
              ]}
            />
            <div className="btn-row" style={{ marginTop: "1.8rem" }}>
              <a
                href={business.toastOrderUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-green"
              >
                Buy a Gift Card Online
              </a>
              <a href={business.phoneHref} className="btn btn-outline-dark">
                {business.phone}
              </a>
            </div>
          </div>
        </TwoColWithImage>
      </section>
    </>
  );
}
