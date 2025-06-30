
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#C4B5FD',
          DEFAULT: '#8B5CF6',
          dark: '#7C3AED',
          gradient: {
            from: '#8B5CF6',
            to: '#A855F7'
          }
        },
        accent: {
          DEFAULT: '#51D6CA',
          light: '#7EDDD5',
          dark: '#2DD4BF'
        },
        background: {
          primary: '#111827',
          secondary: '#1F2937',
          light: '#F9FAFB'
        }
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(135deg, #8B5CF6 0%, #A855F7 100%)',
        'primary-gradient-light': 'linear-gradient(135deg, #C4B5FD 0%, #DDD6FE 100%)',
      }
    },
  },
  plugins: [],
}
