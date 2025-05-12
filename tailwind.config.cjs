/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    'bg-green-500',
    'border-green-700',
    'bg-white',
    'border-gray-300',
    'scale-105',
    'shadow-lg',
    'opacity-80',
    'hover:ring-2',
    'hover:ring-blue-400',
    'hover:z-10'
  ],
} 