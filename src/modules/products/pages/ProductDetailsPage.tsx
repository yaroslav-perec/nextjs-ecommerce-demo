import { fetchProduct } from '../services/products.api';
import { ProductGallery } from '../components/ProductGallery';
import { ProductInfo } from '../components/ProductInfo';
import { ProductReviews } from '../components/ProductReviews';

export default async function ProductDetailsPage({ params }: { params: { id: string } }) {
    const product = await fetchProduct(params.id);
    const reviews = product.reviews ?? [];

    return (
        <div className="space-y-12">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 items-start">
                <ProductGallery
                    thumbnail={product.thumbnail}
                    images={product.images}
                    title={product.title}
                />
                <ProductInfo product={product} />
            </div>
            {reviews.length > 0 && <ProductReviews reviews={reviews} />}
        </div>
    );
}
