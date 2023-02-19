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
        'purple-text-area': '#514A5B',
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
        'neue-machina': 'neue-machina',
      },
      gridTemplateColumns: {
        1: 'minmax(0, 1fr)',
        '2-1': 'minmax(0, 2fr) minmax(0, 1fr)',
      },
    },
  },
  plugins: [],
};
