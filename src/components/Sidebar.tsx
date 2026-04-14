"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { business, navGroups, type Anchor, type NavItem } from "@/lib/nav";
import { useSidebar } from "./SidebarContext";

/**
 * Drawer-style primary navigation.
 *
 * The sidebar is fully hidden when closed and slides in as an overlay when
 * the user taps the header menu button. Each nav row optionally reveals a
 * small set of *action* shortcuts (order via Toast, jump to a specific
 * quote form variant) via an accordion chevron.
 */
export function Sidebar() {
  const pathname = usePathname();
  const { open, isExpanded, toggleExpanded, close } = useSidebar();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <aside
      className={"sidebar" + (open ? " is-open" : "")}
      id="sidebar"
      aria-label="Primary navigation"
      aria-hidden={!open}
    >
      <nav className="sidebar-nav" aria-label="Primary">
        {navGroups.map((group) => (
          <div key={group.label} className="sidebar-group">
            <div className="sidebar-section-label">{group.label}</div>
            {group.items.map((item) => (
              <SidebarEntry
                key={item.href}
                item={item}
                active={isActive(item.href)}
                expanded={isExpanded(item.href)}
                onToggle={() => toggleExpanded(item.href)}
                onNavigate={close}
              />
            ))}
          </div>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <Link
          href="/inquire"
          className="sidebar-cta"
          title="Request a Quote"
          onClick={close}
        >
          <span className="sidebar-cta-icon" aria-hidden>
            {/* Paper-plane glyph */}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </span>
          <span className="sidebar-cta-label">Request a Quote</span>
        </Link>
        <div className="sidebar-hours">
          <a href={business.phoneHref}>{business.phone}</a>
        </div>
      </div>
    </aside>
  );
}

function SidebarEntry({
  item,
  active,
  expanded,
  onToggle,
  onNavigate,
}: {
  item: NavItem;
  active: boolean;
  expanded: boolean;
  onToggle: () => void;
  onNavigate: () => void;
}) {
  const hasAnchors = !!item.anchors?.length;
  const showAccordion = hasAnchors && expanded;

  return (
    <div
      className={
        "sidebar-item" +
        (active ? " is-active" : "") +
        (expanded ? " is-expanded" : "")
      }
    >
      <div className="sidebar-row">
        <Link
          href={item.href}
          className={`sidebar-tab${active ? " active" : ""}`}
          title={item.label}
          onClick={onNavigate}
        >
          <span className="tab-icon" aria-hidden>
            {item.icon}
          </span>
          <span className="tab-label">{item.label}</span>
        </Link>
        {hasAnchors && (
          <button
            type="button"
            className="sidebar-caret"
            aria-label={
              expanded
                ? `Hide ${item.label} shortcuts`
                : `Show ${item.label} shortcuts`
            }
            aria-expanded={expanded}
            onClick={onToggle}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
              style={{
                transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 200ms ease",
              }}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        )}
      </div>

      {showAccordion && (
        <ul className="sidebar-anchors" role="list">
          {item.anchors!.map((a) => (
            <li key={a.href}>
              <AnchorLink anchor={a} onNavigate={onNavigate} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/**
 * Renders an individual action shortcut. External links open in a new tab
 * with a small ↗ glyph; internal links (including routes with query
 * strings like /inquire?type=landscape) use Next's Link so the router
 * can pre-fill the form variant client-side.
 */
function AnchorLink({
  anchor,
  onNavigate,
}: {
  anchor: Anchor;
  onNavigate: () => void;
}) {
  if (anchor.external) {
    return (
      <a
        href={anchor.href}
        target="_blank"
        rel="noreferrer"
        className="sidebar-anchor sidebar-anchor-external"
      >
        <span className="sidebar-anchor-dot" aria-hidden />
        <span className="sidebar-anchor-label">{anchor.label}</span>
        <span className="sidebar-anchor-ext" aria-hidden>
          ↗
        </span>
      </a>
    );
  }

  return (
    <Link
      href={anchor.href}
      className="sidebar-anchor"
      onClick={onNavigate}
    >
      <span className="sidebar-anchor-dot" aria-hidden />
      <span className="sidebar-anchor-label">{anchor.label}</span>
    </Link>
  );
}
