/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Sora', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        dark: {
          950: '#050508',
          900: '#0a0a0f',
          800: '#111118',
          700: '#1a1a24',
          600: '#22222f',
          500: '#2e2e3e',
        },
        accent: {
          DEFAULT: '#6c63ff',
          light: '#8b85ff',
          dark: '#4f46e5',
          glow: 'rgba(108,99,255,0.3)',
        },
        neon: {
          green: '#00ffaa',
          blue: '#00d4ff',
          pink: '#ff6b9d',
        },
        surface: {
          DEFAULT: '#13131c',
          raised: '#1c1c28',
          overlay: '#242433',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'mesh': 'radial-gradient(at 40% 20%, hsla(252,100%,74%,0.1) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(189,100%,56%,0.07) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(355,100%,93%,0.05) 0px, transparent 50%)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(108,99,255,0.4)',
        'glow-sm': '0 0 10px rgba(108,99,255,0.25)',
        'card': '0 4px 24px rgba(0,0,0,0.4)',
        'neon': '0 0 30px rgba(108,99,255,0.5), 0 0 60px rgba(108,99,255,0.2)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease forwards',
        'slide-up': 'slideUp 0.4s ease forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'spin-slow': 'spin 2s linear infinite',
        'shimmer': 'shimmer 1.5s infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
