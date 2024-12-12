import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#FCEED9',
          100: '#FCCBA2',
          200: '#FDB167',
          300: '#F99C41',
        },
        primary: {
          DEFAULT: '#F99C41',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#FDB167',
          foreground: '#ffffff',
        },
        background: '#ffffff',
        foreground: '#333333',
        muted: {
          DEFAULT: '#FCEED9',
          foreground: '#666666',
        },
        accent: {
          DEFAULT: '#FCCBA2',
          foreground: '#333333',
        },
        border: '#FCCBA2',
      },
    },
  },
  plugins: [],
}

export default config