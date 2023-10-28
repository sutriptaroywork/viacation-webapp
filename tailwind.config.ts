import type { Config } from 'tailwindcss'
const { nextui } = require("@nextui-org/react");

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: {
          DEFAULT: '#61457a',
          100: "#edddfc",
          200: "#e4c7ff",
          300: "#c8a4e9",
          400: "#916eb1",
          500: "#9a6bc4",
          600: "#61457a",
          700: "#7d49ab",
          800: "#6c4f85",
          900: "#423052"
        },
        secondary: '#c8a4e9',
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}
export default config
