"use client";

import { useSidebar } from "./SidebarContext";

/**
 * Full-viewport dimmer shown behind the sidebar drawer. Clicking it closes
 * the drawer. The drawer now opens at every breakpoint (not just mobile),
 * so the name "MobileOverlay" is a legacy artifact — the CSS class
 * `.sidebar-overlay` is what actually drives styling.
 */
export function SidebarOverlay() {
  const { open, close } = useSidebar();
  return (
    <div
      className={`sidebar-overlay${open ? " open" : ""}`}
      onClick={close}
      aria-hidden
    />
  );
}

/** @deprecated Kept as an alias so old imports don't break. */
export const MobileOverlay = SidebarOverlay;
