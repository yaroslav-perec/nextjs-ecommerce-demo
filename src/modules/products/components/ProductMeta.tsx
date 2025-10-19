'use client';
import { Product } from '../types/product.types';

export function ProductMeta({ product }: { product: Product }) {
    return (
        <section
            className="
                mt-4 rounded-lg bg-zinc-50 dark:bg-zinc-900/40
                p-4 text-sm leading-relaxed
                text-zinc-700 dark:text-zinc-300
            "
        >
            <p>
                <span className="font-medium text-zinc-800 dark:text-zinc-100">
                    Shipping:{' '}
                </span>
                {product.shippingInformation || '—'}
            </p>

            <p>
                <span className="font-medium text-zinc-800 dark:text-zinc-100">
                    Warranty:{' '}
                </span>
                {product.warrantyInformation || '—'}
            </p>

            <p>
                <span className="font-medium text-zinc-800 dark:text-zinc-100">SKU: </span>
                {product.sku || '—'}
            </p>

            {product.tags && product.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-3 mt-2 border-t border-zinc-100 dark:border-zinc-800">
                    {product.tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-md bg-zinc-100 dark:bg-zinc-800 px-2.5 py-[2px] text-xs text-zinc-600 dark:text-zinc-300 font-medium"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            )}
        </section>
    );
}
