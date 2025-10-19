import { fetchProducts } from '@/lib/api';
import ProductCard from '@/components/ProductCard';

export default async function HomePage() {
    const { products } = await fetchProducts(24, 0);

    return (
        <div>
            <h1 className="mb-4 text-2xl font-semibold">Products</h1>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-8">
                {products.map((p) => (
                    <ProductCard key={p.id} product={p} />
                ))}
            </div>
        </div>
    );
}