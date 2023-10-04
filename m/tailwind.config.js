/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  // important: "#root",
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {
      height: {
        50: "200px",
      },
      width: {
        85: "342px",
        175: "700px",
      },

      colors: {
        primary: {
          100: "#cddddb",
          200: "#9bbab7",
          300: "#689893",
          400: "#36756f",
          500: "#04534b",
          600: "#03423c",
          700: "#02322d",
          800: "#02211e",
          900: "#01110f",
        },
        secondary: {
          100: "#d1defc",
          200: "#a2bdfa",
          300: "#749bf7",
          400: "#457af5",
          500: "#1759f2",
          600: "#1247c2",
          700: "#0e3591",
          800: "#092461",
          900: "#051230",
        },
        background: "#f2f2f2",
        sky: "#E9F6FF",
        danger: "#FC5A5A",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "1rem",
        },
      },
    },
    fontFamily: {
      sans: "IRANSans",
    },
  },

  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
  ],
};
