'use client'

import { useAuth } from '@/lib/hooks/useAuth'
import { useEffect, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { PurchaseProgress } from '@/components/customers/PurchaseProgress'
import { customersApi } from '@/lib/api/customers'
import type { Customer } from '@/lib/types/api'

export default function CustomerHomePage() {
    const { user, isLoading: isAuthLoading, checkAuth } = useAuth()
    const [customerData, setCustomerData] = useState<Customer | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    // Primero verificamos la autenticación
    useEffect(() => {
        checkAuth()
    }, [checkAuth])

    // Luego cargamos los datos del cliente cuando tengamos el usuario
    useEffect(() => {
        async function loadCustomerData() {
            if (!user?.id) return
            try {
                const data = await customersApi.getOne(user.id)
                setCustomerData(data)
            } catch (error) {
                console.error('Error loading customer data:', error)
            } finally {
                setIsLoading(false)
            }
        }

        if (user) {
            loadCustomerData()
        }
    }, [user])

    // Mostramos el spinner mientras se carga la autenticación o los datos
    if (isAuthLoading || isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-brand-50 to-white">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-300" />
            </div>
        )
    }

    // Si no hay usuario autenticado, mostramos un mensaje
    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-brand-50 to-white p-4">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">No autorizado</h1>
                    <p className="text-gray-600">Por favor, inicia sesión para continuar</p>
                </div>
            </div>
        )
    }

    // Si no se pudieron cargar los datos del cliente
    if (!customerData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-brand-50 to-white p-4">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Error</h1>
                    <p className="text-gray-600">No se pudo cargar la información del cliente</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-brand-50 to-white">
            <main className="max-w-lg mx-auto px-4 py-8">
                {/* Resto del código igual... */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Encabezado */}
                    <div className="px-6 py-8 bg-brand-100">
                        <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">
                            ¡Hola, {customerData.name}!
                        </h1>
                        <p className="text-center text-gray-600">
                            Muestra este código para acumular puntos
                        </p>
                    </div>

                    {/* Código QR */}
                    <div className="p-8 flex justify-center">
                        <div className="bg-white p-4 rounded-xl shadow-inner">
                            <QRCodeSVG
                                value={customerData.qrCode}
                                size={200}
                                level="H"
                                marginSize={4}
                            />
                        </div>
                    </div>

                    {/* Progreso */}
                    <div className="px-6 pb-8">
                        <div className="bg-gray-50 rounded-xl p-6">
                            <div className="flex justify-center mb-4">
                                <PurchaseProgress
                                    totalPurchases={customerData.totalPurchases}
                                    size="lg"
                                />
                            </div>

                            {customerData.hasFreeDrink ? (
                                <div className="text-center">
                                    <span className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-800 text-sm font-medium">
                                        ¡Tienes una bebida gratis disponible! 🎉
                                    </span>
                                </div>
                            ) : (
                                <p className="text-center text-gray-600">
                                    {10 - (customerData.totalPurchases % 10)} compras más para tu bebida gratis
                                </p>
                            )}

                            <div className="mt-4 grid grid-cols-2 gap-4 text-center">
                                <div className="bg-white p-4 rounded-lg shadow-sm">
                                    <p className="text-gray-500 text-sm">Total Compras</p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {customerData.totalPurchases}
                                    </p>
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow-sm">
                                    <p className="text-gray-500 text-sm">Bebidas Gratis</p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {Math.floor(customerData.totalPurchases / 10)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}