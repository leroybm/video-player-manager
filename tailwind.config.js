/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        app: "20rem 1fr",
        collapsed: "5rem 1fr", //for collapsed sidebar layout
      },
      clip: {
        "inset-100": "inset(100%)",
      },
      clipPath: {
        "rect-1": "rect(1px, 1px, 1px, 1px)",
      },
    },
  },
  plugins: [],
}
