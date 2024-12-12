'use client'

import { type PurchaseHistory } from '@/lib/types/api'
import { formatDate } from '@/lib/utils'
import { GiftIcon, PlusIcon } from '@heroicons/react/24/outline'

interface PurchaseHistoryProps {
    history: PurchaseHistory[]
}

export function PurchaseHistory({ history }: PurchaseHistoryProps) {
    return (
        <div className="flow-root pr-2">
            <ul role="list" className="-mb-8">
                {history.map((event, eventIdx) => (
                    <li key={event._id}>
                        <div className="relative pb-8">
                            {eventIdx !== history.length - 1 ? (
                                <span
                                    className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                                    aria-hidden="true"
                                />
                            ) : null}
                            <div className="relative flex space-x-3">
                                <div>
                                    <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white
                                        ${event.type === 'PURCHASE' ? 'bg-brand-100' : 'bg-green-100'}`}
                                    >
                                        {event.type === 'PURCHASE' ? (
                                            <PlusIcon className="h-5 w-5 text-brand-600" aria-hidden="true" />
                                        ) : (
                                            <GiftIcon className="h-5 w-5 text-green-600" aria-hidden="true" />
                                        )}
                                    </span>
                                </div>
                                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            {event.type === 'PURCHASE' ? 'Compra registrada' : 'Bebida gratis canjeada'}{' '}
                                            <span className="font-medium text-gray-900">por {event.employeeName}</span>
                                        </p>
                                    </div>
                                    <div className="whitespace-nowrap text-right text-sm text-gray-500">
                                        {formatDate(event.createdAt)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}