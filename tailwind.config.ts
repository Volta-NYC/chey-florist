import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1a1612",
        bone: "#f0e6d2",
        parchment: "#e9dcc0",
        cream: "#f7efe0",
        moss: "#2c3a26",
        moss2: "#3a4a33",
        oxblood: "#5a1f1f",
        gold: "#a8804a",
        blush: "#d4a59a",
        dust: "#8a7d6a",
      },
      fontFamily: {
        display: ['"Fraunces"', 'Georgia', 'serif'],
        serif: ['"EB Garamond"', 'Georgia', 'serif'],
        italic: ['"Italiana"', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      animation: {
        'slow-spin': 'spin 40s linear infinite',
        'fade-up': 'fadeUp 0.9s cubic-bezier(0.22, 0.61, 0.36, 1) both',
        'marquee': 'marquee 40s linear infinite',
        'sway': 'sway 6s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
