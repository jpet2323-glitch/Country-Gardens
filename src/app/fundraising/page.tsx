import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { TwoColWithImage } from "@/components/TwoColWithImage";
import { GardenFeatureList } from "@/components/GardenFeature";
import { business } from "@/lib/nav";

export const metadata = { title: "Fundraising Programs" };

export default function FundraisingPage() {
  return (
    <>
      <PageHeader
        kicker="Schools & Nonprofits"
        title="Fundraising Programs"
        description="We partner with area schools and nonprofit organizations to run easy, profitable fundraising programs year-round."
        bgWord="FUNDRAISING"
      />
      <section className="section section-light">
        <div id="how-it-works" style={{ marginBottom: "2.5rem" }}>
          <TwoColWithImage
            imagePosition="right"
            image={{
              src: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=900&q=80&fit=crop",
              alt: "Country Gardens",
            }}
          >
            <div>
              <span className="kicker">How It Works</span>
              <h3 className="sh3">Simple, Seasonal &amp; Profitable</h3>
              <p className="slead" style={{ maxWidth: "100%", marginBottom: "1.5rem" }}>
                Country Gardens has been supporting local schools and nonprofits
                since {business.established}. Our programs are designed to be
                easy to run, well-received by the community, and genuinely
                profitable for your organization.
              </p>
              <GardenFeatureList
                features={[
                  {
                    code: "PIE",
                    id: "pies",
                    title: "Holiday Pie Sales",
                    description:
                      'Our most popular program — sell our famous 10" deep-dish pies for Thanksgiving and the holidays.',
                  },
                  {
                    code: "PLT",
                    id: "poinsettias",
                    title: "Poinsettias & Holiday Plants",
                    description:
                      "Beautiful holiday poinsettias, wreaths and arrangements — perfect for the holiday season.",
                  },
                  {
                    code: "SPR",
                    id: "spring",
                    title: "Spring Flower Programs",
                    description:
                      "Easter flowers, spring bedding plants and more — a fresh fundraising opportunity every spring.",
                  },
                  {
                    code: "YRD",
                    title: "Year-Round Opportunities",
                    description:
                      "We work with organizations throughout the year — contact us to discuss what works best for your group.",
                  },
                ]}
              />
            </div>
          </TwoColWithImage>
        </div>
        <div id="partner" className="info-card">
          <h3>Interested in a Fundraising Partnership?</h3>
          <p>
            We&rsquo;d love to hear from you. Reach out to start a conversation
            about how Country Gardens can help your organization reach its
            fundraising goals.
          </p>
          <div className="btn-row">
            <Link href="/inquire" className="btn btn-green">
              Submit an Inquiry
            </Link>
            <a href={business.phoneHref} className="btn btn-outline-dark">
              {business.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
