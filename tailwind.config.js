/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          base: '#111213',
          surface: '#1a1b1e',
          raised: '#212326',
          overlay: '#282a2d',
          border: '#2e3033',
        },
        text: {
          primary: '#dde1e7',
          secondary: '#9ba3af',
          muted: '#606874',
          accent: '#22d3ee',
        },
        accent: {
          DEFAULT: '#0891b2',
          bright: '#22d3ee',
          dim: '#075985',
        },
        warn: '#b45309',
        success: '#059669',
        illustrative: '#7c3aed',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Menlo', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.65rem', { lineHeight: '1rem' }],
      },
    },
  },
  plugins: [],
}
