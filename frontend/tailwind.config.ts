import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Aptos', 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', 'sans-serif']
      },
      boxShadow: {
        panel: '0 22px 70px color-mix(in oklch, var(--shadow-color) 40%, transparent)'
      }
    }
  },
  plugins: []
} satisfies Config;
