'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/store/cart';
import { formatCurrency } from '@/lib/api';
import AddToCartButton from '@/components/AddToCartButton';

export default function CartPage() {
    const {
        items,
        remove,
        clear,
        totalCount,
        subtotal,
        total,
        totalSavings,
        getItemTotal,
    } = useCart();

    const count = totalCount();
    const sub = subtotal();
    const tot = total();
    const saved = totalSavings();

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold">Your Cart</h1>

            {items.length === 0 ? (
                <div className="rounded-xl border border-dashed p-6 text-center text-zinc-500 dark:border-zinc-800">
                    Your cart is empty.{' '}
                    <Link href="/" className="underline">
                        Continue shopping
                    </Link>
                    .
                </div>
            ) : (
                <>
                    {/* --- Cart Items --- */}
                    <ul className="space-y-4">
                        {items.map((item) => {
                            const discount = item.discountPercentage ?? 0;
                            const hasDiscount = discount >= 0.5;
                            const itemTotal = getItemTotal(item.id);

                            const displayDiscount = discount < 1
                                ? discount.toFixed(2)
                                : discount.toFixed(0);

                            const discountedPrice = item.price * (1 - discount / 100);

                            return (
                                <li
                                    key={item.id}
                                    className="flex items-center gap-4 rounded-xl border p-3 dark:border-zinc-800"
                                >
                                    {/* Thumbnail */}
                                    <div className="relative h-20 w-24 overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-900">
                                        <Image
                                            src={item.thumbnail}
                                            alt={item.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    {/* Title & Prices */}
                                    <div className="flex-1">
                                        <div className="font-medium">{item.title}</div>

                                        <div className="flex items-baseline gap-2 text-sm text-zinc-500">
                                            <span>{formatCurrency(discountedPrice)}</span>

                                            {hasDiscount && (
                                                <>
                                                    <span className="line-through text-zinc-400">
                                                        {formatCurrency(item.price)}
                                                    </span>
                                                    <span className="text-emerald-600 font-medium text-xs">
														-{displayDiscount}%
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    {/* Quantity */}
                                    <AddToCartButton
                                        id={item.id}
                                        title={item.title}
                                        price={item.price}
                                        thumbnail={item.thumbnail}
                                        qty={item.quantity}
                                        discountPercentage={item.discountPercentage}
                                        bordered={false}
                                    />

                                    {/* Item Total */}
                                    <div className="w-24 text-right font-semibold">
                                        {formatCurrency(itemTotal)}
                                    </div>

                                    {/* Remove Button */}
                                    <button
                                        onClick={() => remove(item.id)}
                                        className="cursor-pointer rounded-lg border px-3 py-1 text-sm hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
                                    >
                                        Remove
                                    </button>
                                </li>
                            );
                        })}
                    </ul>

                    {/* --- Totals --- */}
                    <div className="flex items-center justify-between rounded-xl border p-4 dark:border-zinc-800">
                        <div className="text-sm text-zinc-600 dark:text-zinc-400">
                            Items: <span className="font-medium">{count}</span>
                        </div>
                        <div className="text-right">
                            <div className="text-xl font-semibold">
                                Total: {formatCurrency(tot)}
                            </div>

                            {saved > 0 && (
                                <>
                                    <div className="text-sm text-zinc-600">
                                        Subtotal: {formatCurrency(sub)}
                                    </div>
                                    <div className="text-sm text-emerald-600">
                                        You saved {formatCurrency(saved)} 🎉
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* --- Actions --- */}
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
                </>
            )}
        </div>
    );
}
