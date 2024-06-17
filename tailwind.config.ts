import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#915eff",
      },
      boxShadow: {
        "card": "0 0 15px",
      },
      backgroundImage: {
        "hero-pattern": "url('/herobg.png')",
      },
    },
  },
  plugins: [],
};
export default config;
