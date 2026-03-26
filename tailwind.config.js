/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Logo-inspired gradient spectrum: Electric Blue → Royal Purple
        "primary": "#3B82F6",       // Core blue
        "primary-light": "#60A5FA",
        "primary-dark": "#1D4ED8",
        "accent": "#8B5CF6",        // Violet accent
        "accent-light": "#A78BFA",
        "accent-dark": "#7C3AED",
        "neon-blue": "#0450DB",     // From logo
        "neon-purple": "#8331D8",   // From logo
        "neon-cyan": "#22D3EE",     // Highlight cyan
        "surface": {
          "50": "rgba(255,255,255,0.03)",
          "100": "rgba(255,255,255,0.06)",
          "200": "rgba(255,255,255,0.09)",
        },
        "background-light": "#f0f4ff",
        "background-dark": "#030712",
      },
      fontFamily: {
        "display": ["Inter", "system-ui", "sans-serif"],
        "mono": ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        "DEFAULT": "0.5rem",
        "lg": "0.75rem",
        "xl": "1rem",
        "2xl": "1.25rem",
        "3xl": "1.5rem",
        "full": "9999px",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "float-slower": "float 10s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "gradient-x": "gradient-x 6s ease infinite",
        "shimmer": "shimmer 2s linear infinite",
        "slide-up": "slide-up 0.5s ease-out",
        "slide-down": "slide-down 0.5s ease-out",
        "fade-in": "fade-in 0.6s ease-out",
        "spin-slow": "spin 8s linear infinite",
        "orbit": "orbit 20s linear infinite",
      },
      keyframes: {
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4", filter: "blur(20px)" },
          "50%": { opacity: "0.8", filter: "blur(30px)" },
        },
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "slide-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "slide-down": {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "orbit": {
          "0%": { transform: "rotate(0deg) translateX(150px) rotate(0deg)" },
          "100%": { transform: "rotate(360deg) translateX(150px) rotate(-360deg)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        "glow-blue": "0 0 40px rgba(59, 130, 246, 0.3)",
        "glow-purple": "0 0 40px rgba(139, 92, 246, 0.3)",
        "glow-cyan": "0 0 40px rgba(34, 211, 238, 0.3)",
        "inner-glow": "inset 0 0 30px rgba(59, 130, 246, 0.1)",
      },
    },
  },
  plugins: [],
}
