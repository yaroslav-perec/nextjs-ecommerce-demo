import type { Metadata } from 'next';
import './globals.css';
import ClientLayout from '../modules/shared/components/layout/ClientLayout';

export const metadata: Metadata = {
    title: 'Next.js E-commerce Demo',
    description:
        'Modern e-commerce web app built with Next.js, Tailwind CSS, and Zustand using the DummyJSON API.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <ClientLayout>{children}</ClientLayout>
            </body>
        </html>
    );
}
