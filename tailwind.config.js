/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'medical-primary': '#108BFA',      // New Primary Blue
        'medical-secondary': '#732675',   // New Secondary Purple
        'medical-accent': '#FFC600',       // New Accent Mustard
        'medical-gray': '#696969',         // New Grey
        'medical-dark': '#0d73d9',         // Darker shade of new primary
        'medical-light': '#e7f3ff',        // Lighter shade of new primary
        'blue-purple': '#108BFA',
        'purple': '#732675',
        'mustard': '#FFC600',
        'grey': '#696969',
      },
      fontFamily: {
        sans: [
            'Montserrat', 
            'ui-sans-serif', 
            'system-ui', 
            '-apple-system', 
            'BlinkMacSystemFont', 
            '"Segoe UI"', 
            'Roboto', 
            '"Helvetica Neue"', 
            'Arial', 
            '"Noto Sans"', 
            'sans-serif', 
            '"Apple Color Emoji"', 
            '"Segoe UI Emoji"', 
            '"Segoe UI Symbol"', 
            '"Noto Color Emoji"'
        ],
      },
    },
  },
  plugins: [],
}
