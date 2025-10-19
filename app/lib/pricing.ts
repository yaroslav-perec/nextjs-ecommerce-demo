/**
 * Utility functions for handling product pricing and discounts.
 */

/**
 * Returns the discounted price for a given base price and discount percentage.
 * Automatically rounds to 2 decimals.
 */
export function getDiscountedPrice(price: number, discountPercentage?: number): number {
    if (!discountPercentage || discountPercentage <= 0) return price;
    return Number((price * (1 - discountPercentage / 100)).toFixed(2));
}

/**
 * Returns the savings amount (difference between original and discounted price).
 */
export function getSavings(price: number, discountPercentage?: number): number {
    if (!discountPercentage || discountPercentage <= 0) return 0;
    return Number((price - getDiscountedPrice(price, discountPercentage)).toFixed(2));
}
