'use client';

import { useCart } from '../store/cart.store';
import { CartItem } from './CartItem';

export function CartList() {
    const { items } = useCart();

    return (
        <ul className="space-y-4">
            {items.map((item) => (
                <CartItem key={item.id} item={item} />
            ))}
        </ul>
    );
}
