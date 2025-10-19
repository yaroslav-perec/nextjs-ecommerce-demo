'use client';

import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/lib/api";
import type { Product } from "@/types/product";
import AddToCartButton from "@/components/AddToCartButton";

export default function ProductCard({ product }: { product: Product }) {
    return (
        <div className="group flex flex-col justify-between rounded-2xl border border-zinc-200 p-3 transition hover:shadow-md dark:border-zinc-800">
            <Link
                href={`/products/${product.id}`}
                className="block"
            >
                <div className="relative mb-3 aspect-[4/3] overflow-hidden rounded-xl bg-white dark:bg-zinc-800 p-2">
                    <Image
                        src={product.images?.[0] ?? product.thumbnail}
                        alt={product.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-contain transition-transform duration-300 group-hover:scale-105"
                        placeholder="blur"
                        blurDataURL="/placeholder.png"
                    />
                </div>

                <div className="space-y-1 mb-3">
                    <div className="text-sm text-zinc-500">⭐ {product.rating.toFixed(1)}</div>
                    <h3 className="line-clamp-1 font-medium">{product.title}</h3>
                    <div className="font-semibold">{formatCurrency(product.price)}</div>
                </div>
            </Link>

            <AddToCartButton
                id={product.id}
                title={product.title}
                price={product.price}
                thumbnail={product.thumbnail}
                bordered={false}
                layout="full"
            />
        </div>
    );
}
