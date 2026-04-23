/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#c9a227',
          dark: '#a8841f',
        },
        corruption: {
          low: '#22c55e',
          medium: '#eab308',
          high: '#ef4444',
        },
        dark: {
          bg: '#0a0a0f',
          card: '#151520',
          border: '#2a2a3a',
          hover: '#1f1f2e',
        },
        rarity: {
          common: '#6b7280',
          uncommon: '#22c55e',
          rare: '#3b82f6',
          epic: '#a855f7',
          legendary: '#eab308',
        }
      },
      fontFamily: {
        game: ['"Press Start 2P"', 'cursive'],
      }
    },
  },
  plugins: [],
}