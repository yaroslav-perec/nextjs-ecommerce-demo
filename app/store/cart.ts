'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { getDiscountedPrice } from '@/lib/pricing';

export type CartItem = {
	id: number;
	title: string;
	price: number;
	thumbnail: string;
	quantity: number;
	discountPercentage: number;
};

type CartState = {
	items: CartItem[];

	// Actions
	add: (p: Omit<CartItem, 'quantity'>, qty?: number) => void;
	remove: (id: number) => void;
	updateQuantity: (id: number, qty: number) => void;
	clear: () => void;

	// Getters / selectors
	totalCount: () => number;
	subtotal: () => number;
	total: () => number;
	totalSavings: () => number;
	getItemTotal: (id: number) => number;
};

export const useCart = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],

            add: (p, qty = 1) =>
                set((state) => {
                    const existing = state.items.find((i) => i.id === p.id);
                    if (existing) {
                        return {
                            items: state.items.map((i) =>
                                i.id === p.id ? { ...i, quantity: i.quantity + qty } : i,
                            ),
                        };
                    }
                    return { items: [...state.items, { ...p, quantity: qty }] };
                }),

            remove: (id) =>
                set((s) => ({
                    items: s.items.filter((i) => i.id !== id),
                })),

            updateQuantity: (id, qty) =>
                set((s) => ({
                    items: s.items
                        .map((i) => (i.id === id ? { ...i, quantity: qty } : i))
                        .filter((i) => i.quantity > 0),
                })),

            clear: () => set({ items: [] }),

            /* ------------------ Selectors ------------------ */
            totalCount: () => get().items.reduce((sum, item) => sum + item.quantity, 0),

            subtotal: () =>
                get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),

            total: () =>
                get().items.reduce((sum, item) => {
                    const discounted = getDiscountedPrice(item.price, item.discountPercentage);
                    return sum + discounted * item.quantity;
                }, 0),

            totalSavings: () =>
                get().items.reduce((sum, item) => {
                    const discounted = getDiscountedPrice(item.price, item.discountPercentage);
                    return sum + (item.price - discounted) * item.quantity;
                }, 0),

            getItemTotal: (id) => {
                const item = get().items.find((i) => i.id === id);
                if (!item) return 0;
                const discounted = getDiscountedPrice(item.price, item.discountPercentage);
                return discounted * item.quantity;
            },
        }),
        {
            name: 'ac-cart',
            storage: createJSONStorage(() => sessionStorage),
            partialize: (state) => ({ items: state.items }),
        },
    ),
);
