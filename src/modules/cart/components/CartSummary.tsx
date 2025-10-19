'use client';

import { useCart } from '../store/cart.store';
import { formatCurrency } from '../../shared/lib/formatters';

export function CartSummary() {
    const { totalCount, subtotal, total, totalSavings } = useCart();

    const count = totalCount();
    const sub = subtotal();
    const tot = total();
    const saved = totalSavings();

    return (
        <div className="flex items-center justify-between rounded-xl border p-4 dark:border-zinc-800">
            <div className="text-sm text-zinc-600 dark:text-zinc-400">
				Items: <span className="font-medium">{count}</span>
            </div>
            <div className="text-right">
                <div className="text-xl font-semibold">
					Total: {formatCurrency(tot)}
                </div>
                {saved > 0 && (
                    <>
                        <div className="text-sm text-zinc-600 dark:text-zinc-400">
							Subtotal: {formatCurrency(sub)}
                        </div>
                        <div className="text-sm text-emerald-600 dark:text-emerald-400">
							You saved {formatCurrency(saved)} 🎉
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
