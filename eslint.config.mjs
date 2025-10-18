// eslint.config.mjs
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const config = [
    // ✅ put ignores in the *first* config object
    {
        ignores: [
            "**/node_modules/**",
            "**/.next/**",
            "out/**",
            "build/**",
            "dist/**",
            ".vercel/**",
            ".idea/**",
            ".vscode/**",
            "next-env.d.ts",
            "*.config.js",
            "*.config.ts",
        ],
    },

    ...compat.extends("next/core-web-vitals", "next/typescript"),

    {
        rules: {
            semi: ["error", "always"],
            indent: ["error", 4],
            "comma-dangle": ["error", "always-multiline"],
            "object-curly-spacing": ["error", "always"],
        },
    },
];

export default config;
