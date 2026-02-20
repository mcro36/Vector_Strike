/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'tactical-dark': '#0f172a',
        'tactical-light': '#1e293b',
        'tactical-cyan': '#06b6d4',
        'tactical-neon': '#2dd4bf',
        'tactical-alert': '#f97316',
        'tactical-general': '#334155'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
