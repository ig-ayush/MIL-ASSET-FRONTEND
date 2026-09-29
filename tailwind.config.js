/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        military: "#3F6212",
        charcoal: "#1F2937",
        surface: "#F5F7F2",
        accent: "#84CC16"
      },
      boxShadow: {
        soft: "0 8px 30px rgba(31,41,55,.06)"
      }
    }
  },
  plugins: []
};