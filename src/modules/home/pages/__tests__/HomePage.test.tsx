import { describe, it, expect, vi, Mock } from 'vitest';
import { render, screen } from '@testing-library/react';
import HomePage from '../HomePage';
import * as hooks from '../../hooks/useInfiniteProducts';
import { Product } from '../../../products/types/product.types';


// Mock react-virtuoso so virtualization doesn’t break rendering
vi.mock('react-virtuoso', () => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    VirtuosoGrid: ({ data, itemContent }: any) => (
        <div data-testid="mock-grid">
            {/*eslint-disable-next-line @typescript-eslint/no-explicit-any*/}
            {data.map((item: any, index: number) => itemContent(index, item))}
        </div>
    ),
}));


// Mock the hook
vi.mock('../../hooks/useInfiniteProducts', () => ({
    useInfiniteProducts: vi.fn(),
}));

// Mock ProductGridItem (simple render)
vi.mock('../../components/ProductGridItem', () => ({
    ProductGridItem: ({ product }: { product: Product }) => (
        <div data-testid="mock-product-item">{product.title}</div>
    ),
}));

describe('<HomePage />', () => {
    it('renders the page heading and product grid', () => {
        // Mock hook data
        (hooks.useInfiniteProducts as unknown as Mock).mockReturnValue({
            products: [
                { id: 1, title: 'Mock Product', price: 100, thumbnail: '/test.jpg' },
            ],
            loading: false,
            hasMore: false,
            loadMore: vi.fn(),
            loaderRef: { current: null },
        });

        render(<HomePage />);

        expect(screen.getByRole('heading', { name: /products/i })).toBeInTheDocument();
        expect(screen.getByText(/mock product/i)).toBeInTheDocument();
    });
});
