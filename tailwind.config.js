module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        green: 'hsla(160, 100%, 37%, 1)',
        white: '#ffffff',
        black: '#000000',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}