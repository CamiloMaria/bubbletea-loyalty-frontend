'use client'

import { useEffect, useState, useCallback } from 'react'
import { Customer } from '@/lib/types/api'
import { customersApi } from '@/lib/api/customers'
import { GiftIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/Button'
import toast from 'react-hot-toast'

export default function VerifyCustomer({ code }: { code: string }) {
    const [customer, setCustomer] = useState<Customer | null>(null)
    const [loading, setLoading] = useState(true)
    const [processing, setProcessing] = useState(false)

    const handleAddPurchase = async () => {
        if (!customer) return

        try {
            setProcessing(true)
            await customersApi.addPurchase(customer._id)
            await verifyCustomer()
            toast.success('Compra registrada correctamente')
        } catch {
            // Error ya manejado por el interceptor
        } finally {
            setProcessing(false)
        }
    }

    const handleRedeemDrink = async () => {
        if (!customer) return

        try {
            setProcessing(true)
            await customersApi.redeemFreeDrink(customer._id)
            await verifyCustomer() // Recargar los datos del cliente
            toast.success('Bebida gratis canjeada correctamente')
        } catch {
            // Error ya manejado por el interceptor
        } finally {
            setProcessing(false)
        }
    }

    const verifyCustomer = useCallback(async () => {
        try {
            const data = await customersApi.verifyQR(code)
            setCustomer(data)
        } catch {
            toast.error('Código QR inválido')
        } finally {
            setLoading(false)
        }
    }, [code])

    useEffect(() => {
        verifyCustomer()
    }, [verifyCustomer])


    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-300" />
            </div>
        )
    }

    if (!customer) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900">Código QR inválido</h1>
                    <p className="mt-2 text-gray-600">El código escaneado no es válido o ha expirado.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white shadow rounded-lg p-6">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900">{customer.name}</h1>
                    <p className="text-gray-600">{customer.email}</p>

                    <div className="mt-6 space-y-4">
                        <div className="bg-brand-50 rounded-lg p-4">
                            <p className="text-lg font-medium text-gray-900">
                                Compras realizadas: {customer.totalPurchases}
                            </p>
                            <p className="text-sm text-gray-600">
                                {customer.hasFreeDrink ? (
                                    <span className="text-green-600 font-medium">
                                        ¡Bebida gratis disponible!
                                    </span>
                                ) : (
                                    `${customer.totalPurchases % 10} de 10 para bebida gratis`
                                )}
                            </p>
                        </div>

                        <div className="space-y-3">
                            <Button
                                onClick={handleAddPurchase}
                                className="w-full"
                                isLoading={processing}
                                disabled={processing}
                            >
                                <CheckCircleIcon className="h-5 w-5 mr-2" />
                                Registrar Compra
                            </Button>

                            {customer.hasFreeDrink && (
                                <Button
                                    onClick={handleRedeemDrink}
                                    variant="outline"
                                    className="w-full"
                                    isLoading={processing}
                                    disabled={processing}
                                >
                                    <GiftIcon className="h-5 w-5 mr-2" />
                                    Canjear Bebida Gratis
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 