export default function ProductSkeleton() {
    return (
        <div className="flex flex-col justify-between rounded-2xl border border-zinc-200 p-3 dark:border-zinc-800 animate-pulse">
            <div className="aspect-[4/3] rounded-xl bg-zinc-200 dark:bg-zinc-800 mb-3" />
            <div className="space-y-2">
                <div className="h-3 w-1/3 bg-zinc-300 dark:bg-zinc-700 rounded" />
                <div className="h-4 w-2/3 bg-zinc-300 dark:bg-zinc-700 rounded" />
                <div className="h-5 w-1/4 bg-zinc-300 dark:bg-zinc-700 rounded mt-2" />
            </div>
            <div className="mt-3 h-9 bg-zinc-300 dark:bg-zinc-700 rounded-lg" />
        </div>
    );
}
