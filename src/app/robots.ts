import type { MetadataRoute } from "next";

/**
 * Environment-aware robots.txt.
 *
 * Vercel sets `VERCEL_ENV` to one of: "production", "preview", "development".
 * We only allow indexing on the real production deploy — preview URLs get
 * a blanket disallow so Google doesn't surface ephemeral branch deploys.
 */
export default function robots(): MetadataRoute.Robots {
  const isProd = process.env.VERCEL_ENV === "production";

  if (!isProd) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    };
  }

  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://countrygardensnj.com/sitemap.xml",
  };
}
