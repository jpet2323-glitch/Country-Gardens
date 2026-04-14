import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        soil: "#2b1f10",
        bark: "#4a3320",
        walnut: "#7a5535",
        straw: "#c9a96e",
        cream: "#f7f2e8",
        parchment: "#ede5d0",
        sage: "#5a7a52",
        fern: "#3d6135",
        moss: "#c8dab8",
        sky: "#e8f0e4",
        white: "#fdfaf4",
        gold: "#d4a84b",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "serif"],
        sans: ["var(--font-dmsans)", "DM Sans", "system-ui", "sans-serif"],
      },
      borderRadius: {
        footer: "40px 40px 0 0",
      },
      keyframes: {
        fadeSlide: {
          from: { opacity: "0", transform: "translateX(10px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        fadeSlide: "fadeSlide .28s ease",
      },
    },
  },
  plugins: [],
};

export default config;
