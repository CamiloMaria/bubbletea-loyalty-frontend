import NextPWA from 'next-pwa'

const withPWA = NextPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  // Asegúrate de que todas las rutas estén correctamente configuradas
  async redirects() {
    return []
  }
}

export default withPWA(nextConfig)