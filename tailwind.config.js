const colors = require("tailwindcss/colors");
const { colors: defaultColors } = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ...defaultColors,
        gray: colors.neutral,
        rose: colors.rose,
        fuchsia: colors.fuchsia,
        indigo: colors.indigo,
        teal: colors.teal,
        emerald: colors.emerald,
        sky: colors.sky,
        lime: colors.lime,
        orange: colors.orange,
        cyan: colors.cyan,
        primary: colors.pink[600],
        secondary: "#4E9F3D",
        background: "#F5F5F5",
        dark: "#1D1D1D",
      },
      boxShadow: {
        homogen: "0 0 10px 3px rgba(0,0,0,0.5)",
      },
      brightness: {
        300: "3",
      },
    },
  },
  plugins: [],
};
