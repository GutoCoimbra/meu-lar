/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        custom: "360px", // Adiciona uma nova largura máxima personalizada
      },
      borderRadius: {
        full: "9999px", // Para garantir que o botão seja arredondado
      },
    },
  },
  plugins: [],
};
