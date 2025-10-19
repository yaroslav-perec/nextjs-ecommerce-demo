'use client';

import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "../../shared/lib/formatters";
import type { Product } from "../types/product.types";
import AddToCartButton from "../../shared/components/AddToCartButton";
import { getDiscountedPrice } from "../../shared/lib/pricing";

export default function ProductCard({ product }: { product: Product }) {
    const { id, title, price, rating, thumbnail, images, discountPercentage, stock } = product;

    const discountedPrice = getDiscountedPrice(price, discountPercentage);
    const hasDiscount = discountedPrice < price;

    return (
        <div className="group flex h-full flex-col justify-between rounded-2xl border border-zinc-200 p-3 transition-all hover:shadow-md dark:border-zinc-800">
            {/* --- Image --- */}
            <Link href={`/products/${id}`} className="block flex-shrink-0">
                <div className="relative mb-3 aspect-[4/3] overflow-hidden rounded-xl bg-white dark:bg-zinc-800 p-2">
                    <Image
                        src={images?.[0] ?? thumbnail}
                        alt={title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-contain transition-transform duration-300 group-hover:scale-105"
                        placeholder="blur"
                        blurDataURL="/placeholder.png"
                    />
                </div>
            </Link>

            {/* --- Content --- */}
            <div className="flex flex-1 flex-col justify-between min-h-[150px]">
                <div className="mb-3 space-y-1">
                    {rating ? (
                        <div className="text-sm text-zinc-500">⭐ {rating.toFixed(1)}</div>
                    ) : (
                        <div className="text-sm text-zinc-400">No rating</div>
                    )}

                    <h3 className="line-clamp-2 font-medium text-zinc-900 dark:text-zinc-100 min-h-[3rem]">
                        {title}
                    </h3>

                    <div className="flex flex-wrap items-baseline gap-2">
                        <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                            {formatCurrency(discountedPrice)}
                        </span>

                        {hasDiscount && (
                            <>
                                <span className="text-sm line-through text-zinc-500">
                                    {formatCurrency(price)}
                                </span>
                                <span className="rounded-md bg-emerald-50 px-1.5 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400">
                                    -{discountPercentage.toFixed(0)}%
                                </span>
                            </>
                        )}
                    </div>
                </div>

                {/* Fixed height for button zone */}
                <div className="mt-auto h-[40px] flex items-end">
                    <AddToCartButton
                        id={id}
                        title={title}
                        price={price}
                        thumbnail={thumbnail}
                        discountPercentage={discountPercentage}
                        bordered={false}
                        maxStock={stock}
                        layout="full"
                    />
                </div>
            </div>
        </div>
    );
}
