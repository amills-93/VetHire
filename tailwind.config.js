/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './composables/**/*.{js,ts}',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue'
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#EFEFEA',
        surface: '#FFFFFF',
        'vh-green': {
          DEFAULT: '#237A3B',
          hover: '#1B6530',
          light: '#EAF7EE',
          border: '#1E7E34'
        },
        'vh-red': {
          DEFAULT: '#D9534F',
          light: '#FDE8E8',
          border: '#E2A9AF'
        },
        'vh-yellow': {
          DEFAULT: '#F0C419',
          light: '#FFF9DB',
          border: '#D99B00'
        },
        'vh-blue': {
          DEFAULT: '#2B78E4',
          dark: '#1E6091'
        },
        'vh-gray': {
          DEFAULT: '#A8ACA9',
          light: '#F5F5F3',
          border: '#CCCCCC'
        }
      },
      fontFamily: {
        mono: ['"Roboto Mono"', 'Courier New', 'ui-monospace', 'monospace'],
        sans: ['"Roboto Mono"', 'ui-monospace', 'monospace']
      }
    }
  },
  plugins: []
}
