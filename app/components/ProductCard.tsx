import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/lib/api";
import type { Product } from "@/types/product";

export default function ProductCard({ product }: { product: Product }) {
    return (
        <Link
            href={`/products/${product.id}`}
            className="group rounded-2xl border border-zinc-200 p-3 transition hover:shadow-md dark:border-zinc-800"
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

            <div className="space-y-1">
                <div className="text-sm text-zinc-500">⭐ {product.rating.toFixed(1)}</div>
                <h3 className="line-clamp-1 font-medium">{product.title}</h3>
                <div className="font-semibold">{formatCurrency(product.price)}</div>
            </div>
        </Link>
    );
}
