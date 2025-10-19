import Image from "next/image";
import { fetchProduct, formatCurrency } from "@/lib/api";
import AddToCartButton from "@/components/AddToCartButton";
import { getDiscountDisplay } from "@/lib/pricing";

export default async function ProductDetailsPage({
    params,
}: {
    params: { id: string };
}) {
    const product = await fetchProduct(params.id);
    const { discountedPrice, hasDiscount, formattedDiscount } = getDiscountDisplay(
        product.price,
        product.discountPercentage,
    );

    const reviews = product.reviews ?? [];

    return (
        <div className="space-y-12">
            {/* --- Top layout --- */}
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 items-start">
                {/* --- Product image --- */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-white dark:bg-zinc-800 p-4 shadow-sm">
                    <Image
                        src={product.images?.[0] ?? product.thumbnail}
                        alt={product.title || "Product image"}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-contain transition-transform duration-300 hover:scale-105"
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFElEQVR42mP8z8AARBgFiMAAAAIAAgABGJXHdAAAAABJRU5ErkJggg=="
                    />
                </div>

                {/* --- Product info --- */}
                <section className="space-y-5">
                    {/* --- Title & basic meta --- */}
                    <div>
                        <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-100">
                            {product.title}
                        </h1>
                        <div className="text-zinc-500 text-sm mt-1">
                            ⭐ {product.rating.toFixed(1)} • {product.brand} • {product.category}
                        </div>
                    </div>

                    {/* --- Description --- */}
                    <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
                        {product.description}
                    </p>

                    {/* --- Price + Button --- */}
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

                        {/* --- Add to cart (fixed height container to prevent jump) --- */}
                        <div className="pt-1 flex items-center">
                            <div className="w-full sm:w-auto h-[40px]">
                                <AddToCartButton
                                    id={product.id}
                                    title={product.title}
                                    price={product.price}
                                    thumbnail={product.thumbnail}
                                    discountPercentage={product.discountPercentage}
                                    layout="full"
                                />
                            </div>
                        </div>
                    </div>

                    {/* --- Secondary info --- */}
                    <div className="rounded-xl bg-zinc-50 dark:bg-zinc-900/40 p-4 text-sm space-y-1">
                        <p>
                            <span className="font-medium text-zinc-800 dark:text-zinc-100">
                                Shipping:
                            </span>{" "}
                            {product.shippingInformation}
                        </p>
                        <p>
                            <span className="font-medium text-zinc-800 dark:text-zinc-100">
                                Warranty:
                            </span>{" "}
                            {product.warrantyInformation}
                        </p>
                        <p>
                            <span className="font-medium text-zinc-800 dark:text-zinc-100">
                                SKU:
                            </span>{" "}
                            {product.sku}
                        </p>

                        {/* --- Tags --- */}
                        {product.tags && product.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 pt-3">
                                {product.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="rounded-full bg-zinc-100 dark:bg-zinc-800 px-3 py-1 text-xs text-zinc-600 dark:text-zinc-300 font-medium"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        )}

                    </div>
                </section>
            </div>

            {/* --- Reviews --- */}
            {reviews.length > 0 && (
                <section>
                    <h2 className="text-xl font-semibold mb-4 text-zinc-900 dark:text-zinc-100">
                        Customer Reviews
                    </h2>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {reviews.map((r, idx) => (
                            <div
                                key={idx}
                                className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 bg-white dark:bg-zinc-900/50 shadow-sm"
                            >
                                <div className="flex items-center justify-between text-sm">
                                    <span className="font-medium text-zinc-800 dark:text-zinc-100">
                                        {r.reviewerName}
                                    </span>
                                    <span className="text-amber-500">⭐ {r.rating}</span>
                                </div>
                                <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300 leading-snug">
                                    {r.comment}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
