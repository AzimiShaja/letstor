/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "Sans-serif"],
        dancing: ["Dancing Script"],
        roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        primary: "#f0fdf4",
      },
    },
  },
  plugins: [],
};
