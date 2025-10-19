'use client';
import Image from 'next/image';

export function ProductGallery({ images, thumbnail, title }: { images?: string[]; thumbnail: string; title: string }) {
    const src = images?.[0] ?? thumbnail;
    return (
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-white dark:bg-zinc-800 p-4 shadow-sm">
            <Image
                src={src}
                alt={title || 'Product image'}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain transition-transform duration-300 hover:scale-105"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFElEQVR42mP8z8AARBgFiMAAAAIAAgABGJXHdAAAAABJRU5ErkJggg=="
            />
        </div>
    );
}
