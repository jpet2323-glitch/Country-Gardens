import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { TwoColWithImage } from "@/components/TwoColWithImage";

export const metadata = { title: "About Us — Rooted in Robbinsville since 1986" };

const values = [
  "Family Owned",
  "Community First",
  "Fresh Daily",
  "Locally Sourced",
  "Boar's Head Deli",
  "Open Year-Round",
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        kicker="Our Story"
        title="Rooted in Robbinsville since 1986."
        description="Founded on a simple belief: your neighborhood market should feel like an extension of home."
        bgWord="ABOUT"
      />
      <section id="story" className="section section-light">
        <TwoColWithImage
          imagePosition="right"
          image={{
            src: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=900&q=80&fit=crop",
            alt: "Community market",
          }}
        >
          <div>
            <p className="slead" style={{ maxWidth: "100%" }}>
              Family owned and operated, we&rsquo;ve grown from a garden center
              into a full-service community hub — home to a gourmet deli, fresh
              bakery, seasonal farm market, catering kitchen, and landscape
              services. Through it all, the heart of what we do hasn&rsquo;t
              changed.
            </p>
            <div id="values" className="vals-grid">
              {values.map((v) => (
                <div key={v} className="vc">
                  {v}
                </div>
              ))}
            </div>
            <div style={{ marginTop: "1.8rem" }}>
              <Link href="/visit" className="btn btn-green">
                Visit Us in Robbinsville
              </Link>
            </div>
          </div>
        </TwoColWithImage>
      </section>
    </>
  );
}
