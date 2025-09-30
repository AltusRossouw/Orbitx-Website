/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['orbitx.co.za'],
    unoptimized: true,
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000, // 1 year
  },
  output: 'standalone',
  // Disable source maps in production for smaller bundle size
  productionBrowserSourceMaps: false,
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}

module.exports = nextConfig
