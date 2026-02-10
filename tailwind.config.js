/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        romantic: "#ff4d6d",
        darkbg: "#0f0f0f",
        softpink: "#ffc2d1",
      },
      fontFamily: {
        heading: ["Great Vibes", "cursive"],
        body: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 20px rgba(255, 77, 109, 0.6)",
      },
    },
  },
  plugins: [],
};
