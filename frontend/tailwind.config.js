/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-dark': '#020617',
        'brand-surface': '#0f172a',
        'brand-accent': '#ff3131',
        'brand-warning': '#f59e0b',
        'brand-success': '#39ff14',
        'brand-info': '#00d2ff',
        'brand-purple': '#bc13fe',
        'neon-red': '#ff3131',
        'neon-blue': '#00d2ff',
        'neon-green': '#39ff14',
        'neon-purple': '#bc13fe',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 10s linear infinite',
      }
    },
  },
  plugins: [],
}
