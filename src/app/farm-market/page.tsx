import { PageHeader } from "@/components/PageHeader";
import { TwoColWithImage } from "@/components/TwoColWithImage";
import { GardenFeatureList } from "@/components/GardenFeature";

export const metadata = { title: "Farm Market — Jersey Fresh Produce" };

export default function FarmMarketPage() {
  return (
    <>
      <PageHeader
        kicker="Jersey Fresh"
        title="Market + Deli"
        description="Locally sourced produce, dairy, breads, and specialty goods — fresh every day from nearby farms."
        bgWord="MARKET"
      />
      <section id="overview" className="section section-light">
        <TwoColWithImage
          imagePosition="right"
          image={{
            src: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=900&q=80&fit=crop",
            alt: "Fresh farm produce",
          }}
        >
          <div>
            <span className="kicker">What We Carry</span>
            <h3 className="sh3">Fresh, Local &amp; In Season</h3>
            <p className="slead" style={{ maxWidth: "100%", marginBottom: "1.5rem" }}>
              Our farm market is stocked daily with the best of what&rsquo;s growing
              nearby. We work with local and regional farms to bring you produce
              that&rsquo;s picked fresh, not shipped from across the country.
            </p>
            <GardenFeatureList
              features={[
                {
                  code: "PRD",
                  id: "produce",
                  title: "Jersey Fresh Produce",
                  description:
                    "Seasonal fruits and vegetables sourced from nearby New Jersey farms.",
                },
                {
                  code: "DRY",
                  id: "dairy",
                  title: "Local Dairy & Eggs",
                  description:
                    "Fresh milk, butter, cheese, and eggs from local producers.",
                },
                {
                  code: "BRD",
                  id: "bread",
                  title: "Fresh Breads & Specialty Items",
                  description:
                    "Artisan breads, jams, honey, and curated specialty grocery items.",
                },
                {
                  code: "SES",
                  id: "seasonal",
                  title: "Seasonal & Holiday Items",
                  description:
                    "Pumpkins, gourds, fall decor, holiday gifts and so much more throughout the year.",
                },
              ]}
            />
          </div>
        </TwoColWithImage>
      </section>
    </>
  );
}
