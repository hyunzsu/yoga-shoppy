/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#222222',
      },
      backgroundImage: {
        banner: `url('../public/images/banner.svg')`,
      },
    },
  },
  plugins: [],
};
