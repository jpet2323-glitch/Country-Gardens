import type { MetadataRoute } from "next";
import { navGroups } from "@/lib/nav";

const BASE_URL = "https://countrygardensnj.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = navGroups.flatMap((g) => g.items.map((i) => i.href));
  // Dedupe + add routes that live outside the sidebar
  const extras = ["/inquire"];
  const all = Array.from(new Set([...routes, ...extras]));

  return all.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
