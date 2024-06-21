/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        playWrite: ["Playwrite IS", 'cursive'],
        fira: ["Fira Sans Condensed", "serif"]
      }
    },
  },
  plugins: [],
}