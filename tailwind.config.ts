import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: [
          "var(--font-pretendard)",
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          "Roboto",
          "Helvetica\\ Neue",
          "Segoe\\ UI",
          "Apple\\ SD\\ Gothic\\ Neo",
          "Noto\\ Sans\\ KR",
          "Malgun\\ Gothic",
          "Apple\\ Color\\ Emoji",
          "Segoe\\ UI\\ Emoji",
          "Segoe\\ UI\\ Symbol",
          "sans-serif",
        ],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {},
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
