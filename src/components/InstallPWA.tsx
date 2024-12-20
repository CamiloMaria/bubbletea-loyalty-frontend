'use client'

import { useEffect, useState } from 'react'
import { Button } from './ui/Button'

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function InstallPWA() {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
    const [showInstallButton, setShowInstallButton] = useState(false)

    useEffect(() => {
        const handler = (e: BeforeInstallPromptEvent) => {
            e.preventDefault()
            setDeferredPrompt(e)
            setShowInstallButton(true)
        }

        window.addEventListener('beforeinstallprompt', handler as EventListener)

        return () => {
            window.removeEventListener('beforeinstallprompt', handler as EventListener)
        }
    }, [])

    const handleInstallClick = async () => {
        if (!deferredPrompt) return

        deferredPrompt.prompt()
        const { outcome } = await deferredPrompt.userChoice

        if (outcome === 'accepted') {
            setDeferredPrompt(null)
            setShowInstallButton(false)
        }
    }

    if (!showInstallButton) return null

    return (
        <Button
            onClick={handleInstallClick}
            className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50"
        >
            Instalar App
        </Button>
    )
} 