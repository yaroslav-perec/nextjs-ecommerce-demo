/**
 * DummyJSON discount helpers (values are already in percent form, e.g. 14.4 = 14.4%)
 */

/** Ensures the discount is a positive % and not absurdly high */
function normalizeDiscount(discount?: number): number {
    if (discount == null || isNaN(discount) || discount <= 0) return 0;
    return Math.min(discount, 100); // clamp to 100%
}

/** Returns the discounted price given the base price and discount percentage */
export function getDiscountedPrice(price: number, discountPercentage?: number): number {
    const discount = normalizeDiscount(discountPercentage);
    if (discount === 0) return price;
    const discounted = price * (1 - discount / 100);
    return Number(discounted.toFixed(2));
}

/** Returns the amount saved (difference between original and discounted price) */
export function getSavings(price: number, discountPercentage?: number): number {
    const discount = normalizeDiscount(discountPercentage);
    if (discount === 0) return 0;
    const savings = price * (discount / 100);
    return Number(savings.toFixed(2));
}

/** Returns normalized discount percentage (safe for display, e.g. badge) */
export function getNormalizedDiscount(discountPercentage?: number): number {
    return normalizeDiscount(discountPercentage);
}

/**
 * Returns UI-friendly pricing info:
 * - discountedPrice (number)
 * - hasDiscount (boolean, hides <0.5%)
 * - formattedDiscount (string like "14%" or "0.25%")
 */
export function getDiscountDisplay(price: number, discountPercentage?: number) {
    const discount = normalizeDiscount(discountPercentage);
    const discountedPrice = getDiscountedPrice(price, discount);
    const hasDiscount = discount >= 0.5;
    const formattedDiscount =
        discount < 1 ? discount.toFixed(2) + "%" : discount.toFixed(0) + "%";

    return { discountedPrice, hasDiscount, formattedDiscount };
}
