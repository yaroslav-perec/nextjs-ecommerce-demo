'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { getDiscountedPrice, getSavings } from '../../shared/lib/pricing';
import type { CartState } from '../types/cart.types';
import { CART_STORAGE_KEY } from '../constants';

export const useCart = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],

            /* ---------------- Actions ---------------- */
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

            remove: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),

            updateQuantity: (id, qty) =>
                set((s) => ({
                    items: s.items
                        .map((i) => (i.id === id ? { ...i, quantity: qty } : i))
                        .filter((i) => i.quantity > 0),
                })),

            clear: () => set({ items: [] }),

            /* ---------------- Selectors ---------------- */
            totalCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

            subtotal: () =>
                get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),

            total: () =>
                get().items.reduce(
                    (sum, i) => sum + getDiscountedPrice(i.price, i.discountPercentage) * i.quantity,
                    0,
                ),

            totalSavings: () =>
                get().items.reduce(
                    (sum, i) => sum + getSavings(i.price, i.discountPercentage) * i.quantity,
                    0,
                ),

            getItemTotal: (id) => {
                const i = get().items.find((it) => it.id === id);
                if (!i) return 0;
                return getDiscountedPrice(i.price, i.discountPercentage) * i.quantity;
            },
        }),
        {
            name: CART_STORAGE_KEY,
            storage: createJSONStorage(() => sessionStorage),
            partialize: (s) => ({ items: s.items }),
        },
    ),
);
