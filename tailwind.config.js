/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366f1',
          dark: '#4338ca',
        },
        corruption: {
          low: '#22c55e',
          medium: '#eab308',
          high: '#ef4444',
        }
      },
      fontFamily: {
        game: ['"Press Start 2P"', 'cursive'],
      }
    },
  },
  plugins: [],
}