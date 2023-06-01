/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [ "./src/**/*.{js,jsx,ts,tsx}"],
    darkMode: 'class',
    theme: {
      fontFamily: {
        display: ['Open Sans', 'sans-serif'],
        body: ['Open Sans', 'sans-serif'],
      },
      extend: {
        fontSize: {
          14: '14px',
        },
        backgroundColor: {
          'main-bg': '#FAFBFB',
          'main-dark-bg': '#20232A',
          'secondary-dark-bg': '#333',
          'light-gray': '#F7F7F7',
          'half-transparent': 'rgba(0, 0, 0, 0.5)',
          'hover-bg': 'rgba(209, 213, 219, 0.1)',
          'black-overlay-bg': 'rgba(0, 0, 0, 0.7)',
          'hover-light': 'rgba(0, 0, 0, 0.1)'
        },
        borderWidth: {
          1: '1px',
        },
        borderColor: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        width: {
          400: '400px',
          500: '500px',
          760: '760px',
          780: '780px',
          800: '800px',
          1000: '1000px',
          1200: '1200px',
          1400: '1400px',
        },
        height: {
          80: '80px',
        },
        minHeight: {
          590: '590px',
        },
      },
    },
    plugins: [],
  }
  