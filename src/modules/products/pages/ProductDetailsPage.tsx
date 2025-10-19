import { fetchProduct } from '../services/products.api';
import { ProductGallery } from '../components/ProductGallery';
import { ProductInfo } from '../components/ProductInfo';
import { ProductReviews } from '../components/ProductReviews';
import type { Product } from '../types/product.types';

type ProductDetailsPageProps = {
    product?: Product;
    params?: { id: string };
};

export default async function ProductDetailsPage({ product, params }: ProductDetailsPageProps) {
    const data = product ?? (params ? await fetchProduct(params.id) : null);
    if (!data) return null;

    const reviews = data.reviews ?? [];

    return (
        <div className="space-y-12">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 items-start">
                <ProductGallery
                    thumbnail={data.thumbnail}
                    images={data.images}
                    title={data.title}
                />
                <ProductInfo product={data} />
            </div>

            {reviews.length > 0 && <ProductReviews reviews={reviews} />}
        </div>
    );
}
