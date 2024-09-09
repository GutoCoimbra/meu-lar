import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        "xs-custom": "330px", // Adiciona uma nova largura máxima personalizada
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      listStyleType: {
        square: "square",
        circle: "circle",
        lowerRoman: "lower-roman",
        upperRoman: "upper-roman",
      },
    },
  },
  plugins: [],
};

export default config;
