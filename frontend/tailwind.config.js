/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        buttonBlue: '#3490dc',
        red: 'red',
        lavender: '#a89edd',
        grey: '#333333'
      },
    },
  },
  plugins: [],
}

