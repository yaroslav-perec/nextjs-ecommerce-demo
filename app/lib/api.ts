import { Product, ProductsResponse } from '@/types/product';

const BASE = 'https://dummyjson.com';

export async function fetchProducts(limit = 20, skip = 0): Promise<ProductsResponse> {
    const res = await fetch(`${BASE}/products?limit=${limit}&skip=${skip}`, {
        cache: 'no-store', // Ensure fresh data for demo purposes
    });
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
}

export async function fetchProduct(id: string | number): Promise<Product> {
    const res = await fetch(`${BASE}/products/${id}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch product');
    return res.json();
}

export const formatCurrency = (n: number) => new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'USD',
}).format(n);