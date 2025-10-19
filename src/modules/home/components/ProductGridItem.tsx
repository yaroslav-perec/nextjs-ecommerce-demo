'use client';

import { memo } from 'react';
import ProductCard from '../../products/components/ProductCard';
import { Product } from '../../products/types/product.types';

export const ProductGridItem = memo(function ProductGridItem({ product }: { product: Product }) {
    return (
        <div className="w-full">
            <ProductCard product={product} />
        </div>
    );
});
