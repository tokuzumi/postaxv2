/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost'],
    // Adicionar domínios do S3 posteriormente
  },
}

module.exports = nextConfig 