/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#BEF264', // Green
        secondary: '#D6DFD4', // gray
        body: '#1E2530', // dark gray
        hoverColor: '#acea42'
      },
    },
  },
  plugins: [],
}

