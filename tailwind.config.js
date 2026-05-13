/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ocean: "#18B7B1",
        ink: "#123A3D",
        palm: "#0B0B0A",
        aqua: "#DDF5F2",
        sand: "#C99B62",
        foam: "#FFF9F0",
        dune: "#F4E9D7",
        coral: "#F47C5D",
      },
      boxShadow: {
        soft: "0 24px 70px rgba(18, 58, 61, 0.14)",
        card: "0 12px 36px rgba(18, 58, 61, 0.10)",
      },
      fontFamily: {
        display: ["Inter", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

