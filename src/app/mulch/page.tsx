import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { TwoColWithImage } from "@/components/TwoColWithImage";
import { GardenFeatureList } from "@/components/GardenFeature";
import { business } from "@/lib/nav";

export const metadata = { title: "Mulch Delivery & Bulk Supplies" };

export default function MulchPage() {
  return (
    <>
      <PageHeader
        kicker="Bulk Supplies"
        title="Mulch Delivery"
        description="Premium mulch, topsoil, and landscape materials — available for pickup or delivery throughout the area."
        bgWord="MULCH"
      />
      <section id="overview" className="section section-light">
        <TwoColWithImage
          imagePosition="right"
          image={{
            src: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=900&q=80&fit=crop",
            alt: "Garden supplies",
          }}
        >
          <div>
            <span className="kicker">What We Offer</span>
            <h3 className="sh3">Quality Materials, Delivered</h3>
            <p className="slead" style={{ maxWidth: "100%", marginBottom: "1.5rem" }}>
              Whether you need a few bags or a full truckload, Country Gardens
              has the mulch, topsoil, and supplies your project needs.
            </p>
            <GardenFeatureList
              features={[
                {
                  code: "MLH",
                  id: "mulch",
                  title: "Premium Mulch",
                  description:
                    "Shredded hardwood, black, brown and red mulch — by the bag or bulk delivery.",
                },
                {
                  code: "TSL",
                  id: "topsoil",
                  title: "Topsoil & Garden Mix",
                  description:
                    "Quality topsoil and enriched garden mixes for planting and lawn care.",
                },
                {
                  code: "GRV",
                  id: "gravel",
                  title: "Gravel & Stone",
                  description:
                    "Decorative stone, pea gravel and landscape rock available seasonally.",
                },
                {
                  code: "FRW",
                  id: "firewood",
                  title: "Firewood & Propane",
                  description:
                    "Seasoned firewood and propane available in-store year-round.",
                },
              ]}
            />
            <div style={{ marginTop: "1.8rem" }} className="btn-row">
              <Link href="/inquire" className="btn btn-green">
                Request a Delivery Quote
              </Link>
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
