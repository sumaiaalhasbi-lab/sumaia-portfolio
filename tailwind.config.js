/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          light: '#ffffff',
          dark: '#000000',
        },
        card: {
          light: '#f8f9fa',
          dark: '#0d0d0d',
        },
        ink: {
          light: '#000000',
          dark: '#ffffff',
        },
        accent: {
          DEFAULT: '#f47b20',
          soft: '#fb923c',
          glow: '#ea580c',
        },
      },
      fontFamily: {
        cairo: ['"IBM Plex Sans Arabic"', '"Cairo"', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-rtl': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(50%)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(244, 123, 32, 0.45)' },
          '50%': { boxShadow: '0 0 24px 6px rgba(244, 123, 32, 0.55)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
        'marquee-rtl': 'marquee-rtl 28s linear infinite',
        'pulse-glow': 'pulse-glow 2.6s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        'fade-up': 'fade-up 0.6s ease-out both',
        'spin-slow': 'spin-slow 12s linear infinite',
      },
    },
  },
  plugins: [],
};
