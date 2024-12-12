'use client'

import { useState } from 'react'
import { Customer } from '@/lib/types/api'
import { QrCodeIcon, PlusIcon, GiftIcon, ClockIcon } from '@heroicons/react/24/outline'
import { Button } from '../ui/Button'
import { formatDate } from '@/lib/utils'
import { customersApi } from '@/lib/api/customers'
import toast from 'react-hot-toast'
import { QRModal } from './QRModal'
import { PurchaseHistory as PurchaseHistoryType } from '@/lib/types/api'
import { PurchaseHistoryModal } from './PurchaseHistoryModal'
interface CustomersTableProps {
    customers: Customer[]
    onUpdate: () => void
}

export function CustomersTable({ customers, onUpdate }: CustomersTableProps) {
    const [loadingStates, setLoadingStates] = useState<{ [key: string]: boolean }>({})
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
    const [isQRModalOpen, setIsQRModalOpen] = useState(false)
    const [selectedCustomerHistory, setSelectedCustomerHistory] = useState<PurchaseHistoryType[]>([])
    const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false)

    const handleShowHistory = async (customerId: string) => {
        try {
            const history = await customersApi.getPurchaseHistory(customerId)
            setSelectedCustomerHistory(history)
            setIsHistoryModalOpen(true)
        } catch {
            // Error manejado por el interceptor
        }
    }

    const setLoading = (customerId: string, loading: boolean) => {
        setLoadingStates(prev => ({ ...prev, [customerId]: loading }))
    }

    const handleAddPurchase = async (customerId: string) => {
        try {
            setLoading(customerId, true)
            await customersApi.addPurchase(customerId)
            toast.success('Compra registrada correctamente')
            onUpdate()
        } catch {
            // El error ya es manejado por el interceptor
        } finally {
            setLoading(customerId, false)
        }
    }

    const handleRedeemDrink = async (customerId: string) => {
        try {
            setLoading(customerId, true)
            await customersApi.redeemFreeDrink(customerId)
            toast.success('Bebida gratis canjeada correctamente')
            onUpdate()
        } catch {
            // El error ya es manejado por el interceptor
        } finally {
            setLoading(customerId, false)
        }
    }

    const handleShowQRModal = (customer: Customer) => {
        setSelectedCustomer(customer)
        setIsQRModalOpen(true)
    }

    return (
        <>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-brand-50">
                                    <tr>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                            Cliente
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Compras
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Última Visita
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Estado
                                        </th>
                                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                            <span className="sr-only">Acciones</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {customers.map((customer) => (
                                        <tr key={customer._id}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                                <div className="flex items-center">
                                                    <div>
                                                        <div className="font-medium text-gray-900">
                                                            {customer.name}
                                                        </div>
                                                        <div className="text-gray-500">
                                                            {customer.email}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <div className="text-gray-900">{customer.purchaseCount}</div>
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {formatDate(customer.updatedAt)}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {customer.hasFreeDrink ? (
                                                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                                        Bebida Gratis Disponible
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                                                        {`${customer.purchaseCount % 10} de 10`}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleAddPurchase(customer._id)}
                                                        isLoading={loadingStates[customer._id]}
                                                        disabled={loadingStates[customer._id]}
                                                    >
                                                        <PlusIcon className="h-5 w-5" />
                                                    </Button>
                                                    {customer.hasFreeDrink && (
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => handleRedeemDrink(customer._id)}
                                                            isLoading={loadingStates[customer._id]}
                                                            disabled={loadingStates[customer._id]}
                                                        >
                                                            <GiftIcon className="h-5 w-5 text-green-600" />
                                                        </Button>
                                                    )}
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleShowHistory(customer._id)}
                                                    >
                                                        <ClockIcon className="h-5 w-5" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleShowQRModal(customer)}
                                                    >
                                                        <QrCodeIcon className="h-5 w-5" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>=

            <QRModal
                customer={selectedCustomer}
                isOpen={isQRModalOpen}
                onClose={() => {
                    setIsQRModalOpen(false)
                    setSelectedCustomer(null)
                }}
            />

            <PurchaseHistoryModal
                isOpen={isHistoryModalOpen}
                onClose={() => setIsHistoryModalOpen(false)}
                history={selectedCustomerHistory}
            />
        </>
    )
}