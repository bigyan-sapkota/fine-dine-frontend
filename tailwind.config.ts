import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#F3274C",
        secondary: "#FFD50C",

        text: {
          primary: "#000101",
          secondary: "#868787",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
