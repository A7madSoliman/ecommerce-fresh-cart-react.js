const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    container: {
      center: true,
      screens: {
        sm: "600px",
        md: "728px",
        lg: "960px",
        xl: "1220px",
        "2xl": "1380px",
      },
    },
    extend: {
      colors: {
        primary: "#0aad0a",
      },
      fontFamily: {
        Encode: "Encode Sans Expanded",
        cairo: `"Cairo", sans-serif`,
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
