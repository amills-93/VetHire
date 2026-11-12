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
          tint: '#F4F9F6',
          border: '#1E7E34',
          muted: '#49886E',
          subtle: '#A3CFBB'
        },
        'vh-red': {
          DEFAULT: '#D9534F',
          gauge: '#DE5246',
          light: '#FDE8E8',
          tint: '#FDF5F5',
          border: '#E2A9AF'
        },
        'vh-yellow': {
          DEFAULT: '#F0C419',
          gauge: '#F4CE42',
          light: '#FFF9DB',
          border: '#D99B00'
        },
        'vh-blue': {
          DEFAULT: '#2B78E4',
          dark: '#1E6091',
          focus: '#2B6CB0',
          light: '#EBF3FB'
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
