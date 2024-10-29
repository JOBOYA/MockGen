/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'scanning-light': 'scanning 1s cubic-bezier(0.4, 0, 0.2, 1) infinite',
      },
      keyframes: {
        scanning: {
          '0%': { transform: 'translateX(-300%)' },
          '100%': { transform: 'translateX(300%)' },
        },
      },
      fontFamily: {
        'space-grotesk': ['Space Grotesk', 'sans-serif'],
      },
    },
  },
  plugins: [],
};