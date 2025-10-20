import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import AddToCartButton from '../AddToCartButton';
import { useCart } from '../../../cart/store/cart.store';

beforeEach(() => {
    useCart.getState().clear();
});

describe('<AddToCartButton />', () => {
    const baseProps = {
        id: 1,
        title: 'Test Product',
        price: 100,
        thumbnail: '/test.jpg',
        discountPercentage: 10,
        maxStock: 5,
    };

    it('renders "Add to Cart" button initially', () => {
        render(<AddToCartButton {...baseProps} />);
        expect(screen.getByText('Add to Cart')).toBeInTheDocument();
    });

    it('adds item to cart when clicked', () => {
        render(<AddToCartButton {...baseProps} />);
        fireEvent.click(screen.getByText('Add to Cart'));
        const state = useCart.getState();
        expect(state.items.length).toBe(1);
        expect(state.items[0].quantity).toBe(1);
    });

    it('shows quantity controls after adding to cart', () => {
        render(<AddToCartButton {...baseProps} />);
        fireEvent.click(screen.getByText('Add to Cart'));
        expect(screen.getByLabelText('Increase quantity')).toBeInTheDocument();
        expect(screen.getByLabelText('Decrease quantity')).toBeInTheDocument();
    });

    it('increments quantity correctly', () => {
        render(<AddToCartButton {...baseProps} />);
        fireEvent.click(screen.getByText('Add to Cart'));
        fireEvent.click(screen.getByLabelText('Increase quantity'));
        const item = useCart.getState().items.find((i) => i.id === baseProps.id);
        expect(item?.quantity).toBe(2);
    });

    it('decrements and removes item when reaching zero', () => {
        render(<AddToCartButton {...baseProps} />);
        fireEvent.click(screen.getByText('Add to Cart')); // qty = 1
        fireEvent.click(screen.getByLabelText('Decrease quantity')); // should remove
        expect(useCart.getState().items.length).toBe(0);
    });

    it('respects maxStock limit', () => {
        render(<AddToCartButton {...baseProps} />);
        fireEvent.click(screen.getByText('Add to Cart'));
        for (let i = 0; i < 10; i++) {
            fireEvent.click(screen.getByLabelText('Increase quantity'));
        }
        const item = useCart.getState().items.find((i) => i.id === baseProps.id);
        expect(item?.quantity).toBe(baseProps.maxStock);
    });
});
