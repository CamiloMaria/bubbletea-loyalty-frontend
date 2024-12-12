'use client'

import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { PurchaseHistory as PurchaseHistoryType } from '@/lib/types/api'
import { PurchaseHistory } from './PurchaseHistory'

interface PurchaseHistoryModalProps {
    isOpen: boolean
    onClose: () => void
    history: PurchaseHistoryType[]
}

export function PurchaseHistoryModal({ isOpen, onClose, history }: PurchaseHistoryModalProps) {
    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                {/* Overlay */}
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

                {/* Contenedor del modal */}
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Dialog.Panel className="mx-auto w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 shadow-xl transition-all">
                            <div className="flex items-center justify-between mb-4">
                                <Dialog.Title className="text-lg font-medium leading-6 text-gray-900">
                                    Historial de Compras
                                </Dialog.Title>
                                <button
                                    type="button"
                                    className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                                    onClick={onClose}
                                >
                                    <span className="sr-only">Cerrar</span>
                                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div>

                            {/* Contenido scrolleable */}
                            <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
                                <PurchaseHistory history={history} />
                            </div>
                        </Dialog.Panel>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}