/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "3d": "0 4px 0",
      },
      fontFamily: {
        mono: ["Roboto Mono", "monospace"],
      },
      colors: {
        dark: "#302419",
        light: "#F7F7F9",
        accent: "#CC141C",
        main: "#F9F5F1",
        // theme: {
        // },
      },
    },
  },
  plugins: [],
};
