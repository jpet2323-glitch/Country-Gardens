import { business } from "@/lib/nav";

export function Topbar() {
  return (
    <div className="topbar">
      <a href={business.phoneHref}>{business.phone}</a>
      <span className="topbar-sep">·</span>
      <span>Mon–Sat 8am–6pm &nbsp;·&nbsp; Sun 8am–5pm</span>
      <span className="topbar-sep">·</span>
      <a href={business.mapsUrl} target="_blank" rel="noreferrer">
        {business.address}
      </a>
    </div>
  );
}
