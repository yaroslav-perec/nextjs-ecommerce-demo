import { beforeEach, describe, expect, it } from 'vitest';
import { useCart } from '../cart.store';
import { getDiscountedPrice } from '../../../shared/lib/pricing';

describe('useCart store', () => {
    beforeEach(() => {
        useCart.getState().clear();
    });

    it('adds an item to the cart', () => {
        useCart.getState().add({
            id: 1,
            title: 'Test Product',
            price: 100,
            thumbnail: '/test.jpg',
            discountPercentage: 10,
            stock: 10,
        });

        const items = useCart.getState().items;
        expect(items.length).toBe(1);
        expect(items[0].quantity).toBe(1);
    });

    it('increments quantity if the same item is added again', () => {
        const cart = useCart.getState();
        cart.add({ id: 1, title: 'Test', price: 100, thumbnail: '', discountPercentage: 0, stock: 10 });
        cart.add({ id: 1, title: 'Test', price: 100, thumbnail: '', discountPercentage: 0, stock: 10 });
        expect(useCart.getState().items[0].quantity).toBe(2);
    });

    it('removes an item by id', () => {
        const cart = useCart.getState();
        cart.add({ id: 1, title: 'Test', price: 50, thumbnail: '', discountPercentage: 0, stock: 10 });
        cart.remove(1);
        expect(useCart.getState().items.length).toBe(0);
    });

    it('calculates subtotal and total correctly with discount', () => {
        const cart = useCart.getState();
        cart.add({ id: 1, title: 'Discounted', price: 200, thumbnail: '', discountPercentage: 25, stock: 10 }, 2);
        const state = useCart.getState();
        expect(state.subtotal()).toBe(400);
        expect(state.total()).toBe(getDiscountedPrice(200, 25) * 2);
    });

    it('clears the cart', () => {
        const cart = useCart.getState();
        cart.add({ id: 1, title: 'A', price: 100, thumbnail: '', discountPercentage: 0, stock: 10 });
        cart.add({ id: 2, title: 'B', price: 200, thumbnail: '', discountPercentage: 0, stock: 10 });
        cart.clear();
        expect(useCart.getState().items.length).toBe(0);
    });
});
