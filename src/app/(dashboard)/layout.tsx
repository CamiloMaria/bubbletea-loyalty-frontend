'use client';

import { useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { Navbar } from '@/components/layout/Navbar';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { checkAuth } = useAuth();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="py-10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {children}
                </div>
            </main>
        </div>
    )
}