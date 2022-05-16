const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'fuzz': "url(/fuzz.png)",
      },
      colors: {
        'myred': '#ff0000',
        'mycream': "#fef8ee"
      },
      boxShadow: {
        'neuouter': '0px -6px 10px rgba(255, 255, 255, 1), 0px 4px 15px rgba(0, 0, 0, 0.15)'
      },
      fontFamily: {
        'nunito': ['Nunito', ...defaultTheme.fontFamily.serif]
      },
      borderWidth: {
        '20': '20px'
      }
    }
  },
  plugins: [],
}