'use client';

import { useCart } from '../store/cart.store';
import { CartList } from '../components/CartList';
import { CartSummary } from '../components/CartSummary';
import { CartActions } from '../components/CartActions';
import { EmptyCart } from '../components/EmptyCart';

export default function CartPage() {
    const { items } = useCart();

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold">Your Cart</h1>
            {items.length === 0 ? (
                <EmptyCart />
            ) : (
                <>
                    <CartList />
                    <CartSummary />
                    <CartActions />
                </>
            )}
        </div>
    );
}
