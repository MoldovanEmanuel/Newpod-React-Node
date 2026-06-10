import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink:     '#0f1a0d',
        ink2:    '#1c2e19',
        green:   '#1e6b3a',
        green2:  '#2a8f4f',
        lime:    '#6cc04a',
        orange:  '#f4752a',
        orange2: '#f9a25c',
        cream:   '#f7f4ef',
        paper:   '#ffffff',
        muted:   '#536052',
        border:  '#dde5db',
      },
      fontFamily: {
        sans: ['"DM Sans"', 'sans-serif'],
      },
      boxShadow: {
        card: '0 8px 40px rgba(15,26,13,0.10)',
        btn:  '0 2px 12px rgba(108,192,74,0.30)',
      },
      keyframes: {
        blink: {
          '0%,100%': { opacity: '1' },
          '50%':     { opacity: '0.3' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(18px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          from: { transform: 'translateX(100%)' },
          to:   { transform: 'translateX(0)' },
        },
      },
      animation: {
        blink:    'blink 2s ease-in-out infinite',
        fadeUp:   'fadeUp 0.45s ease both',
        slideIn:  'slideIn 0.4s cubic-bezier(0.77,0,0.18,1) both',
      },
    },
  },
  plugins: [],
} satisfies Config;
