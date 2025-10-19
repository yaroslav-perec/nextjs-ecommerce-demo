'use client';

import { VirtuosoGrid, VirtuosoGridHandle } from 'react-virtuoso';
import { useRef } from 'react';
import ProductCard from '../../products/components/ProductCard';
import ProductSkeleton from '../../products/components/ProductSkeleton';
import { useInfiniteProducts } from '../../products/hooks/useInfiniteProducts';

export default function HomePage() {
    const { products, loading, hasMore, loadMore } = useInfiniteProducts({ limit: 24 });
    const gridRef = useRef<VirtuosoGridHandle>(null);

    return (
        <div className="pb-10">
            <h1 className="mb-4 text-2xl font-semibold">Products</h1>

            <VirtuosoGrid
                useWindowScroll
                ref={gridRef}
                data={products}
                endReached={() => hasMore && !loading && loadMore()}
                overscan={200}
                totalCount={products.length}
                listClassName="!grid !grid-cols-1 sm:!grid-cols-2 md:!grid-cols-3 lg:!grid-cols-4 !gap-6 xl:!gap-8"
                itemClassName="!w-full flex justify-center"
                itemContent={(index, product) => (
                    <div className="w-full">
                        <ProductCard key={product.id} product={product} />
                    </div>
                )}
                components={{
                    Footer: () => (
                        <div className="py-8">
                            {loading ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                    {Array.from({ length: 8 }).map((_, i) => (
                                        <ProductSkeleton key={i} />
                                    ))}
                                </div>
                            ) : hasMore ? (
                                <div className="text-center text-zinc-500">Scroll for more ↓</div>
                            ) : (
                                <div className="text-center text-zinc-500">No more products 🚀</div>
                            )}
                        </div>
                    ),
                }}
            />
        </div>
    );
}
