'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/store/cart';
import { formatCurrency } from '@/lib/api';
import AddToCartButton from '@/components/AddToCartButton';
import { getDiscountedPrice } from '@/lib/pricing';

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
                            const discountedPrice = getDiscountedPrice(item.price, discount);
                            const hasDiscount = discount > 0;
                            const itemTotal = getItemTotal(item.id);

                            return (
                                <li
                                    key={item.id}
                                    className="rounded-xl border p-3 dark:border-zinc-800 flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-center sm:justify-between"
                                >
                                    {/* Left section: image + title */}
                                    <div className="flex gap-3 sm:gap-4 items-center">
                                        <div className="relative h-16 w-20 overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-900 flex-shrink-0">
                                            <Image
                                                src={item.thumbnail}
                                                alt={item.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>

                                        <div className="flex flex-col">
                                            <div className="font-medium text-zinc-900 dark:text-zinc-100 text-sm sm:text-base line-clamp-2">
                                                {item.title}
                                            </div>

                                            <div className="flex flex-wrap items-baseline gap-2 text-xs sm:text-sm text-zinc-500 mt-1">
                                                <span className="font-medium text-zinc-900 dark:text-zinc-100">
                                                    {formatCurrency(discountedPrice)}
                                                </span>

                                                {hasDiscount && (
                                                    <>
                                                        <span className="line-through text-zinc-400">
                                                            {formatCurrency(item.price)}
                                                        </span>
                                                        <span className="rounded-md bg-emerald-50 px-1 py-[1px] text-[11px] font-semibold text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400">
                                                            -{discount.toFixed(0)}%
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right section: qty + total + remove */}
                                    <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto mt-1 sm:mt-0">
                                        <AddToCartButton
                                            id={item.id}
                                            title={item.title}
                                            price={item.price}
                                            thumbnail={item.thumbnail}
                                            qty={item.quantity}
                                            discountPercentage={item.discountPercentage}
                                            bordered={false}
                                        />

                                        <div className="font-semibold text-sm sm:text-base whitespace-nowrap">
                                            {formatCurrency(itemTotal)}
                                        </div>

                                        <button
                                            onClick={() => remove(item.id)}
                                            className="rounded-lg border px-2 py-1 text-xs sm:text-sm hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
                                        >
                                            Remove
                                        </button>
                                    </div>
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
                                    <div className="text-sm text-zinc-600 dark:text-zinc-400">
                                        Subtotal: {formatCurrency(sub)}
                                    </div>
                                    <div className="text-sm text-emerald-600 dark:text-emerald-400">
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
