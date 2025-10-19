import { useState, useEffect } from 'react';
import { fetchProducts } from '../../products/services/products.api';
import type { Product } from '../../products/types/product.types';
import { DEFAULT_PAGE_SIZE } from '../constants';

type InfiniteProductsOptions = {
    limit?: number;
    initialLoad?: boolean;
};

export function useInfiniteProducts({
    limit = DEFAULT_PAGE_SIZE,
    initialLoad = true,
}: InfiniteProductsOptions = {}) {
    const [products, setProducts] = useState<Product[]>([]);
    const [skip, setSkip] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    async function loadProducts() {
        if (loading || !hasMore) return;
        setLoading(true);

        try {
            const { products: newProducts, total } = await fetchProducts(limit, skip);
            setProducts((prev) => [...prev, ...newProducts]);
            setSkip((prev) => prev + limit);
            setHasMore(skip + limit < total);
        } catch (err) {
            console.error('Error loading products:', err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (initialLoad) loadProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        products,
        loading,
        hasMore,
        loadMore: loadProducts,
    };
}
