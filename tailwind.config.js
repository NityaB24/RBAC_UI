/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#181818",
        primary: "#c5c3d5",
        secondary: "#262b34",
      },
    },
  },
  plugins: [],
};
