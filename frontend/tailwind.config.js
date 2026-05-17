/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.93)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        slideIn: 'slideIn 0.35s ease-out',
        fadeIn: 'fadeIn 0.25s ease-out',
        scaleIn: 'scaleIn 0.3s ease-out',
      },
      colors: {
        primary: {
          DEFAULT: '#f97316', // orange-500
          light: '#fdba74',   // orange-300
          dark: '#ea580c',    // orange-600
        },
        secondary: {
          DEFAULT: '#facc15', // yellow-400
          light: '#fef08a',   // yellow-200
        },
        cream: {
          DEFAULT: '#fdf6ec',
          dark: '#f5e6d0',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
