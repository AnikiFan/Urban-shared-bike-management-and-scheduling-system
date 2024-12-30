import type {Config} from 'tailwindcss';

const {nextui} = require("@nextui-org/react");
const config: Config = {
    content: [
        './src/**/*.{js,ts,jsx,tsx,mdx}',
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                blue: {
                    400: '#2589FE',
                    500: '#0070F3',
                    600: '#2F6FEB',
                },
            },
            fontFamily: {
                sans: ["var(--font-sans)"],
                serif: ["var(--font-serif)"],
            }
        },
    },
    darkMode: "class",
    plugins: [
        nextui()
    ],
};
export default config;
