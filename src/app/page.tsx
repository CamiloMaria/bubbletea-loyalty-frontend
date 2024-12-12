import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-white to-gray-100">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 sm:px-20 text-center">
        <div className="flex justify-center mb-8">
          <Image
            src="/logo.png"
            alt="BubbleTea Logo"
            width={120}
            height={120}
            priority
            className="rounded-2xl"
          />
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-4">
          BubbleTea Loyalty
        </h1>

        <p className="text-xl sm:text-2xl text-gray-600 mb-8">
          Sistema de fidelización para amantes del BubbleTea
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg">
            <Link href="/login" className="min-w-[200px]">
              Iniciar Sesión
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
          >
            <a
              href="https://tububbletea.com"
              target="_blank"
              rel="noopener noreferrer"
              className="min-w-[200px]"
            >
              Visitar Tienda
            </a>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mt-16">
          <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Fidelización</h2>
            <p className="text-gray-600">
              Acumula puntos con cada compra y obtén bebidas gratis
            </p>
          </div>

          <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
            <h2 className="text-xl font-semibold mb-2">QR Code</h2>
            <p className="text-gray-600">
              Sistema fácil de usar con códigos QR personalizados
            </p>
          </div>

          <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Recompensas</h2>
            <p className="text-gray-600">
              Disfruta de beneficios exclusivos para clientes frecuentes
            </p>
          </div>
        </div>
      </main>

      <footer className="w-full border-t border-gray-200 py-6">
        <div className="flex justify-center items-center text-sm text-gray-500">
          <p>© 2024 BubbleTea Loyalty. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}