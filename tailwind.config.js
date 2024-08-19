/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        lg: "992px",
      },
      container: {
        center: true,

        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },
      colors: {
        primary: "#3498db",
        primary1: "#1f3e72",
        black: "#131110",
        blue: "#4066ff",
        lightBlue: "#eeeeff",
        secondary: "var(--secondary)",
        som: "rgba(128, 128, 128, 0.143)",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
