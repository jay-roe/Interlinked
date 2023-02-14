/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'purple-background': '#130921',
        'accent-orange': '#E58F40',
        'purple-component': '#2F273C',
      },
      container: {
        padding: {
          DEFAULT: '2rem',
        },
      },
      fontFamily: {
        logo: 'Orbitron',
        'para-heavy': 'Paralucent-Heavy',
        'para-med': 'Paralucent-Medium',
      },
    },
  },
  plugins: [],
};
