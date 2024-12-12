'use client'

import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { QRScanner } from './QRScanner'

interface QRScannerModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function QRScannerModal({ isOpen, onClose }: QRScannerModalProps) {
    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            className="relative z-50"
        >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="mx-auto max-w-sm rounded-lg bg-white p-6">
                    <DialogTitle className="text-lg font-medium mb-4">
                        Escanear Código QR
                    </DialogTitle>
                    <QRScanner onClose={onClose} />
                </DialogPanel>
            </div>
        </Dialog>
    )
}