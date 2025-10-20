import type { Metadata } from 'next';
import { fetchProduct } from '../../../modules/products/services/products.api';
import ProductDetailsPage from '../../../modules/products/pages/ProductDetailsPage';

// Fetch helper (Next.js will reuse the same promise)
async function getProduct(id: string) {
    return fetchProduct(id);
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const product = await getProduct(id);

    return {
        title: `${product.title} — Next.js E-Commerce Demo`,
        description: product.description || 'Product details and specifications.',
        openGraph: { images: [{ url: product.thumbnail }] },
    };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await getProduct(id);

    return <ProductDetailsPage product={product} />;
}
