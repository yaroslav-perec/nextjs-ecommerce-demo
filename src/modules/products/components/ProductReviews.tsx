'use client';

import { Product } from '../types/product.types';

export function ProductReviews({ reviews }: Pick<Product, 'reviews'>) {
    if (!reviews || !reviews.length) {
        return null;
    }

    return (
        <section>
            <h2 className="text-xl font-semibold mb-4 text-zinc-900 dark:text-zinc-100">
				Customer Reviews
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {reviews.map((r, idx) => (
                    <div
                        key={idx}
                        className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 bg-white dark:bg-zinc-900/50 shadow-sm"
                    >
                        <div className="flex items-center justify-between text-sm">
                            <span className="font-medium text-zinc-800 dark:text-zinc-100">
                                {r.reviewerName}
                            </span>
                            <span className="text-amber-500">⭐ {r.rating}</span>
                        </div>
                        <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300 leading-snug">
                            {r.comment}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
