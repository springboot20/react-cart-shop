/**
 * @format
 * @type {import('tailwindcss').Config}
 */

const withMT = require('@material-tailwind/react/utils/withMT');
const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = withMT({
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/*.html'],
  darkMode: 'class',
  theme: {
    screens: {
      xs: '480px',
      ...defaultTheme.screens,
    },
    colors: {
      marineBlue: '#02295a',
      purplishBlue: '#473dff',
      pastelBlue: '#adbeff',
      lightBlue: '#bfe2fd',
      strawberryRed: '#ed3548',
      coolGray: '#9699ab',
      lightGray: '#d6d9e6',
      mangolia: '#f0f6ff',
      alabaster: '#fafbff',
      ...colors,
    },
    extend: {},
  },
  plugins: [require('autoprefixer'), require('@tailwindcss/aspect-ratio'), require('@tailwindcss/forms')],
});
