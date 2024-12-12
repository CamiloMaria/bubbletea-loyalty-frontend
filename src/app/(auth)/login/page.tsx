import { LoginForm } from '@/components/auth/LoginForm'
import Image from 'next/image'

export default function LoginPage() {
    return (
        <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <Image
                        src="/logo.png"
                        alt="BubbleTea Logo"
                        width={64}
                        height={64}
                        priority
                    />
                </div>

                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                    BubbleTea Loyalty
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Sistema de fidelización
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <LoginForm />
                </div>
            </div>
        </div>
    )
}