/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      boxShadow: {
        cShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
      },
    },
  },
  plugins: [],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
};
