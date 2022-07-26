/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "node_modules/daisyui/dist/**/*.js"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#53dba9",
          secondary: "#ef7fb3",
          accent: "#3affeb",
          neutral: "#374151",
          "base-100": "#1f2937",
          info: "#A5D7E9",
          success: "#1CB591",
          warning: "#B96704",
          error: "#F47C71",
        },
      },
    ],
  },
};
