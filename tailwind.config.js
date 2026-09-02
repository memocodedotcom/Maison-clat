/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#FDFBF7',
          100: '#FAF6EF',
          200: '#F3EAD8',
          300: '#E6D7C3',
          400: '#D5C0A1',
          500: '#C5A059', // Champagne Gold
          600: '#A9833D',
          700: '#86642A',
          800: '#64481E',
          900: '#432F14',
        },
        ivory: {
          DEFAULT: '#FAF9F6',
          dark: '#F5F3EF',
          card: '#FFFFFF',
          border: '#E7E4DF',
        },
        charcoal: {
          50: '#F6F6F6',
          100: '#E7E7E7',
          400: '#78716C',
          700: '#44403C',
          800: '#292524',
          900: '#1C1917',
        },
        blush: {
          50: '#FDF7F7',
          100: '#F9ECEC',
          200: '#F3D5D5',
          500: '#E8C4C4',
          700: '#B87272',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 10px rgba(28, 25, 23, 0.03), 0 1px 3px rgba(28, 25, 23, 0.02)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.04)',
        'modal': '0 20px 40px rgba(0, 0, 0, 0.12)',
      }
    },
  },
  plugins: [],
}
