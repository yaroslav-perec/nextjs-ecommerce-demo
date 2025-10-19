'use client';

import { formatCurrency } from '../../shared/lib/formatters';
import { getDiscountDisplay } from '../../shared/lib/pricing';
import AddToCartButton from '../../shared/components/AddToCartButton';
import { Product } from '../types/product.types';
import { ProductMeta } from './ProductMeta';

export function ProductInfo({ product }: { product: Product }) {
    const { discountedPrice, hasDiscount, formattedDiscount } = getDiscountDisplay(
        product.price,
        product.discountPercentage,
    );

    return (
        <section className="space-y-5">
            {/* --- Title & meta --- */}
            <div>
                <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-100">
                    {product.title}
                </h1>
                <div className="text-zinc-500 text-sm mt-1">
					⭐ {product.rating.toFixed(1)} • {product.brand} • {product.category}
                </div>
            </div>

            <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
                {product.description}
            </p>

            {/* --- Price + availability + add-to-cart --- */}
            <div className="space-y-4">
                <div className="flex flex-wrap items-baseline gap-2 sm:gap-3">
                    <div className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                        {formatCurrency(discountedPrice)}
                    </div>
                    {hasDiscount && (
                        <>
                            <span className="text-lg line-through text-zinc-500">
                                {formatCurrency(product.price)}
                            </span>
                            <span className="rounded-md bg-emerald-50 px-1.5 py-[2px] text-xs font-semibold text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400">
								-{formattedDiscount}
                            </span>
                        </>
                    )}
                </div>

                <div className="text-sm text-zinc-600 dark:text-zinc-400">
					Availability:{' '}
                    <span
                        className={
                            product.stock > 0
                                ? 'text-emerald-600 dark:text-emerald-400 font-medium'
                                : 'text-rose-600 dark:text-rose-400 font-medium'
                        }
                    >
                        {product.stock > 0 ? 'In stock' : 'Out of stock'}
                    </span>{' '}
					({product.stock})
                </div>

                <div className="pt-1 flex items-center">
                    <div className="w-full sm:w-auto h-[40px]">
                        <AddToCartButton
                            id={product.id}
                            title={product.title}
                            price={product.price}
                            thumbnail={product.thumbnail}
                            discountPercentage={product.discountPercentage}
                            maxStock={product.stock}
                            layout="full"
                        />
                    </div>
                </div>
            </div>

            <ProductMeta product={product} />
        </section>
    );
}
