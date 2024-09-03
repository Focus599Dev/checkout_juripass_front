/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,tsx}",
  ],
  theme: {
    extend: {
    },
    colors: {
      'juripass': '#253261',
      'white' : '#ffffff',
      'black' : '#000000',
      'red': "#880303",
      'slate-100': 'rgba(241,245,249,0.7)',
      'border-grey': "#e5e7eb",
      'gray-200': "#4b5563",
      'gray-700': "rgba(0,0,0,0.3)",
      'green-100': "rgb(220,252,231)",
      'green-500': "rgb(34,197,94)",
    }
  },
  plugins: [],
  
}