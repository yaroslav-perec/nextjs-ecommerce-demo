import { Product, ProductsResponse } from '../types/product.types';

const BASE_URL = 'https://dummyjson.com';

/**
 * Fetch paginated list of products
 */
export async function fetchProducts(limit = 20, skip = 0): Promise<ProductsResponse> {
    const res = await fetch(`${BASE_URL}/products?limit=${limit}&skip=${skip}`, {
        cache: 'no-store', // ensures fresh data during development
    });
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
}

/**
 * Fetch a single product by ID
 */
export async function fetchProduct(id: string | number): Promise<Product> {
    const res = await fetch(`${BASE_URL}/products/${id}`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`Failed to fetch product ${id}`);
    return res.json();
}
