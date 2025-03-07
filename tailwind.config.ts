
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['IBM Plex Sans', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "button-glow": {
          "0%, 100%": {
            "box-shadow": "0 0 20px 2px rgba(59, 130, 246, 0.3)"
          },
          "50%": {
            "box-shadow": "0 0 25px 4px rgba(59, 130, 246, 0.5)"
          }
        },
        "connector-pulse": {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "1" }
        },
        "draw-line": {
          "0%": { height: "0%" },
          "100%": { height: "100%" }
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" }
        },
        breathe: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" }
        },
        "timeline-light-movement": {
          "0%": { top: "0%", boxShadow: "0 0 10px 2px rgba(59, 130, 246, 0.7)" },
          "100%": { top: "100%", boxShadow: "0 0 10px 2px rgba(59, 130, 246, 0.7)" }
        },
        "text-decode": {
          "0%": { filter: "blur(4px)", opacity: "0.3" },
          "100%": { filter: "blur(0)", opacity: "1" }
        }
      },
      animation: {
        "fade-in": "fade-in 0.8s ease-out forwards",
        float: "float 6s ease-in-out infinite",
        "button-glow": "button-glow 3s ease-in-out infinite",
        "connector-pulse": "connector-pulse 2s ease-in-out infinite",
        "draw-line": "draw-line 1.5s ease-out forwards",
        pulse: "pulse 2s ease-in-out infinite",
        breathe: "breathe 3s ease-in-out infinite",
        "timeline-light-movement": "timeline-light-movement 8s linear infinite", // Slowed from 4s to 8s
        "text-decode": "text-decode 0.5s ease-out forwards"
      },
      boxShadow: {
        glow: "0 0 15px rgba(59, 130, 246, 0.5)"
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
