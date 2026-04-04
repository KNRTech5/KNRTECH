import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00FF94",
        darkbg: "#0D0D0D",
        darkgreen: "#0F3D2E",
        lightgray: "#A0A0A0",
      },
    },
  },
  plugins: [],
};

export default config;
