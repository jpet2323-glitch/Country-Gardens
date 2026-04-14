/**
 * Image assets pulled from the live Toast site.
 *
 * We hotlink these via the unsigned Toast CDN (`d28f3w0x9i80nq.cloudfront.net`)
 * because the signed variants include a per-size hash that rotates.
 *
 * To self-host later:
 *   1. Download each file into `public/images/toast/<filename>`.
 *   2. Replace `cdn(...)` calls with `/images/toast/<filename>`.
 *   3. Optionally drop the two cloudfront hosts from `next.config.mjs`.
 */

const RESTAURANT_ID = "52208dc8-67b9-4844-a2f4-71c62be5f5cd";
const CDN_BASE = `https://d28f3w0x9i80nq.cloudfront.net/restaurantImages/${RESTAURANT_ID}`;

const cdn = (name: string) => `${CDN_BASE}/${name}`;

/** Canonical image references keyed by page/section they appear on. */
export const toastImages = {
  logo: cdn("Logo.png"),
  heroStorefront: cdn("20251124_164205.jpg"),
  salad: cdn("Image12519at300PM1.jpg"),
  gardenCenter: cdn("IMG_1142.JPG"),
  catering1: cdn("IMG_4098.jpeg"),
  catering2: cdn("IMG_5636.JPG"),
  fundraiserPieAd: cdn("FundraiserPieAd.jpg"),
  bruceSpruce: cdn("BruceTheSpruce.png"),
  sandwich: cdn("Sandwich2.jpeg"),
  sandwiches: cdn("Sandwiches.jpg"),
  salads: cdn("Salads.jpg"),
  bakery: cdn("Bakery.jpg"),
  mulchBlack: cdn("blackmulch11.jpg"),
  mulchBrown: cdn("brownmulch.jpeg"),
  topsoil: cdn("screenedtopsoil.jpg"),
  compost: cdn("compost.jpg"),
  cateringCrostini: cdn("CountryKitchenFlavor1.jpg"),
  easterFlyer: cdn("EasterCGFlyer.png"),
} as const;

export type ToastImageKey = keyof typeof toastImages;
