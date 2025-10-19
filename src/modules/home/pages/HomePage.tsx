'use client';

import { VirtuosoGrid, VirtuosoGridHandle } from 'react-virtuoso';
import { useRef } from 'react';
import { useInfiniteProducts } from '../hooks/useInfiniteProducts';
import { ProductGridFooter } from '../components/ProductGridFooter';
import { ProductGridItem } from '../components/ProductGridItem';
import { DEFAULT_PAGE_SIZE } from '../constants';

export default function HomePage() {
    const { products, loading, hasMore, loadMore } = useInfiniteProducts({ limit: DEFAULT_PAGE_SIZE });
    const gridRef = useRef<VirtuosoGridHandle>(null);

    return (
        <section className="pb-10">
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
                itemContent={(index, product) => <ProductGridItem key={product.id} product={product} />}
                components={{
                    Footer: () => <ProductGridFooter loading={loading} hasMore={hasMore} />,
                }}
            />
        </section>
    );
}
