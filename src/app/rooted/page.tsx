import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { TwoColWithImage } from "@/components/TwoColWithImage";
import { GardenFeatureList } from "@/components/GardenFeature";

export const metadata = { title: "Rooted — Classes & Workshops" };

export default function RootedPage() {
  return (
    <>
      <PageHeader
        kicker="Learn & Grow"
        title="Rooted: Classes + Workshops"
        description="Hands-on classes, seasonal workshops, and community events for gardeners, families, and food lovers of all experience levels."
        bgWord="ROOTED"
      />
      <section className="section section-light">
        <div id="newsletter" className="info-card" style={{ marginBottom: "2rem" }}>
          <h3>Stay in the Loop</h3>
          <p>
            Sign up for our newsletter to be the first to hear about upcoming
            classes, workshops and seasonal events at Country Gardens.
          </p>
          <div className="btn-row">
            <Link href="/#newsletter" className="btn btn-green">
              Sign Up for Updates
            </Link>
          </div>
        </div>
        <TwoColWithImage
          imagePosition="right"
          image={{
            src: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=900&q=80&fit=crop",
            alt: "Garden workshop",
          }}
        >
          <div>
            <span className="kicker">What to Expect</span>
            <h3 className="sh3">Workshops for Every Season</h3>
            <GardenFeatureList
              features={[
                {
                  code: "GDN",
                  id: "gardening",
                  title: "Gardening Classes",
                  description:
                    "Planting, pruning, container gardening, and seasonal care for your garden.",
                },
                {
                  code: "CKG",
                  id: "cooking",
                  title: "Cooking & Food Workshops",
                  description:
                    "Farm-to-table cooking, preserving, and seasonal recipes from our kitchen.",
                },
                {
                  code: "CRF",
                  id: "crafts",
                  title: "Craft & Seasonal Workshops",
                  description:
                    "Wreath making, holiday decorating, floral arranging and more.",
                },
                {
                  code: "KDS",
                  id: "kids",
                  title: "Family & Kids Programs",
                  description:
                    "Fun, educational activities for children and families throughout the year.",
                },
              ]}
            />
          </div>
        </TwoColWithImage>
        <div style={{ marginTop: "2rem" }}>
          <Link href="/inquire" className="btn btn-green">
            Inquire About Upcoming Events
          </Link>
        </div>
      </section>
    </>
  );
}
