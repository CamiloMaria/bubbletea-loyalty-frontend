'use client';

import { useEffect, useState } from 'react';
import LoyaltyCard from '@/components/dashboard/LoyaltyCard';
import { customersApi } from '@/lib/api/customers';
import type { Customer } from '@/lib/types/api';
import { useAuth } from '@/lib/hooks/useAuth';

export default function Home() {
    const { user, isLoading: isAuthLoading, checkAuth } = useAuth();
    const [profileData, setProfileData] = useState<Customer | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    useEffect(() => {
        async function loadProfileData() {
            if (!user?.id) return;

            try {
                setLoading(true);
                const customerData = await customersApi.getOne(user.id);
                setProfileData(customerData);
            } catch (err) {
                setError('Error al cargar los datos del perfil');
                console.error('Error loading profile:', err);
            } finally {
                setLoading(false);
            }
        }

        if (user) {
            loadProfileData();
        }
    }, [user]);

    if (isAuthLoading || loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-gray-600">Cargando perfil...</div>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                    No has iniciado sesión
                </div>
            </div>
        );
    }

    if (error || !profileData) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                    {error || 'No se pudo cargar el perfil'}
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Mi Perfil de Fidelidad</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-1">
                    <LoyaltyCard
                        userId={profileData._id}
                        currentDrinks={profileData.totalPurchases}
                        drinksForReward={10}
                    />
                </div>

                <div className="col-span-1 bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Resumen de Fidelidad</h2>
                    <div className="space-y-4">
                        <div>
                            <p className="text-gray-600">Bebidas compradas</p>
                            <p className="text-2xl font-bold">{profileData.totalPurchases}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Bebidas para próxima recompensa</p>
                            <p className="text-2xl font-bold">
                                {Math.max(0, 10 - profileData.totalPurchases)}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-600">Bebida gratis disponible</p>
                            <p className="text-2xl font-bold">{profileData.hasFreeDrink ? 'Si' : 'No'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 