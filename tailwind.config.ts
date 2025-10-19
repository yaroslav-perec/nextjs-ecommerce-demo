import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
    darkMode: 'class',
    content: [
        './app/**/*.{ts,tsx,mdx}',
        './components/**/*.{ts,tsx}',   // optional but common
        './content/**/*.{md,mdx}',
    ],
    theme: { extend: {} },
    plugins: [typography],
};

export default config;
