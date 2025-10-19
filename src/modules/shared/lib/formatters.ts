import { CURRENCY } from '../constants';

/**
 * Format a number as USD currency
 */
export const formatCurrency = (value: number): string =>
    new Intl.NumberFormat(CURRENCY.LOCALE, {
        style: 'currency',
        currency: CURRENCY.CODE,
    }).format(value);
