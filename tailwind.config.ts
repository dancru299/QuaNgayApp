import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#171417",
        "ink-soft": "#5f5660",
        paper: "#fbfaf7",
        coral: "#dc4a4a",
        mint: "#0f8f7a",
        honey: "#c5882d",
        line: "#e9e1da"
      },
      boxShadow: {
        soft: "0 18px 50px rgba(23, 20, 23, 0.08)",
        lift: "0 18px 36px rgba(23, 20, 23, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
