/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{tsx,ts,html}"],
  theme: {
    extend: {
      fontFamily: {
        'regular-font': ['Regular-font'],
        'medium-font': ['Medium-font'],
        'light-font': ['Light-font'],
      },
      margin: {
        '-1r': '-1rem',
      },
      keyframes: {
        button: {
          '0%': {
            transform: 'scale(5) rotate(0deg)',
            backgroundImage: 'conic-gradient($color 80%, white 90%)'
          },
          '99%': {
            transform: 'scale(5) rotate(360deg)',
            backgroundImage: 'conic-gradient($col2 80%, white 90%)'
          },
          '100%': {
            transform: 'scale(5) rotate(360deg)',
            backgroundIimage: 'conic-gradient($col2 100%, white 0%)'
          }
        },
        loading: {
          '0%': {
            transform: 'scale(5) rotate(0deg)',
          },
          '100%': {
            transform: 'scale(5) rotate(360deg)'
          }
        }
      },
      animation: {
        button: 'button 750ms forwards ease-in-out',
        loading: 'loading 750ms forwards infinite linear'
      }
    },
    backgroundSize: {
      '50%': '50%',
    }
  },
  plugins: [],
}
