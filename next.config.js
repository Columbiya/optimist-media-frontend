/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['localhost'],
    formats: ['image/avif', 'image/webp']
  }
}

module.exports = nextConfig
