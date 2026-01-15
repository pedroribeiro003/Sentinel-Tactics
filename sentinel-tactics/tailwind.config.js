/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0B0E14",
        surface: "#121826",
        accent: "#2A3F5F",
        accentHover: "#314A6E",
        highlight: "#3A5A86",
        textPrimary: "#E6E8EC",
        textSecondary: "#A3A8B3",
      },
    },
  },
  plugins: [],
};
