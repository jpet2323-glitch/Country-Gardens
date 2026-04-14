"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { usePathname } from "next/navigation";

type Ctx = {
  /** Whether the drawer-style sidebar is currently visible. */
  open: boolean;
  toggle: () => void;
  openSidebar: () => void;
  close: () => void;

  /** Which nav items are showing their anchor accordion. */
  expanded: Set<string>;
  toggleExpanded: (href: string) => void;
  isExpanded: (href: string) => boolean;
};

const SidebarContext = createContext<Ctx | null>(null);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set());
  const pathname = usePathname();

  // Close the drawer whenever the route changes so navigation feels decisive.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Auto-expand the active route's action shortcuts by default.
  useEffect(() => {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.add(pathname);
      return next;
    });
  }, [pathname]);

  // Lock body scroll when the drawer is open (overlay covers the page).
  useEffect(() => {
    if (typeof document === "undefined") return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = open ? "hidden" : prev;
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const toggle = useCallback(() => setOpen((v) => !v), []);
  const openSidebar = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);

  const toggleExpanded = useCallback((href: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(href)) next.delete(href);
      else next.add(href);
      return next;
    });
  }, []);

  const isExpanded = useCallback(
    (href: string) => expanded.has(href),
    [expanded]
  );

  const value = useMemo<Ctx>(
    () => ({
      open,
      toggle,
      openSidebar,
      close,
      expanded,
      toggleExpanded,
      isExpanded,
    }),
    [open, toggle, openSidebar, close, expanded, toggleExpanded, isExpanded]
  );

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
}

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used within SidebarProvider");
  return ctx;
}
