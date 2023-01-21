/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: ['class', '[data-mode="dark"]'],
  theme: {
    extend: {
      screens: {
        xs: '590px',
        xxs: '440px',
      },
    },
    container: {
      container: false,
    },
  },
  plugins: [],
}
