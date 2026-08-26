/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F3F0EA',
        ink: '#131110',
        accent: '#C4472B',
        'accent-soft': '#E0714F',
      },
      fontFamily: {
        display: ["'Anton'", 'Impact', 'sans-serif'],
        sans: ["'Instrument Sans'", 'Helvetica', 'Arial', 'sans-serif'],
        mono: ["'IBM Plex Mono'", 'ui-monospace', 'monospace'],
      },
      opacity: {
        12: '0.12',
      },
      letterSpacing: {
        label: '0.13em',
        tight2: '-0.015em',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shine: {
          '0%': { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
        auroraDrift: {
          '0%,100%': { transform: 'translate3d(-6%, -4%, 0) scale(1)' },
          '50%': { transform: 'translate3d(6%, 6%, 0) scale(1.18)' },
        },
        floaty: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        starBorder: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        marquee: 'marquee 32s linear infinite',
        shine: 'shine 4s linear infinite',
        auroraDrift: 'auroraDrift 18s ease-in-out infinite',
        floaty: 'floaty 6s ease-in-out infinite',
        starBorder: 'starBorder 6s linear infinite',
      },
    },
  },
  plugins: [],
}
