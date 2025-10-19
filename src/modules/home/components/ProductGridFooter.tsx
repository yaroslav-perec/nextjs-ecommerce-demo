'use client';

import ProductSkeleton from './ProductSkeleton';

export function ProductGridFooter({ loading, hasMore }: {
	loading: boolean;
	hasMore: boolean;
}) {
    if (loading) {
        return (
            <div className="py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                    <ProductSkeleton key={i} />
                ))}
            </div>
        );
    }

    return (
        <div className="py-8 text-center text-zinc-500">
            {hasMore ? 'Scroll for more ↓' : 'No more products 🚀'}
        </div>
    );
}
