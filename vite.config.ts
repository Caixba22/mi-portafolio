// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  darkMode: "class", 
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00b4ff",
        secondary: "#38bdf8",
        accent: "#14b8a6",
        backgroundDark: "#0b0f1a",
        backgroundLight: "#e5eef5",
      },
    },
  },
  plugins: [],
} satisfies Config;
