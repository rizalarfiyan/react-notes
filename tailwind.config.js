/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      screens: {
        xs: '480px',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '0.75rem',
        },
      },
    },
  },
  plugins: [],
}
