/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      height: {
        'chat-size': '80vh',
      },
      colors: {
        'purple-background': '#130921',
        'accent-orange': '#E58F40',
        'purple-component': '#2F273C',
        'purple-text-area': '#514A5B',
        'purple-message-area': '#494154',
        'light-white-text': '#d0ced3',
        'chat-text-input': '#726a81',
        'chat-input-secondary': '#484153',
      },
      container: {
        padding: {
          DEFAULT: '2rem',
        },
      },
      fontFamily: {
        sans: ['Paralucent', 'Helvetica Neue', ...defaultTheme.fontFamily.sans],
        logo: ['Orbitron', 'sans-serif'],
        'neue-machina': 'neue-machina',
      },
      gridTemplateColumns: {
        1: 'minmax(0, 1fr)',
        '2-1': 'minmax(0, 2fr) minmax(0, 1fr)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
