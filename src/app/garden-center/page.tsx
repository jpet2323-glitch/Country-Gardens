import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { TwoColWithImage } from "@/components/TwoColWithImage";
import { GardenFeatureList } from "@/components/GardenFeature";
import { toastImages } from "@/lib/images";

export const metadata = { title: "Garden Center & Landscape Services" };

/**
 * Bulk material cards. Copy is lifted verbatim from the live Toast site so
 * the voice matches what customers already see today. Every card funnels
 * into the landscape inquiry form where the team can quote delivery.
 */
const bulkMaterials = [
  {
    title: "Black Mulch",
    image: toastImages.mulchBlack,
    blurb:
      "Our premium black mulch is engineered to retain its deep color longer, helping your landscape look sharp while also supporting moisture retention and weed control.",
  },
  {
    title: "Brown Mulch",
    image: toastImages.mulchBrown,
    blurb:
      "Our premium brown mulch offers long-lasting, natural color while helping retain soil moisture, regulate temperature, and reduce weed growth.",
  },
  {
    title: "Screened Topsoil",
    image: toastImages.topsoil,
    blurb:
      "Start with the right foundation. Our screened topsoil is clean, easy to work with, and ideal for seeding, sodding, and prepping any landscape project.",
  },
  {
    title: "Compost",
    image: toastImages.compost,
    blurb:
      "Give your soil a serious upgrade. Our compost is packed with nutrients to bring life back to tired beds and supercharge flowering and fruit and vegetable production.",
  },
];

const seasonalTags = [
  "Christmas Trees",
  "Holiday Wreaths",
  "Spring Bedding Plants",
  "Fall Decor",
  "Summer Annuals",
  "Mulch & Topsoil",
  "Firewood & Propane",
  "Poinsettias",
];

export default function GardenCenterPage() {
  return (
    <>
      <PageHeader
        kicker="Green Thumb HQ"
        title="Garden Center & Landscape Services"
        description="From bedding plants to full outdoor living transformations — everything your yard needs, season after season."
        bgWord="GARDEN"
      />
      <section className="section section-light">
        <div style={{ marginBottom: "2.5rem" }}>
          <TwoColWithImage
            imagePosition="left"
            image={{
              src: toastImages.gardenCenter,
              alt: "Country Gardens Garden Center in Robbinsville, NJ",
              aspect: "16/9",
            }}
          >
            <div>
              <span className="kicker">Your Hometown Garden Center</span>
              <h3 className="sh3">All Year Long!</h3>
              <p className="slead" style={{ maxWidth: "100%", marginBottom: "1.25rem" }}>
                Located in the heart of Robbinsville, our full-service retail
                garden center offers everything you need to keep your home and
                garden beautiful in every season. We provide professional
                landscape design and installation, along with lawn and garden
                maintenance services.
              </p>
              <GardenFeatureList
                features={[
                  {
                    code: "PLT",
                    id: "plants",
                    title: "Plants, Trees & Shrubs",
                    description:
                      "Seasonal bedding plants, poinsettias, Christmas trees, wreaths, and year-round landscape plants.",
                  },
                  {
                    code: "DSN",
                    id: "design",
                    title: "Landscape Design & Installation",
                    description:
                      "Professional design, hardscaping, patio installation, and full outdoor living transformations.",
                  },
                  {
                    code: "SUP",
                    id: "supplies",
                    title: "Lawn & Garden Supplies",
                    description:
                      "Mulch, topsoil, firewood, propane, and everything else your yard needs.",
                  },
                ]}
              />
            </div>
          </TwoColWithImage>
        </div>

        {/* PREMIUM SOIL & MULCH — ported from the live Toast site */}
        <div id="bulk-materials" style={{ marginBottom: "2.5rem" }}>
          <span className="kicker">Premium Soil &amp; Mulch</span>
          <h3 className="sh3" style={{ marginBottom: "0.4rem" }}>
            Bulk Materials &amp; Delivery
          </h3>
          <p className="slead" style={{ maxWidth: "60ch", marginBottom: "1.5rem" }}>
            From the ground up, we do it all. Bulk materials, expert design,
            and full installation &mdash; ready when you are. Book your spring
            clean-up or upgrade project today.
          </p>

          <div className="og">
            {bulkMaterials.map((m) => (
              <article key={m.title} className="offering-card">
                <div className="offering-card-img-wrap">
                  <Image
                    src={m.image}
                    alt={m.title}
                    fill
                    sizes="(max-width: 900px) 100vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="offering-card-body">
                  <h4 className="offering-card-title">{m.title}</h4>
                  <p className="offering-card-desc">{m.blurb}</p>
                  <Link
                    href="/inquire?type=landscape"
                    className="offering-card-link"
                  >
                    Request a Delivery Quote →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div id="seasonal" className="info-card-dark">
          <span className="kicker kicker-moss">Seasonal Availability</span>
          <h3>Available Throughout the Year</h3>
          <div className="stags">
            {seasonalTags.map((t) => (
              <span key={t} className="stag">
                {t}
              </span>
            ))}
          </div>
        </div>

        <div style={{ marginTop: "2rem" }}>
          <Link href="/inquire?type=landscape" className="btn btn-green">
            Request a Landscape Quote
          </Link>
        </div>
      </section>
    </>
  );
}
