"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink, Award } from 'lucide-react'
import { products, companyAssets } from '../../data/products'
import Header from '@/components/Header'

// Helper to convert display phone numbers to tel:+27 format
const toTelHref = (display: string) => {
  const digits = display.replace(/\D/g, '')
  const intl = digits.startsWith('0') ? `+27${digits.slice(1)}` : (digits.startsWith('27') ? `+${digits}` : `+${digits}`)
  return `tel:${intl}`
}


export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative py-20 bg-gray-900 overflow-hidden">
          {/* Animated Background (matches Home hero spotlight) */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
            <motion.div 
              className="absolute inset-0 opacity-30"
              animate={{
                background: [
                  "radial-gradient(circle at 20% 50%, #0066cc 0%, transparent 50%)",
                  "radial-gradient(circle at 80% 20%, #0084ff 0%, transparent 50%)",
                  "radial-gradient(circle at 40% 80%, #0066cc 0%, transparent 50%)"
                ]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </div>
          <div className="relative z-10 container mx-auto px-6 text-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Our Products
            </motion.h1>
            <motion.p 
              className="text-lg text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Explore our industrial-grade Direct Drive LED range. Download full specifications for each product.
            </motion.p>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16 bg-black">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, index) => {
                const implemented = new Set(['neptune', 'neptune-ex'])
                const href = implemented.has(product.id) ? `/products/${product.id}` : undefined
                const Card = (
                  <motion.div
                    key={product.id}
                    className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-orbitx-accent transition-all duration-300 group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    whileHover={{ y: -4 }}
                  >
                    <div className="h-48 relative bg-gradient-to-br from-gray-800 to-gray-900">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                      <p className="text-orbitx-accent text-sm font-medium mb-3">{product.type}</p>
                      <p className="text-gray-400 text-sm mb-4">{product.specs}</p>
                      <div className="flex items-center justify-between">
                        <motion.a
                          href={product.pdfSpec}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-orbitx-accent hover:text-white transition-colors font-medium flex items-center group"
                          whileHover={{ x: 4 }}
                          onClick={(e) => { e.stopPropagation() }}
                        >
                          View Specs <ExternalLink size={16} className="ml-1" />
                        </motion.a>
                        <div className="flex flex-wrap gap-1">
                          {product.features.slice(0, 2).map((feature, idx) => (
                            <span key={idx} className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
                return href ? (
                  <Link key={product.id} href={href} className="block focus:outline-none focus:ring-2 focus:ring-orbitx-accent rounded-xl">
                    {Card}
                  </Link>
                ) : Card
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gray-900">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-gray-300 mb-6">Need help choosing? Download our brochure or contact us.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a 
                  href={companyAssets.mainBrochure}
                  target="_blank"
                  className="px-6 py-3 bg-orbitx-accent text-black font-semibold rounded-lg hover:bg-white transition"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Download Brochure
                </motion.a>
                <motion.a 
                  href="/#contact"
                  className="px-6 py-3 border border-orbitx-accent text-orbitx-accent rounded-lg hover:bg-orbitx-accent hover:text-black transition"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Contact Us
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>
  </main>
      {/* Footer copied from home page for consistency */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="mb-4">
                <Image
                  src="/images/orbitx-logo.svg"
                  alt="OrbitX"
                  width={160}
                  height={48}
                  className="h-10 w-auto"
                />
              </div>
              <p className="text-gray-400 mb-4">
                Leading South African manufacturer of Direct Drive LED lighting solutions 
                for industrial and commercial applications.
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <Award size={16} className="mr-2" />
                <a
                  href="https://www.sabs.co.za"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orbitx-accent underline-offset-2 hover:underline"
                >
                  SABS Tested
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link href="/products" className="block text-gray-400 hover:text-orbitx-accent transition-colors">Products</Link>
                <Link href="/#about" className="block text-gray-400 hover:text-orbitx-accent transition-colors">About Us</Link>
                <Link href="/#contact" className="block text-gray-400 hover:text-orbitx-accent transition-colors">Contact</Link>
                <a href={companyAssets.mainBrochure} target="_blank" rel="noopener noreferrer" className="block text-gray-400 hover:text-orbitx-accent transition-colors">Main Brochure</a>
                <Link href="/guarantee" className="block text-gray-400 hover:text-orbitx-accent transition-colors">Guarantee</Link>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-gray-400">
                <p>
                  <a
                    href="https://maps.app.goo.gl/tWs5EBrKsQ82o4wr5"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-orbitx-accent underline-offset-2 hover:underline"
                  >
                    13 Suid Street, Southern Paarl
                  </a>
                </p>
                <p>
                  <a className="hover:text-orbitx-accent underline-offset-2 hover:underline" href="mailto:info@orbitx.co.za">info@orbitx.co.za</a>
                </p>
                <p>
                  <a className="hover:text-orbitx-accent underline-offset-2 hover:underline" href={toTelHref('+27 21 879 1483')}>+27 21 879 1483</a>
                </p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-500">
              © 2025 OrbitX Direct Drive LED Lights. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
