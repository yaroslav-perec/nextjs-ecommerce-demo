'use client';

import Link from 'next/link';
import { useCart } from '@/store/cart';

export default function Header() {
    const count = useCart((s) => s.totalCount());

    return (
        <header className="border-b border-zinc-200 dark:border-zinc-800">
            <div className="container flex items-center justify-between py-4">
                <Link href="/" className="font-semibold text-lg tracking-tight">
					Next.js E-commerce Demo
                </Link>
                <nav className="flex items-center gap-6">
                    <Link href="/" className="hover:underline">Home</Link>
                    <Link href="/cart" className="relative inline-flex items-center hover:underline">
                        <span>Cart</span>
                        <span className="ml-2 inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-zinc-900 px-2 text-xs text-white dark:bg-zinc-100 dark:text-zinc-900">
                            {count}
                        </span>
                    </Link>
                </nav>
            </div>
        </header>
    );
}