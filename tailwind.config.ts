import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "tb-navy": "#0C2340",
        "tb-navy-light": "#1E3A5F",
        "tb-orange": "#F97316",
        "tb-orange-dark": "#EA6B0A",
        "tb-bg": "#F8FAFC",
        "tb-text": "#64748B",
        "tb-border": "#E2E8F0",
        "tb-success": "#16A34A",
        "tb-error": "#DC2626",
        "tb-warning": "#D97706",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
};
export default config;
