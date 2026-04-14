import { PageHeader } from "@/components/PageHeader";
import { business } from "@/lib/nav";

export const metadata = { title: "Visit Us — Location & Hours" };

export default function VisitPage() {
  return (
    <>
      <PageHeader
        kicker="Come See Us"
        title="Find Us in Robbinsville"
        description="Open year-round, rain or shine. Come in for a sandwich, pick up some plants, or just say hello."
        bgWord="VISIT"
      />
      <section id="details" className="section section-dark">
        <div className="two-col">
          <div>
            <ul className="cl">
              <li>
                <span className="ci">ADDR</span>
                <div className="cd">
                  <strong>Address</strong>
                  {business.address}
                  <br />
                  {business.city}
                </div>
              </li>
              <li>
                <span className="ci">CALL</span>
                <div className="cd">
                  <strong>Phone</strong>
                  <a href={business.phoneHref} style={{ color: "inherit" }}>
                    {business.phone}
                  </a>
                </div>
              </li>
              <li>
                <span className="ci">HRS</span>
                <div className="cd">
                  <strong>Hours</strong>
                  {business.hoursLines[0]}
                  <br />
                  {business.hoursLines[1]}
                  <br />
                  <em style={{ opacity: 0.55 }}>
                    Open year-round · Holiday hours may vary
                  </em>
                </div>
              </li>
              <li>
                <span className="ci">WEB</span>
                <div className="cd">
                  <strong>Website</strong>
                  <a
                    href={business.websiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "var(--straw)" }}
                  >
                    {business.website}
                  </a>
                </div>
              </li>
            </ul>
            <a
              href={business.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-green"
              style={{ marginTop: "1.8rem", display: "inline-block", textDecoration: "none" }}
            >
              Get Directions →
            </a>
          </div>
          <div id="map" className="map-frame">
            <iframe
              src={business.mapsEmbedUrl}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Country Gardens Farm Market location map"
            />
          </div>
        </div>
      </section>
    </>
  );
}
