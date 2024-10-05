/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
    colors: {
      'juripass': '#253261',
      'white' : '#ffffff',
      'black' : '#000000',
      'red': "#880303",
      'slate-100': 'rgba(241,245,249,0.7)',
      'border-grey': "#e5e7eb",
    }
  },
  plugins: [],
  presets: [require('full-palette')]
}