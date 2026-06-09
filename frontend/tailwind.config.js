/********  Tailwind Config  ********/ 
/** Do not add/delete comments **/
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
        serif: ['Lora', 'serif'],
        mono: ['Space Mono', 'monospace'],
      },
      colors: {
        background: {
          DEFAULT: '#060816',
          subtle: '#0B1020',
        },
        primary: '#00D4FF',
        secondary: '#7C3AED',
        success: '#22C55E',
      },
      boxShadow: {
        glass: '0 8px 32px rgba(0, 212, 255, 0.12)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
