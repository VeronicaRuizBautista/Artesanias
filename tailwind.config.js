/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx, html}",
  ],
  theme: {
    extend: {
      colors: {
        "FFA800": "#FFA800",
        "703A31": "#703A31",
        "2E1108": "#2E1108",
        "blanco": "#FFFFFF",
        "2E1108": "#2E1108",
        "9D1A1A": "#9D1A1A",
        "00000080": "#00000080",
        "2E1108": "#2E1108",
        "9D1A1A80": "#9D1A1A80",
        "2E1108": "#2E1108",
        "000000": "#000000",
      },
      keyframes: {
        fade: {
          '0%, 100%': { opacity: 0 },
          '50%': { opacity: 1 },     
        },
      },
      animation: {
        'fade-in-out': 'fade 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}