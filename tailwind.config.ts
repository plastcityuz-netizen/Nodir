import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--bg-rgb) / <alpha-value>)",
        surface: "rgb(var(--surface-rgb) / <alpha-value>)",
        elevated: "rgb(var(--elevated-rgb) / <alpha-value>)",
        line: "var(--border)",
        ink: "rgb(var(--text-rgb) / <alpha-value>)",
        muted: "rgb(var(--muted-rgb) / <alpha-value>)",
        emerald: {
          DEFAULT: "rgb(var(--emerald-rgb) / <alpha-value>)",
          fill: "rgb(var(--emerald-fill-rgb) / <alpha-value>)",
          ink: "rgb(var(--emerald-ink-rgb) / <alpha-value>)",
          soft: "var(--emerald-soft)",
        },
        violet: "rgb(var(--violet-rgb) / <alpha-value>)",
        cyan: "rgb(var(--cyan-rgb) / <alpha-value>)",
        success: "rgb(var(--success-rgb) / <alpha-value>)",
        warning: "rgb(var(--warning-rgb) / <alpha-value>)",
        danger: "rgb(var(--danger-rgb) / <alpha-value>)",
        info: "rgb(var(--info-rgb) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        sans: ["var(--font-sans)"],
      },
      borderRadius: {
        lg: "12px",
        xl: "16px",
        "2xl": "24px",
      },
      transitionTimingFunction: {
        balans: "cubic-bezier(.22,1,.36,1)",
      },
      maxWidth: {
        site: "1600px",
      },
      boxShadow: {
        glass: "0 24px 80px -24px rgba(0,0,0,.55), inset 0 1px 0 rgba(255,255,255,.14)",
        float: "0 40px 120px -32px rgba(0,0,0,.7)",
        emerald: "0 12px 40px -12px rgba(25,227,166,.45)",
      },
    },
  },
  plugins: [],
};

export default config;
