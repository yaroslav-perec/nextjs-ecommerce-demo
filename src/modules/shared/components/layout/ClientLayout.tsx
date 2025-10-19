'use client';

import React from 'react';
import { ThemeProvider } from 'next-themes';
import Header from './Header';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Header />
            <main className="container py-6">{children}</main>
        </ThemeProvider>
    );
}
