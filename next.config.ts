import NextPWA from 'next-pwa'

const withPWA = NextPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  // tus configuraciones existentes
}

export default withPWA(nextConfig)