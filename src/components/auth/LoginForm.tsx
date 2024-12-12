'use client'

import { useState } from 'react'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Label } from '../ui/Label'
import { useAuth } from '@/lib/hooks/useAuth'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

interface FormErrors {
    email?: string
    password?: string
}

export function LoginForm() {
    const router = useRouter()
    const { login } = useAuth()
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState<FormErrors>({})

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)
        setErrors({})

        const formData = new FormData(e.currentTarget)
        const email = formData.get('email') as string
        const password = formData.get('password') as string

        // Validación básica
        const newErrors: FormErrors = {}
        if (!email) {
            newErrors.email = 'El email es requerido'
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email inválido'
        }
        if (!password) {
            newErrors.password = 'La contraseña es requerida'
        } else if (password.length < 6) {
            newErrors.password = 'La contraseña debe tener al menos 6 caracteres'
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            setIsLoading(false)
            return
        }

        try {
            await login({ email, password })
            router.push('/customers')
            toast.success('¡Bienvenido!')
        } catch {
            setErrors({
                email: ' ',
                password: 'Credenciales inválidas'
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-8 rounded-lg shadow-sm border border-brand-100">
            <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="correo@ejemplo.com"
                    disabled={isLoading}
                    error={errors.email}
                    autoComplete="email"
                />
            </div>

            <div className="space-y-1">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    disabled={isLoading}
                    error={errors.password}
                    autoComplete="current-password"
                />
            </div>

            <Button
                type="submit"
                className="w-full bg-brand-300 hover:bg-brand-200"
                isLoading={isLoading}
            >
                Iniciar sesión
            </Button>

            {/* Link para recuperar contraseña - implementación futura */}
            <div className="text-sm text-center">
                <a
                    href="#"
                    className="text-brand-300 hover:text-brand-200"
                    onClick={(e) => {
                        e.preventDefault()
                        toast.error('Funcionalidad no implementada')
                    }}
                >
                    ¿Olvidaste tu contraseña?
                </a>
            </div>
        </form>
    )
}