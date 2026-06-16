import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: "#06060f",
          800: "#0d0d1a",
          700: "#12121f",
          600: "#1a1a2e",
        },
        accent: {
          violet: "#7c3aed",
          indigo: "#4f46e5",
          cyan: "#06b6d4",
          purple: "#a855f7",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-gradient":
          "linear-gradient(135deg, #06060f 0%, #0d0d1a 50%, #12121f 100%)",
        "accent-gradient":
          "linear-gradient(135deg, #7c3aed 0%, #4f46e5 50%, #06b6d4 100%)",
        "card-gradient":
          "linear-gradient(135deg, rgba(124,58,237,0.08) 0%, rgba(6,182,212,0.08) 100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "slide-up": "slideUp 0.8s ease-out forwards",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        "gradient-x": "gradientX 4s ease infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(124,58,237,0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(124,58,237,0.6), 0 0 80px rgba(6,182,212,0.2)" },
        },
        gradientX: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
      screens: {
        xs: "475px",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 30px rgba(124,58,237,0.4)",
        "glow-cyan": "0 0 30px rgba(6,182,212,0.4)",
        glass: "0 8px 32px rgba(0,0,0,0.4)",
      },
    },
  },
  plugins: [],
};

export default config;
