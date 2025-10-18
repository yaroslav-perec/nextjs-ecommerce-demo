import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

export default {
    content: [
        './app/**/*.{ts,tsx,mdx}',
        './components/**/*.{ts,tsx}',   // optional but common
        './content/**/*.{md,mdx}',
    ],
    theme: { extend: {} },
    plugins: [typography],
} satisfies Config;
