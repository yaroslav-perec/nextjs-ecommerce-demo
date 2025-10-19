import type { Metadata } from 'next';
import { fetchProduct } from '../../../modules/products/services/products.api';
import ProductDetailsPage from '../../../modules/products/pages/ProductDetailsPage';

// fetch once (Next.js will reuse same promise during render)
async function getProduct(id: string) {
    return fetchProduct(id);
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const product = await getProduct(params.id);

    return {
        title: `${product.title} — Next.js E-Commerce Demo`,
        description: product.description || 'Product details and specifications.',
        openGraph: { images: [{ url: product.thumbnail }] },
    };
}

export default async function Page({ params }: { params: { id: string } }) {
    const product = await getProduct(params.id);
    return <ProductDetailsPage product={product} />;
}
