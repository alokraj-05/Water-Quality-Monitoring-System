const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        syne: ['"Syne",serif', ...defaultTheme.fontFamily.serif],
        poppins: ['"Poppins",serif', ...defaultTheme.fontFamily.serif],
      },
      borderWidth: {
        hairline: "0.1px",
      },
    },
  },
  plugins: [],
};
