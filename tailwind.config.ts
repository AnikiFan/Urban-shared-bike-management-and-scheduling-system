import type { Config } from 'tailwindcss';
const {nextui} = require("@nextui-org/react");
const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
    darkMode:"class",
  theme: {
    extend: {
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
      },
      colors: {
        blue: {
          400: '#2589FE',
          500: '#0070F3',
          600: '#2F6FEB',
        },
      },
      fontFamily:{
        sans:["var(--font-sans)"],
        serif:["var(--font-serif)"],
      }
    },
    keyframes: {
      shimmer: {
        '100%': {
          transform: 'translateX(100%)',
        },
      },
    },
  },
  plugins: [
      require('@tailwindcss/forms'),
      nextui({
            prefix: "nextui", // prefix for themes variables
            addCommonColors: false, // override common colors (e.g. "blue", "green", "pink").
            defaultTheme: "light", // default theme from the themes object
            defaultExtendTheme: "light", // default theme to extend on custom themes
            layout: {}, // common layout tokens (applied to all themes)
            themes: {
              light: {
                layout: {}, // light theme layout tokens
                colors: {}, // light theme colors
              },
              dark: {
                layout: {}, // dark theme layout tokens
                colors: {}, // dark theme colors
              },
              // ... custom themes
            },
      })
  ],
};
export default config;
