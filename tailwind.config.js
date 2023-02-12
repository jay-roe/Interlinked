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
      },
      container: {
        padding: {
          DEFAULT: '2rem',
        },
      },
      fontFamily: {
        logo: 'Orbitron',
        'para-heavy': 'Paralucent-Heavy',
      },
      gridTemplateColumns: {
        '2-1': '2fr 1fr',
      },
    },
  },
  plugins: [],
};
