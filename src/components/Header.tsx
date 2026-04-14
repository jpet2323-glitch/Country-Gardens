"use client";

import Image from "next/image";
import Link from "next/link";
import { business } from "@/lib/nav";
import { useSidebar } from "./SidebarContext";

/**
 * Slim global header.
 *
 * Houses (left → right):
 *   1. Menu toggle — hamburger when sidebar is closed, back/close when open
 *   2. Wordmark/logo linking home
 *   3. Compact contact chips (phone / hours / address)
 *
 * Sits above the sidebar + main content so the logo has a single fixed
 * home regardless of drawer state.
 */
export function Header() {
  const { open, toggle } = useSidebar();

  return (
    <header className="site-header" role="banner">
      <div className="site-header-inner">
        <div className="site-header-left">
          <button
            type="button"
            className={`hdr-menu-toggle${open ? " is-open" : ""}`}
            onClick={toggle}
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            aria-controls="sidebar"
          >
            {open ? (
              /* "Back" / close icon — an arrow pointing left */
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
            ) : (
              /* Hamburger / menu icon */
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>

          <Link href="/" className="site-header-brand" aria-label="Country Gardens — Home">
            <Image
              src="/images/logo.png"
              alt=""
              width={160}
              height={48}
              priority
              style={{ height: 44, width: "auto" }}
            />
            <span className="site-header-wordmark">
              <span className="site-header-name">Country Gardens</span>
              <span className="site-header-sub">
                Farm Market &amp; Deli · Est. {business.established}
              </span>
            </span>
          </Link>
        </div>

        <div className="site-header-right">
          <a href={business.phoneHref} className="hdr-chip">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            {business.phone}
          </a>
          <span className="hdr-chip hdr-chip-muted hdr-chip-hours">
            Mon–Sat 8–6 · Sun 8–5
          </span>
          <a
            href={business.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="hdr-chip hdr-chip-muted hdr-chip-address"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Robbinsville, NJ
          </a>
        </div>
      </div>
    </header>
  );
}
