import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { TwoColWithImage } from "@/components/TwoColWithImage";
import { GardenFeatureList } from "@/components/GardenFeature";

export const metadata = { title: "Landscaping & Hardscaping" };

export default function LandscapePage() {
  return (
    <>
      <PageHeader
        kicker="Outdoor Living"
        title="Landscaping & Hardscaping"
        description="Professional landscape design, installation, hardscaping, and maintenance — transforming your outdoor space into something beautiful."
        bgWord="LANDSCAPE"
      />
      <section className="section section-light">
        <div style={{ marginBottom: "2.5rem" }}>
          <TwoColWithImage
            imagePosition="left"
            image={{
              src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80&fit=crop",
              alt: "Landscaping services",
            }}
          >
            <div>
              <span className="kicker">Our Services</span>
              <h3 className="sh3">From Design to Installation</h3>
              <GardenFeatureList
                features={[
                  {
                    code: "DSN",
                    id: "design",
                    title: "Landscape Design",
                    description:
                      "Custom design plans tailored to your property, vision, and budget.",
                  },
                  {
                    code: "INS",
                    id: "install",
                    title: "Planting & Installation",
                    description:
                      "Trees, shrubs, perennials, annuals, and full garden bed installations.",
                  },
                  {
                    code: "PAT",
                    id: "hardscape",
                    title: "Patios & Hardscaping",
                    description:
                      "Natural stone, pavers, retaining walls, walkways and outdoor living spaces.",
                  },
                  {
                    code: "MNT",
                    id: "maintenance",
                    title: "Lawn & Garden Maintenance",
                    description:
                      "Seasonal cleanups, mulching, pruning, and ongoing maintenance programs.",
                  },
                  {
                    code: "SUP",
                    id: "supplies",
                    title: "Bulk Supplies",
                    description:
                      "Mulch, topsoil, gravel and stone available for delivery or pickup.",
                  },
                ]}
              />
            </div>
          </TwoColWithImage>
        </div>
        <div id="quote" className="info-card">
          <h3>Ready to Transform Your Outdoor Space?</h3>
          <p>
            Tell us about your project and we&rsquo;ll get back to you within
            one business day to discuss your vision.
          </p>
          <div className="btn-row">
            <Link href="/inquire" className="btn btn-green">
              Request a Landscape Quote
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
