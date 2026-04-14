/**
 * Central navigation config for Country Gardens.
 * Sidebar + Footer both consume this so adding a route means
 * editing one place.
 */

export type Anchor = {
  label: string;
  /**
   * Destination for this shortcut.
   *   - "/path"                    — internal route
   *   - "/path?type=landscape"     — internal route with query (inquiry pre-fill)
   *   - "#hash"                    — same-page anchor
   *   - "https://..."              — external URL (opens in new tab)
   */
  href: string;
  /** Render an "↗" glyph and open in a new tab. */
  external?: boolean;
};

export type NavItem = {
  label: string;
  href: string;
  /** Short 2-3 letter code shown in the sidebar tile. */
  icon: string;
  /**
   * Optional action shortcuts revealed by the sidebar accordion.
   * These are deliberately ACTIONS (Order, Get a Quote, Apply) rather
   * than per-section anchors — the page itself is the scroll target.
   */
  anchors?: Anchor[];
};

export type NavGroup = {
  label: string;
  items: NavItem[];
};

// Matches the URL the live Toast site uses. Toast 301s this through to the
// canonical `toasttab.com/local/order/...` checkout, so the branded subdomain
// is fine and reads cleaner in share sheets / analytics.
const TOAST_URL = "https://countrygardensfarmmarket.toast.site/order";
// Employment is now handled on-site at /employment instead of the old
// Toast/standalone HTML page. Kept as a relative path for business metadata.
const EMPLOYMENT_URL = "/employment";
const MAPS_URL =
  "https://maps.google.com/?q=42+Robbinsville+Edinburg+Rd+Robbinsville+NJ+08691";

export const navGroups: NavGroup[] = [
  {
    label: "Navigate",
    items: [
      { label: "Home", href: "/", icon: "HM" },
      { label: "Farm Market", href: "/farm-market", icon: "FM" },
      {
        label: "Deli",
        href: "/deli",
        icon: "DL",
        anchors: [
          { label: "Order via Toast", href: TOAST_URL, external: true },
        ],
      },
      {
        label: "Bakery",
        href: "/bakery",
        icon: "BK",
        anchors: [
          { label: "Order via Toast", href: TOAST_URL, external: true },
        ],
      },
      {
        label: "Catering",
        href: "/catering",
        icon: "CT",
        anchors: [
          { label: "Order Catering via Toast", href: TOAST_URL, external: true },
          { label: "Request a Catering Quote", href: "/inquire?type=catering" },
        ],
      },
      {
        label: "Fundraising",
        href: "/fundraising",
        icon: "FR",
        anchors: [
          { label: "Start a Partnership", href: "/inquire?type=other" },
        ],
      },
      {
        label: "Landscaping & Hardscaping",
        href: "/landscape",
        icon: "LS",
        anchors: [
          { label: "Request a Landscape Quote", href: "/inquire?type=landscape" },
        ],
      },
      {
        label: "Garden Center",
        href: "/garden-center",
        icon: "GD",
        anchors: [
          { label: "Request a Landscape Quote", href: "/inquire?type=landscape" },
        ],
      },
      { label: "Gallery", href: "/gallery", icon: "GL" },
      { label: "About Us", href: "/about", icon: "AB" },
      {
        label: "Visit Us",
        href: "/visit",
        icon: "VS",
        anchors: [
          { label: "Get Directions", href: MAPS_URL, external: true },
        ],
      },
    ],
  },
  {
    label: "More",
    items: [
      {
        label: "Mulch Delivery",
        href: "/mulch",
        icon: "ML",
        anchors: [
          { label: "Request a Delivery Quote", href: "/inquire?type=other" },
        ],
      },
      { label: "Bruce the Spruce", href: "/bruce-the-spruce", icon: "BR" },
      {
        label: "Rooted: Classes + Workshops",
        href: "/rooted",
        icon: "CW",
        anchors: [
          { label: "Inquire About Events", href: "/inquire?type=other" },
        ],
      },
      {
        label: "Gift Cards",
        href: "/gift-cards",
        icon: "GC",
        anchors: [
          { label: "Buy Online via Toast", href: TOAST_URL, external: true },
        ],
      },
      { label: "Donation Request Form", href: "/donation-request", icon: "DN" },
      {
        label: "Employment",
        href: "/employment",
        icon: "JB",
        anchors: [
          { label: "Current Openings", href: "/employment#openings" },
          { label: "Send Your Info", href: "/inquire?type=other" },
        ],
      },
    ],
  },
];

/** Flat list for the footer (no anchors — footer links navigate to pages). */
export const footerLinks: NavItem[] = [
  { label: "Farm Market", href: "/farm-market", icon: "FM" },
  { label: "Deli", href: "/deli", icon: "DL" },
  { label: "Bakery", href: "/bakery", icon: "BK" },
  { label: "Catering", href: "/catering", icon: "CT" },
  { label: "Fundraising", href: "/fundraising", icon: "FR" },
  { label: "Landscaping & Hardscaping", href: "/landscape", icon: "LS" },
  { label: "Garden Center", href: "/garden-center", icon: "GD" },
  { label: "Mulch Delivery", href: "/mulch", icon: "ML" },
  { label: "Bruce the Spruce", href: "/bruce-the-spruce", icon: "BR" },
  { label: "Classes + Workshops", href: "/rooted", icon: "CW" },
  { label: "Gift Cards", href: "/gift-cards", icon: "GC" },
  { label: "Donation Request", href: "/donation-request", icon: "DN" },
  { label: "Request a Quote", href: "/inquire", icon: "IN" },
  { label: "Now Hiring", href: "/employment", icon: "JB" },
];

/** Single source of truth for business details used across the site. */
export const business = {
  name: "Country Gardens Farm Market & Deli",
  shortName: "Country Gardens",
  phone: "(609) 259-1221",
  phoneHref: "tel:6092591221",
  address: "42 Robbinsville-Edinburg Road",
  city: "Robbinsville, NJ 08691",
  mapsUrl: MAPS_URL,
  mapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3046.8!2d-74.5936!3d40.2087!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c3e3e3e3e3e3e3%3A0x0!2s42%20Robbinsville-Edinburg%20Rd%2C%20Robbinsville%2C%20NJ%2008691!5e0!3m2!1sen!2sus!4v1",
  hoursShort: "Mon–Sat 8am–6pm · Sun 8am–5pm",
  hoursLines: ["Monday – Saturday: 8:00 AM – 6:00 PM", "Sunday: 8:00 AM – 5:00 PM"],
  website: "countrygardensnj.com",
  websiteUrl: "https://countrygardensnj.com",
  toastOrderUrl: TOAST_URL,
  instagramUrl: "https://www.instagram.com/countrygardens_robbinsville/",
  facebookUrl: "https://www.facebook.com/profile.php?id=100088123320577",
  reviewsUrl:
    "https://www.google.com/search?q=Country+Gardens+Farm+Market+Deli+Robbinsville+NJ",
  employmentUrl: EMPLOYMENT_URL,
  established: "1986",
} as const;
