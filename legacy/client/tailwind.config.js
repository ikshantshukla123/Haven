/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-pink': '#FF7F96', // A vibrant, appealing pink for buttons/accents
        'secondary-pink': '#FF9EB5', // A slightly lighter pink for hover states
        'card-bg': '#FDF9F6',    // Soft, warm cream for cards and containers
        'bg-base': '#F8F1EC',    // A slightly warmer off-white for the main background
        'text-brown': '#3F2C2C', // Rich, elegant brown for all text
        'border-soft': '#E6E0D8', // A soft border color
        'subtle-gray': '#9CA3AF',  // Soft gray for secondary text
      },
      fontFamily: {
        stylish: ['Playfair Display', 'serif'], // Elegant, serif font for headings
        sans: ['Inter', 'sans-serif'], // Or any clean sans-serif for body text
      }
    },
  },
  plugins: [],
};