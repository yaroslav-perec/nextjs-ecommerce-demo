'use client';

import Image from 'next/image';
import Link from 'next/link';
import { formatCurrency } from '../../shared/lib/formatters';
import { getDiscountedPrice } from '../../shared/lib/pricing';
import AddToCartButton from '../../shared/components/AddToCartButton';
import { useCart } from '../store/cart.store';
import { CartItem as CartItemType } from '../types/cart.types';

export function CartItem({ item }: { item: CartItemType }) {
    const { remove, getItemTotal } = useCart();
    const discount = item.discountPercentage ?? 0;
    const discountedPrice = getDiscountedPrice(item.price, discount);
    const hasDiscount = discount > 0;
    const itemTotal = getItemTotal(item.id);

    return (
        <li className="rounded-xl border p-3 dark:border-zinc-800 flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Link
                href={`/products/${item.id}`}
                className="flex gap-3 sm:gap-4 items-center group flex-1"
            >
                <div className="relative h-16 w-20 overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-900 flex-shrink-0 transition-transform group-hover:scale-105">
                    <Image
                        src={item.thumbnail}
                        alt={item.title}
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="flex flex-col">
                    <div className="font-medium text-zinc-900 dark:text-zinc-100 text-sm sm:text-base line-clamp-2 group-hover:underline">
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
            </Link>

            <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto mt-1 sm:mt-0">
                <AddToCartButton
                    id={item.id}
                    title={item.title}
                    price={item.price}
                    thumbnail={item.thumbnail}
                    qty={item.quantity}
                    discountPercentage={item.discountPercentage}
                    maxStock={item.stock}
                    bordered={false}
                />

                <div className="font-semibold text-sm sm:text-base font-mono tabular-nums min-w-[90px] text-right">
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
}
