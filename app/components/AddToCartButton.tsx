'use client';

import { useCart } from '@/store/cart';

export default function AddToCartButton({
    id,
    title,
    price,
    thumbnail,
    qty = 1,
}: {
	id: number;
	title: string;
	price: number;
	thumbnail: string;
	qty?: number;
}) {
    const add = useCart((s) => s.add);
    return (
        <button
            onClick={() => add({ id, title, price, thumbnail }, qty)}
            className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 dark:bg-zinc-100 dark:text-zinc-900"
        >
			Add to Cart
        </button>
    );
}