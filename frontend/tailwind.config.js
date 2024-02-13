/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        "500px": "500px",
        "360px": "360px",
      },
      height: {
        "400px": "400px",
      },
    },
  },
  plugins: [],
};
