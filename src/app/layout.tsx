import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { Sidebar } from "@/components/Sidebar";
import { SidebarProvider } from "@/components/SidebarContext";
import { SidebarOverlay } from "@/components/MobileToggle";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-dmsans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://countrygardensnj.com"),
  title: {
    default: "Country Gardens Farm Market & Deli — Robbinsville, NJ",
    template: "%s · Country Gardens",
  },
  description:
    "Country Gardens is Robbinsville's beloved farm market, gourmet deli, bakery, and garden center. Serving Mercer County families since 1986.",
  keywords: [
    "Country Gardens",
    "Robbinsville NJ",
    "farm market",
    "deli",
    "bakery",
    "garden center",
    "catering",
    "landscape",
    "Mercer County",
  ],
  openGraph: {
    title: "Country Gardens Farm Market & Deli",
    description:
      "Robbinsville's beloved farm market, gourmet deli, bakery, and garden center — serving Mercer County families since 1986.",
    url: "https://countrygardensnj.com",
    siteName: "Country Gardens",
    locale: "en_US",
    type: "website",
    images: [
      { url: "/images/hero.jpg", width: 1600, height: 900, alt: "Country Gardens Farm Market" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Country Gardens Farm Market & Deli",
    description:
      "Robbinsville's beloved farm market, gourmet deli, bakery, and garden center.",
    images: ["/images/hero.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2b1f10",
};

/**
 * Layout architecture (post-redesign):
 *   Header      — sticky top bar with hamburger/back toggle.
 *   Sidebar     — fixed-position drawer. Hidden off-canvas until the toggle
 *                 is pressed; slides in over the content on every viewport.
 *   Overlay     — full-viewport dimmer behind the drawer. Click to close.
 *   Main        — full-width content flow; no reserved sidebar column.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body>
        <SidebarProvider>
          <Header />
          <Sidebar />
          <SidebarOverlay />
          <main className="main-content" id="mainContent">
            <div className="page-fade">{children}</div>
            <Footer />
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
