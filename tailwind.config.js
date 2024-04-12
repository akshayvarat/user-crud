/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // Adjust paths based on your Angular project structure
    "./node_modules/primeng/**/*.{html,ts}", // Include PrimeNG components if used
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}