/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "indigo-800": "#1E3A8A",
        "indigo-500": "#6366F1",
        "gray-100": "#F3F4F6",
        "gray-800": "#1F2937",
        "indigo-600": "#4F46E5",
      },
    },
  },
  plugins: [],
};
