import Image from "next/image";
import { fetchProduct, formatCurrency } from "@/lib/api";
import AddToCartButton from "@/components/AddToCartButton";

export default async function ProductDetailsPage({ params }: { params: { id: string } }) {
    const product = await fetchProduct(params.id);

    return (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-white dark:bg-zinc-800 p-4">
                <Image
                    src={product.images?.[0] ?? product.thumbnail}
                    alt={product.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain transition-transform duration-300 hover:scale-105"
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFElEQVR42mP8z8AARBgFiMAAAAIAAgABGJXHdAAAAABJRU5ErkJggg=="
                />
            </div>

            <div className="space-y-4">
                <h1 className="text-2xl font-semibold">{product.title}</h1>
                <div className="text-zinc-500">⭐ {product.rating.toFixed(1)}</div>
                <p className="text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                    {product.description}
                </p>

                <div className="flex items-end gap-3">
                    <div className="text-2xl font-bold">{formatCurrency(product.price)}</div>
                    {product.discountPercentage ? (
                        <div className="text-sm text-emerald-600 dark:text-emerald-400">
                            -{product.discountPercentage}%
                        </div>
                    ) : null}
                </div>

                <AddToCartButton
                    id={product.id}
                    title={product.title}
                    price={product.price}
                    thumbnail={product.thumbnail}
                    discountPercentage={product.discountPercentage}
                />
            </div>
        </div>
    );
}
