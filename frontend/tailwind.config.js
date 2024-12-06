/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      xs: "25.10rem", // 324px
      sm: "36rem", // 576px
      md: "48rem", // 768px
      lg: "62rem", // 992px
      xl: "75rem", // 1200px
      xxl: "93.75rem", // 1400px
    },
    extend: {
      colors: {
        primary: "#FDF001",
        secondary: "#fffccc",
        accent: "#D9D9D9",
        neutral: "#E8E8E8",
        base: "#ffffff",
        dark: "#000000"
      },
    },
  },
  plugins: [
    require("daisyui"),
  ],
  daisyui: {
    themes: [{
      myTheme: {
        primary: "#FDF001",
        secondary: "#fffccc",
        accent: "#D9D9D9",
        neutral: "#E8E8E8",
        "base-100": "#ffffff",
        dark: "#000000"
      }
    }],
    base: true,
    styled: true,
    utils: true,
    prefix: "",
    logs: true,
    themeRoot: ":root",
  },
};
