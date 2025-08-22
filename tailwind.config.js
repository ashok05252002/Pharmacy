/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'medical-primary': '#118BFA',    // New Primary Blue
        'medical-secondary': '#0EA5E9', // Sky 500 (Existing - can keep as a lighter blue accent)
        'medical-accent': '#3B82F6',    // Blue 500 (Existing - can keep as another blue accent)
        'medical-dark': '#0D6EFD',      // Darker shade of new primary (e.g., Bootstrap's primary dark)
        'medical-light': '#E7F3FF',     // Lighter shade of new primary (e.g., a very light blue)
        'medical-gray': '#6B7280',      // Gray 500 (Existing)
      },
      fontFamily: {
        sans: [
            // Reverted to Tailwind's default sans-serif stack by removing 'Inter'
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
