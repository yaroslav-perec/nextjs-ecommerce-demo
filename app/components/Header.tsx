'use client';

import Link from 'next/link';
import { useCart } from '@/store/cart';

export default function Header() {
    const count = useCart((s) => s.totalCount());
    const displayCount = count > 999 ? '999+' : count;

    return (
        <header className="border-b border-zinc-200 dark:border-zinc-800">
            <div className="container flex items-center justify-between py-4 px-4 sm:px-6">
                <Link href="/" className="font-semibold text-lg tracking-tight">
                    Next.js E-commerce Demo
                </Link>

                <nav className="flex items-center gap-6">
                    <Link href="/" className="hover:underline">
                        Home
                    </Link>

                    {/* Inline badge inside button layout */}
                    <Link
                        href="/cart"
                        className="flex items-center gap-2 hover:underline"
                    >
                        <span>Cart</span>

                        {count > 0 && (
                            <span
                                className="
									inline-flex h-[18px] min-w-[22px] items-center justify-center
									rounded-full bg-zinc-900 px-1.5 text-[11px] font-semibold leading-none text-white
									dark:bg-zinc-100 dark:text-zinc-900
									tabular-nums
								"
                            >
                                {displayCount}
                            </span>
                        )}
                    </Link>
                </nav>
            </div>
        </header>
    );
}
