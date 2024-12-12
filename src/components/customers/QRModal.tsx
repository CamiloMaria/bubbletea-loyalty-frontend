'use client'

import { Fragment } from 'react'
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { QRCodeSVG } from 'qrcode.react'
import { Customer } from '@/lib/types/api'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { PurchaseProgress } from './PurchaseProgress'

interface QRModalProps {
    customer: Customer | null
    isOpen: boolean
    onClose: () => void
}

export function QRModal({ customer, isOpen, onClose }: QRModalProps) {
    if (!customer) return null

    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </TransitionChild>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                                <div className="absolute right-0 top-0 pr-4 pt-4">
                                    <button
                                        type="button"
                                        className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                                        onClick={onClose}
                                    >
                                        <span className="sr-only">Cerrar</span>
                                        <XMarkIcon className="h-6 w-6" />
                                    </button>
                                </div>
                                <div>
                                    <div className="text-center">
                                        <DialogTitle as="h3" className="text-lg font-semibold leading-6 text-gray-900">
                                            Código QR de {customer.name}
                                        </DialogTitle>
                                        <div className="mt-4 flex justify-center">
                                            <QRCodeSVG
                                                value={customer.qrCode}
                                                size={256}
                                                level="H"
                                                marginSize={10}
                                                className="border-8 border-white rounded"
                                            />
                                        </div>
                                        <div className="mt-4 text-center">
                                            <div className="flex flex-col items-center space-y-2">
                                                {customer.hasFreeDrink ? (
                                                    <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                                                        ¡Bebida Gratis Disponible!
                                                    </span>
                                                ) : (
                                                    <div className="flex flex-col items-center">
                                                        <PurchaseProgress
                                                            totalPurchases={customer.totalPurchases}
                                                            size="lg"
                                                        />
                                                        <p className="mt-2 text-sm text-gray-500">
                                                            {10 - (customer.totalPurchases % 10)} compras más para bebida gratis
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}