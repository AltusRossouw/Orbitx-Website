/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['orbitx.co.za'],
    unoptimized: true
  },
  output: 'standalone',
  // Disable source maps in production for smaller bundle size
  productionBrowserSourceMaps: false,
}

module.exports = nextConfig
