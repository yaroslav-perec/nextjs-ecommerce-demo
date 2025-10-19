import { useState, useEffect, useRef } from 'react';
import { fetchProducts } from '../services/products.api';
import { Product } from '../types/product.types';

type InfiniteProductsOptions = {
	limit?: number;
	initialLoad?: boolean;
	rootMargin?: string;
};

export function useInfiniteProducts({
    limit = 24,
    initialLoad = true,
    rootMargin = '300px',
}: InfiniteProductsOptions = {}) {
    const [products, setProducts] = useState<Product[]>([]);
    const [skip, setSkip] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const loaderRef = useRef<HTMLDivElement | null>(null);

    /* ---------- Load products ---------- */
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

    /* ---------- Initial load ---------- */
    useEffect(() => {
        if (initialLoad) loadProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /* ---------- Intersection observer ---------- */
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) loadProducts();
            },
            { rootMargin },
        );

        if (loaderRef.current) observer.observe(loaderRef.current);
        return () => observer.disconnect();
    });

    return {
        products,
        loading,
        hasMore,
        loaderRef,
        loadMore: loadProducts,
    };
}
