'use client';

import Link from 'next/link';
import { useCart } from '@/store/cart';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Moon, Sun, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Header() {
    const count = useCart((s) => s.totalCount());
    const displayCount = count > 999 ? '999+' : count;

    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    return (
        <header className="sticky top-0 z-50 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur supports-[backdrop-filter]:backdrop-blur-md shadow-sm dark:shadow-zinc-900/20">
            <div className="container flex items-center justify-between py-3 px-4 sm:px-6">
                {/* --- Logo / Title --- */}
                <Link
                    href="/"
                    className="font-semibold text-lg tracking-tight text-zinc-900 dark:text-zinc-100 hover:opacity-80 transition"
                >
                    Next.js E-commerce Demo
                </Link>

                {/* --- Nav --- */}
                <nav className="flex items-center gap-3 sm:gap-5">
                    <Link
                        href="/"
                        className="hidden sm:inline text-sm font-medium text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white transition"
                    >
                        Home
                    </Link>

                    {/* --- Cart Icon + Badge (subtle pulse animation) --- */}
                    <Link
                        href="/cart"
                        className="relative flex items-center justify-center rounded-md p-2 transition hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:scale-[1.05] active:scale-[0.97]"
                        aria-label="Cart"
                    >
                        <ShoppingCart
                            className="h-[20px] w-[20px] text-zinc-800 dark:text-zinc-100"
                            strokeWidth={2}
                        />
                        {count > 0 && (
                            <motion.span
                                key={displayCount}
                                animate={{ scale: [1, 1.15, 1] }}
                                transition={{
                                    duration: 0.25,
                                    ease: 'easeInOut',
                                }}
                                className="
                                    absolute -top-1.5 -right-1.5 flex h-[18px] min-w-[20px] items-center justify-center
                                    rounded-full bg-zinc-900 px-1.5 text-[10px] font-semibold leading-none text-white
                                    dark:bg-zinc-100 dark:text-zinc-900 tabular-nums
                                "
                            >
                                {displayCount}
                            </motion.span>
                        )}
                    </Link>

                    {/* --- Theme Toggle --- */}
                    <button
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className="flex items-center justify-center rounded-md p-2 transition hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:scale-[1.05] active:scale-[0.97]"
                        aria-label="Toggle theme"
                    >
                        {theme === 'dark' ? (
                            <Sun className="h-[20px] w-[20px] text-yellow-400" />
                        ) : (
                            <Moon className="h-[20px] w-[20px] text-zinc-700" />
                        )}
                    </button>
                </nav>
            </div>
        </header>
    );
}
