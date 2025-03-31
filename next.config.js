/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost'],
    // Adicionar domínios do S3 posteriormente
  },
  // Otimizar configurações do servidor
  experimental: {
    optimizeCss: false,
    optimizePackageImports: ['@radix-ui/*', 'lucide-react'],
  },
  // Configurações de cache
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  // Configurações de produção
  poweredByHeader: false,
  compress: true,
  generateEtags: true,
  // Configurações de build
  distDir: '.next',
  generateBuildId: async () => {
    return 'postax-' + Date.now()
  }
}

module.exports = nextConfig 
