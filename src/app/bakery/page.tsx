import { PageHeader } from "@/components/PageHeader";
import { TwoColWithImage } from "@/components/TwoColWithImage";
import { GardenFeatureList } from "@/components/GardenFeature";
import { business } from "@/lib/nav";

export const metadata = { title: "Bakery — Pies, Donuts & Cakes Baked Daily" };

export default function BakeryPage() {
  return (
    <>
      <PageHeader
        kicker="Baked Fresh Daily"
        title="Bakery"
        description="Everything in our bakery is made on-site, every single day — from our signature deep-dish pies to fresh donuts and specialty cakes."
        bgWord="BAKERY"
      />
      <section id="overview" className="section section-light">
        <TwoColWithImage
          imagePosition="left"
          image={{
            src: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=900&q=80&fit=crop",
            alt: "Fresh baked pies",
          }}
        >
          <div>
            <span className="kicker">Our Baked Goods</span>
            <h3 className="sh3">Made Here, Every Morning</h3>
            <GardenFeatureList
              features={[
                {
                  code: "PIE",
                  id: "pies",
                  title: '10" Deep-Dish Fresh Baked Pies',
                  description:
                    "Apple, seasonal fruit and specialty flavors — the area's finest, hands down. Available year-round and for holidays.",
                },
                {
                  code: "DNT",
                  id: "donuts",
                  title: "Apple Cider Donuts",
                  description:
                    "A local favorite — made fresh every morning. Get them early, they go fast!",
                },
                {
                  code: "MFN",
                  id: "muffins",
                  title: "Muffins & Loaf Cakes",
                  description:
                    "Rotating flavors daily — blueberry, banana, pumpkin, and seasonal specialties.",
                },
                {
                  code: "CKE",
                  id: "cakes",
                  title: "Specialty & Custom Cakes",
                  description:
                    "Layer cakes and custom orders available for birthdays, events and holidays. Call to order.",
                },
              ]}
            />
            <div style={{ marginTop: "1.8rem" }}>
              <a
                href={business.toastOrderUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-green btn-sm"
              >
                Order Bakery via Toast
              </a>
            </div>
          </div>
        </TwoColWithImage>
      </section>
    </>
  );
}
