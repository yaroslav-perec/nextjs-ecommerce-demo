'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/store/cart';

interface AddToCartButtonProps {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
    discountPercentage: number;
    qty?: number;
    bordered?: boolean;
    layout?: 'full' | 'inline';
    maxStock?: number;
}

export default function AddToCartButton({
    id,
    title,
    price,
    thumbnail,
    qty = 1,
    bordered = true,
    discountPercentage,
    layout = 'inline',
    maxStock = Infinity, // default: unlimited
}: AddToCartButtonProps) {
    const add = useCart((s) => s.add);
    const remove = useCart((s) => s.remove);
    const update = useCart((s) => s.updateQuantity);
    const item = useCart((s) => s.items.find((i) => i.id === id));

    const [inputValue, setInputValue] = useState(item?.quantity?.toString() ?? qty.toString());

    useEffect(() => {
        if (item) {
            setInputValue(item.quantity.toString());
        }
    }, [item?.quantity]);

    /* ----------------- Event handlers ----------------- */
    const handleAdd = () => add({ id, title, price, thumbnail, discountPercentage, stock: maxStock }, qty);

    const handleIncrement = () => {
        if (!item) return;
        const newQty = Math.min((item?.quantity || 0) + 1, maxStock);
        update(id, newQty);
    };

    const handleDecrement = () => {
        if (item && item.quantity > 1) update(id, item.quantity - 1);
        else remove(id);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value);

    const commitChange = () => {
        const n = Number(inputValue.trim());
        if (!n || isNaN(n) || n <= 0) return remove(id);
        const clamped = Math.min(n, maxStock);
        update(id, clamped);
        setInputValue(clamped.toString());
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') e.currentTarget.blur();
    };

    /* ----------------- Styles ----------------- */
    const borderClasses = bordered
        ? 'border border-zinc-300 dark:border-zinc-600'
        : '';

    const wrapperClasses =
        layout === 'full'
            ? 'w-full flex justify-center'
            : 'flex justify-start'; // inline → product page style

    const contentWidth =
        layout === 'full'
            ? 'w-full' // product cards — fills parent
            : 'min-w-[120px]'; // product page — fixed width

    /* ----------------- Empty state ----------------- */
    if (!item || !item.quantity) {
        return (
            <div className={wrapperClasses}>
                <button
                    onClick={handleAdd}
                    disabled={maxStock <= 0}
                    className={`${contentWidth} cursor-pointer inline-flex items-center justify-center rounded-lg border border-zinc-300 bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed dark:border-zinc-600 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200`}
                >
                    {maxStock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </button>
            </div>
        );
    }

    /* ----------------- Quantity controls ----------------- */
    const isMaxed = item.quantity >= maxStock;

    return (
        <div className={wrapperClasses}>
            <div
                className={`${contentWidth} inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 ${borderClasses}`}
            >
                <button
                    onClick={handleDecrement}
                    className="cursor-pointer h-7 w-7 rounded-md border border-zinc-300 text-zinc-800 hover:bg-zinc-100 dark:border-zinc-500 dark:text-zinc-100 dark:hover:bg-zinc-800 flex items-center justify-center transition"
                    aria-label="Decrease quantity"
                >
                    –
                </button>

                <input
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                    onBlur={commitChange}
                    onKeyDown={handleKeyDown}
                    inputMode="numeric"
                    className="w-10 text-center text-sm font-medium bg-transparent text-zinc-800 dark:text-zinc-100 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    aria-label="Product quantity"
                />

                <button
                    onClick={handleIncrement}
                    disabled={isMaxed}
                    className={`cursor-pointer h-7 w-7 rounded-md border border-zinc-300 text-zinc-800 hover:bg-zinc-100 dark:border-zinc-500 dark:text-zinc-100 dark:hover:bg-zinc-800 flex items-center justify-center transition disabled:opacity-50 disabled:cursor-not-allowed`}
                    aria-label="Increase quantity"
                >
                    +
                </button>
            </div>
        </div>
    );
}
