import Link from 'next/link';

export function EmptyCart() {
    return (
        <div className="rounded-xl border border-dashed p-6 text-center text-zinc-500 dark:border-zinc-800">
			Your cart is empty.{' '}
            <Link href="/" className="underline">
				Continue shopping
            </Link>
			.
        </div>
    );
}
