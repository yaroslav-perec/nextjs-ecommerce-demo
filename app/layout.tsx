import React from 'react';
import type { Metadata } from 'next';
import '@/globals.css';
import Header from '@/components/Header';

export const metadata: Metadata = {
    title: 'Next.js E-commerce Demo',
    description: 'Modern e-commerce web app built with Next.js, Tailwind CSS, and Zustand using the DummyJSON API.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html
            lang="en"
            // className="dark" TODO: make it dynamic
            suppressHydrationWarning
        >
            <body>
                <Header />
                <main className="container py-6">{children}</main>
            </body>
        </html>
    );
}