/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        hero: "url('/hero/house1.png')",
      },
      screens: {
        lg: "992px",
        xs: "425px",
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
        section: "#F6FBFF",
        black: "#131110",
        blue: "#4066ff",
        lightBlue: "#eeeeff",
        secondary: "var(--bluegradient)",
        som: "rgba(128, 128, 128, 0.143)",
        some: "rgba(120, 120, 120, 0.374)",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
