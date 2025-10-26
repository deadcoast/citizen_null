/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Punk Zine Core Colors
        cream: {
          DEFAULT: '#faf7f0',
          dark: '#e8e3d5',
        },
        'ink-black': '#1a1a1a',
        'pure-black': '#000000',
        
        // Accent Colors (use sparingly)
        'punk-red': {
          DEFAULT: '#8b0000',
          light: '#a83232',
        },
        rust: '#cc5500',
        mustard: '#d4a017',
        
        // Grayscale (photocopy quality)
        'dark-gray': '#2b2b2b',
        'mid-gray': '#666666',
        'light-gray': '#999999',
        'barely-gray': '#d9d9d9',
        
        // Star Citizen Tech Colors (for map)
        'sc-cyan': '#00ffff',
        'sc-blue': '#87CEEB',
      },
      fontFamily: {
        mono: ['Courier New', 'monospace'],
        sans: ['Arial', 'Helvetica', 'sans-serif'],
      },
      borderWidth: {
        '3': '3px',
      },
      spacing: {
        'tight': '4px',
        'normal': '8px',
        'loose': '16px',
        'spacious': '32px',
      },
    },
  },
  plugins: [],
}
