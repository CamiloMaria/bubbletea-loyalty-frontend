'use client'

import { useEffect, useState, useCallback } from 'react'
import { Stats } from '@/components/dashboard/Stats'
import { CustomersTable } from '@/components/customers/CustomersTable'
import { Button } from '@/components/ui/Button'
import { Customer, CustomersResponse } from '@/lib/types/api'
import { customersApi } from '@/lib/api/customers'
import Link from 'next/link'
import { CustomersSearch } from '@/components/customers/CustomersSearch'
import { Pagination } from '@/components/ui/Pagination'

export default function CustomersPage() {
    const [customers, setCustomers] = useState<Customer[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [page, setPage] = useState(1)
    const [pagination, setPagination] = useState({
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0,
    })

    const loadCustomers = useCallback(async () => {
        try {
            setIsLoading(true)
            const response: CustomersResponse = await customersApi.getAll({
                search: searchTerm,
                page,
                limit: 10,
            })
            setCustomers(response.data)
            setPagination(response.pagination)
        } catch {
            // El error ya es manejado por el interceptor
        } finally {
            setIsLoading(false)
        }
    }, [page, searchTerm])

    useEffect(() => {
        loadCustomers()
    }, [loadCustomers])

    const filteredCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="space-y-6">
            <div className="sm:flex sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Clientes
                    </h1>
                    <p className="mt-2 text-sm text-gray-700">
                        Gestiona tus clientes y su programa de fidelización
                    </p>
                </div>
                <div className="mt-4 sm:mt-0">
                    <Button asChild>
                        <Link href="/customers/new">
                            Nuevo Cliente
                        </Link>
                    </Button>
                </div>
            </div>

            <Stats />

            <div className="mt-8">
                <CustomersSearch onSearch={setSearchTerm} />
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-300" />
                </div>
            ) : (
                <CustomersTable
                    customers={filteredCustomers}
                    onUpdate={loadCustomers}
                />
            )}

            <div className="mt-8">
                <Pagination
                    currentPage={pagination.page}
                    totalPages={pagination.totalPages}
                    onPageChange={setPage}
                />
            </div>
        </div>
    )
}