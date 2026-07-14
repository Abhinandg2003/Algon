/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "color-1": "hsl(var(--color-1))",
        "color-2": "hsl(var(--color-2))",
        "color-3": "hsl(var(--color-3))",
        "color-4": "hsl(var(--color-4))",
        "color-5": "hsl(var(--color-5))",
      },
      fontFamily: {
        primary: ['Satoshi', 'system-ui', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scrollLine: {
          '0%': { opacity: '0', transform: 'scaleY(0)', transformOrigin: 'top' },
          '50%': { opacity: '1', transform: 'scaleY(1)', transformOrigin: 'top' },
          '100%': { opacity: '0', transform: 'scaleY(1)', transformOrigin: 'bottom' },
        },
        rainbow: {
          "0%": { "background-position": "0%" },
          "100%": { "background-position": "200%" },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.6s ease forwards',
        slideUp: 'slideUp 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
        scrollLine: 'scrollLine 1.8s ease-in-out infinite',
        rainbow: "rainbow var(--speed, 2s) infinite linear",
      },
    },
  },
  plugins: [],
}