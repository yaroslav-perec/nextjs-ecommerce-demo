'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type CartItem = {
	id: number;
	title: string;
	price: number;
	thumbnail: string;
	quantity: number;
};

type CartState = {
	items: CartItem[];

	// Actions
	add: (p: { id: number; title: string; price: number; thumbnail: string }, qty?: number) => void;
	remove: (id: number) => void;
	updateQuantity: (id: number, qty: number) => void;
	clear: () => void;

	// Getters
	totalCount: () => number;
	totalPrice: () => number;
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

            totalCount: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
            totalPrice: () => get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
        }),
        {
            name: 'ac-cart',
            storage: createJSONStorage(() => sessionStorage), // persists only per session
            partialize: (state) => ({ items: state.items }),
        },
    ),
);
