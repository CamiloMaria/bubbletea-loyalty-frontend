'use client'

import { useEffect, useState } from 'react'
import { customersApi } from '@/lib/api/customers'

export function Stats() {
    const [stats, setStats] = useState({
        totalCustomers: 0,
        activeCustomers: 0,
        freeDrinks: 0,
    })

    useEffect(() => {
        async function loadStats() {
            try {
                const customers = await customersApi.getAll()
                setStats({
                    totalCustomers: customers.length,
                    activeCustomers: customers.filter(c => c.totalPurchases > 0 && c.isActive).length,
                    freeDrinks: customers.filter(c => c.hasFreeDrink).length,
                })
            } catch (error) {
                console.error('Error loading stats:', error)
            }
        }

        loadStats()
    }, [])

    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500">
                    Total Clientes
                </dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                    {stats.totalCustomers}
                </dd>
            </div>
            <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500">
                    Clientes Activos
                </dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                    {stats.activeCustomers}
                </dd>
            </div>
            <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500">
                    Bebidas Gratis Pendientes
                </dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                    {stats.freeDrinks}
                </dd>
            </div>
        </div>
    )
}