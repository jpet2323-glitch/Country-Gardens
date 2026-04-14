import Image from "next/image";
import Link from "next/link";
import { OfferingCard } from "@/components/OfferingCard";
import { business } from "@/lib/nav";
import { toastImages } from "@/lib/images";

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section id="top" className="hero-wrap">
        <Image
          className="hero-bg"
          src={toastImages.heroStorefront}
          alt="Country Gardens Farm Market — Robbinsville, NJ"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center 30%" }}
        />
        <div className="hero-scrim" />
        <div className="hero-body">
          <span className="hero-eyebrow">
            Robbinsville, NJ &nbsp;·&nbsp; Est. {business.established}
          </span>
          <h1 className="hero-h1">
            Fresh. Local.
            <em>Family-made.</em>
          </h1>
          <p className="hero-desc">
            Robbinsville&rsquo;s beloved farm market, gourmet deli, bakery, and
            full-service garden center — all in one. Serving Mercer County
            families since {business.established}.
          </p>
          <div className="hero-actions">
            <a
              href={business.toastOrderUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
            >
              Order Online via Toast
            </a>
            <Link href="/inquire" className="btn-ghost">
              Inquire Now
            </Link>
          </div>
          <div className="hero-trust">
            <div>
              <div className="trust-num">33+</div>
              <div className="trust-label">Years Serving NJ</div>
            </div>
            <div>
              <div className="trust-num">100%</div>
              <div className="trust-label">Family Owned</div>
            </div>
            <div>
              <div className="trust-num">Local</div>
              <div className="trust-label">Fresh Ingredients</div>
            </div>
          </div>
          <span className="hero-pill">
            Open Daily · Mon–Sat 8am–6pm · Sun 8am–5pm
          </span>
        </div>
      </section>

      {/* SERVICES BANNER */}
      <section id="departments" className="home-banner">
        {[
          { title: "DELI", sub: "Boar's Head · Made to Order" },
          { title: "BAKERY", sub: "Pies, cakes & donuts daily" },
          { title: "GARDEN", sub: "Trees, shrubs & plants" },
          { title: "CATERING", sub: "Parties & holiday dinners" },
          { title: "LANDSCAPING", sub: "Design & installation" },
          { title: "HARDSCAPING", sub: "Patios & stonework" },
          { title: "COMMUNITY", sub: "Schools & nonprofits" },
        ].map((cell) => (
          <div key={cell.title} className="home-banner-cell">
            <div className="home-banner-title">{cell.title}</div>
            <div className="home-banner-sub">{cell.sub}</div>
          </div>
        ))}
      </section>

      {/* WHAT'S FRESH */}
      <section id="fresh" className="fresh-strip">
        <div className="fresh-label">What&rsquo;s Fresh &amp; In Season Right Now</div>
        <div className="fresh-cards">
          {[
            { name: "Deep-Dish Apple Pies", tag: "Daily" },
            { name: "Apple Cider Donuts", tag: "Daily" },
            { name: "Spring Bedding Plants", tag: "In Stock" },
            { name: "Boar's Head Deli", tag: "Made to Order" },
            { name: "Organic Coffee Bar", tag: "Open Daily" },
            { name: "Spring Catering Menus", tag: "Available" },
          ].map((c) => (
            <div key={c.name} className="fresh-card">
              {c.name}
              <span className="fresh-tag">{c.tag}</span>
            </div>
          ))}
        </div>
      </section>

      {/* OFFERINGS */}
      <section id="offerings" className="section section-light">
        <span className="kicker">Everything You Need</span>
        <h2 className="sh2">
          A little bit of everything,
          <br />
          made with a lot of heart.
        </h2>
        <p className="slead">
          From fresh deli sandwiches to hand-picked garden plants — your
          one-stop shop since {business.established}.
        </p>
        <div className="og">
          <OfferingCard
            href="/farm-market"
            title="Farm Market"
            description="Jersey Fresh produce, local dairy, fresh breads and seasonal specialty goods."
            image={toastImages.salads}
            alt="Farm market salads"
          />
          <OfferingCard
            href="/deli"
            title="Country Deli"
            description="Boar's Head made-to-order sandwiches, soups, salads & organic coffee."
            image={toastImages.sandwiches}
            alt="Deli sandwiches"
          />
          <OfferingCard
            href="/bakery"
            title="Bakery"
            description="Deep-dish pies, donuts, muffins and cakes baked fresh on-site every day."
            image={toastImages.bakery}
            alt="Fresh bakery items"
          />
          <OfferingCard
            href="/catering"
            title="Catering & Events"
            description="Holiday dinners, cold platters, hot entrées and custom party packages."
            image={toastImages.cateringCrostini}
            alt="Catering appetizer spread"
          />
          <OfferingCard
            href="/fundraising"
            title="Fundraising"
            description="Pies, poinsettias, wreaths and more — easy seasonal programs for schools and nonprofits."
            image={toastImages.fundraiserPieAd}
            alt="Country Gardens pie fundraiser"
          />
          <OfferingCard
            href="/landscape"
            title="Landscaping & Hardscaping"
            description="Professional design, patios, stonework, installation and lawn maintenance."
            image="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&fit=crop"
            alt="Landscaping"
          />
          <OfferingCard
            href="/garden-center"
            title="Garden Center"
            description="Trees, shrubs, bedding plants, mulch, topsoil, firewood and propane."
            image={toastImages.gardenCenter}
            alt="Country Gardens Garden Center"
          />
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="section section-sky" style={{ textAlign: "center" }}>
        <span className="kicker" style={{ justifyContent: "center" }}>
          What People Are Saying
        </span>
        <div className="stars-hero">★★★★★</div>
        <h2 className="sh2">Loved by our community.</h2>
        <p className="stars-sub">Rated 4.5+ stars across Google &amp; Facebook</p>
        <div className="rv-grid">
          {[
            {
              badge: "Google",
              text: "The sandwiches here are absolutely incredible — Boar's Head meats piled high and always made fresh. The apple cider donuts are worth the trip alone.",
              author: "Sarah M.",
              source: "Mercer County, NJ",
            },
            {
              badge: "Google",
              text: "We've been coming here for over 15 years. Their holiday catering packages saved Thanksgiving more than once. Truly a family institution.",
              author: "Tom & Linda R.",
              source: "Central NJ",
            },
            {
              badge: "Facebook",
              text: "The garden center is fantastic — great plant selection and the staff knows what they're talking about. Will always be a local staple.",
              author: "Kevin D.",
              source: "Mercer County, NJ",
            },
          ].map((r) => (
            <div className="rv" key={r.author}>
              <div className="rv-badge">{r.badge}</div>
              <div className="rv-stars">★★★★★</div>
              <p className="rv-text">{r.text}</p>
              <div className="rv-author">{r.author}</div>
              <div className="rv-source">{r.source}</div>
            </div>
          ))}
        </div>
        <p className="rv-cta">
          <a href={business.reviewsUrl} target="_blank" rel="noreferrer">
            Leave us a review on Google →
          </a>
        </p>
      </section>
    </>
  );
}
