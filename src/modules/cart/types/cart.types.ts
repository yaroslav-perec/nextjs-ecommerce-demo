import type { Product } from '../../products/types/product.types';

export type CartItem = Pick<Product, 'id' | 'title' | 'price' | 'thumbnail' | 'discountPercentage' | 'stock'> & {
	quantity: number;
};

export type CartActions = {
	add: (p: Omit<CartItem, 'quantity'>, qty?: number) => void;
	remove: (id: number) => void;
	updateQuantity: (id: number, qty: number) => void;
	clear: () => void;
};

export type CartSelectors = {
	totalCount: () => number;
	subtotal: () => number;
	total: () => number;
	totalSavings: () => number;
	getItemTotal: (id: number) => number;
};

export type CartState = {
	items: CartItem[];
} & CartActions &
	CartSelectors;
