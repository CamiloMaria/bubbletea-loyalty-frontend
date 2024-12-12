'use client'

// import { useEffect, useState } from 'react'
// import { Stats } from '@/components/dashboard/Stats'
// import { CustomersTable } from '@/components/customers/CustomersTable'
// import { Button } from '@/components/ui/Button'
// import { Customer } from '@/lib/types/api'
// import { customersApi } from '@/lib/api/customers'
// import Link from 'next/link'
// import { Input } from '@/components/ui/Input'
// import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export default function CustomersPage() {
    // const [customers, setCustomers] = useState<Customer[]>([])
    // const [isLoading, setIsLoading] = useState(true)
    // const [searchTerm, setSearchTerm] = useState('')

    // const loadCustomers = async () => {
    //     try {
    //         setIsLoading(true)
    //         const data = await customersApi.getAll()
    //         setCustomers(data)
    //     } catch {
    //         // El error ya es manejado por el interceptor
    //     } finally {
    //         setIsLoading(false)
    //     }
    // }

    // useEffect(() => {
    //     loadCustomers()
    // }, [])

    // const filteredCustomers = customers.filter(customer =>
    //     customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    // )

    return (
        <div>
            <h1>Clientes</h1>
        </div>
        // <div className="space-y-6">
        //     <div className="sm:flex sm:items-center sm:justify-between">
        //         <div>
        //             <h1 className="text-2xl font-semibold text-gray-900">
        //                 Clientes
        //             </h1>
        //             <p className="mt-2 text-sm text-gray-700">
        //                 Gestiona tus clientes y su programa de fidelización
        //             </p>
        //         </div>
        //         <div className="mt-4 sm:mt-0">
        //             <Button asChild>
        //                 <Link href="/customers/new">
        //                     Nuevo Cliente
        //                 </Link>
        //             </Button>
        //         </div>
        //     </div>

        //     <Stats />

        //     <div className="mt-4">
        //         <div className="max-w-sm">
        //             <div className="relative">
        //                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        //                     <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        //                 </div>
        //                 <Input
        //                     type="text"
        //                     placeholder="Buscar clientes..."
        //                     value={searchTerm}
        //                     onChange={(e) => setSearchTerm(e.target.value)}
        //                     className="pl-10"
        //                 />
        //             </div>
        //         </div>
        //     </div>

        //     {isLoading ? (
        //         <div className="flex justify-center items-center h-64">
        //             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-300" />
        //         </div>
        //     ) : (
        //         <CustomersTable
        //             customers={filteredCustomers}
        //             onUpdate={loadCustomers}
        //         />
        //     )}
        // </div>
    )
}