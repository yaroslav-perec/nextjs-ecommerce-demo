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

    return (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* --- Product image --- */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-white dark:bg-zinc-800 p-4">
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
            <section className="space-y-4">
                <h1 className="text-2xl font-semibold">{product.title}</h1>

                <div className="text-zinc-500">⭐ {product.rating.toFixed(1)}</div>

                <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                    {product.description}
                </p>

                {/* --- Price --- */}
                <div className="flex flex-wrap items-baseline gap-2 sm:gap-3">
                    <div className="text-2xl font-bold">
                        {formatCurrency(discountedPrice)}
                    </div>

                    {hasDiscount && (
                        <>
                            <span className="text-lg line-through text-zinc-500">
                                {formatCurrency(product.price)}
                            </span>
                            <span className="rounded-md bg-emerald-50 px-1 py-[2px] text-xs font-semibold text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400">
                                -{formattedDiscount}
                            </span>
                        </>
                    )}
                </div>

                {/* --- Cart button --- */}
                <AddToCartButton
                    id={product.id}
                    title={product.title}
                    price={product.price}
                    thumbnail={product.thumbnail}
                    discountPercentage={product.discountPercentage}
                />
            </section>
        </div>
    );
}
