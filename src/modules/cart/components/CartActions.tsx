'use client';

import { useCart } from '../store/cart.store';

export function CartActions() {
    const { clear } = useCart();

    return (
        <div className="flex items-center gap-3">
            <button
                onClick={() => clear()}
                className="cursor-pointer rounded-xl border px-4 py-2 text-sm hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
            >
				Clear Cart
            </button>

            <button
                className="cursor-pointer rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
                disabled
                title="Checkout not implemented"
            >
				Checkout
            </button>
        </div>
    );
}
