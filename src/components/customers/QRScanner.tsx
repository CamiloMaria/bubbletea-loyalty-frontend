'use client'

import { Html5QrcodeScanner } from 'html5-qrcode'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

interface QRScannerProps {
    onClose: () => void;
}

export function QRScanner({ onClose }: QRScannerProps) {
    const router = useRouter()

    useEffect(() => {
        const scanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 250,
                height: 250,
            },
            fps: 5,
        }, undefined)

        scanner.render(
            (decodedText) => {
                // Verificar si el código tiene el formato correcto (BT-XXXXXX)
                if (decodedText.match(/^BT-[A-Z0-9]{6}$/)) {
                    scanner.clear().then(() => {
                        onClose(); // Cerrar el modal
                        router.push(`/verify/${decodedText}`);
                    });
                } else {
                    toast.error('Código QR inválido');
                }
            },
            (error) => {
                console.error(error);
            }
        )

        return () => {
            scanner.clear();
        }
    }, [router, onClose])

    return (
        <div className="flex flex-col items-center">
            <div id="reader" className="w-full max-w-sm" />
            <p className="mt-4 text-sm text-gray-500">
                Coloca el código QR frente a la cámara
            </p>
        </div>
    )
}