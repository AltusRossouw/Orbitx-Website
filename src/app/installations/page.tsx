"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import { clientImages } from '@/data/products'
import { ArrowLeft, ExternalLink } from 'lucide-react'

export default function InstallationsPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative py-20 bg-gray-900 overflow-hidden">
          {/* Animated Background */}
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
          <div className="relative z-10 max-w-screen-2xl mx-auto px-6 lg:px-12 text-center">
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-orbitx-accent/20 border border-orbitx-accent/30 mb-6"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <ExternalLink className="w-10 h-10 text-orbitx-accent" />
            </motion.div>
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Our <span className="text-orbitx-accent">Installations</span>
            </motion.h1>
            <motion.p 
              className="text-lg text-gray-300 max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              See OrbitX LED lights in action across various industrial, commercial, and agricultural applications
            </motion.p>
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link
                href="/"
                className="inline-flex items-center px-6 py-3 bg-orbitx-accent text-black font-semibold rounded-lg hover:bg-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Home
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Installations Grid */}
        <section className="py-16 bg-black">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
            <div className="grid gap-12">
              {clientImages.map((installation, index) => (
                <motion.div
                  key={index}
                  id={installation.name.toLowerCase().replace(/\s+/g, '-')}
                  className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 shadow-lg shadow-blue-500/5 scroll-mt-20"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex flex-col items-center text-center gap-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-orbitx-accent">
                      {installation.name}
                    </h2>
                    <p className="text-xl text-gray-300 max-w-2xl">
                      {installation.description}
                    </p>
                    <div className="relative w-full max-w-4xl rounded-xl overflow-hidden border border-gray-700">
                      <div className="aspect-[4/3] relative">
                        <Image
                          src={installation.image}
                          alt={installation.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="mb-4">
                <Image src="/images/orbitx-logo.svg" alt="OrbitX" width={160} height={48} className="h-10 w-auto" />
              </div>
              <p className="text-gray-400 mb-4">Leading South African manufacturer of Direct Drive LED lighting solutions for industrial and commercial applications.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link href="/products" className="block text-gray-400 hover:text-orbitx-accent transition-colors">Products</Link>
                <Link href="/#about" className="block text-gray-400 hover:text-orbitx-accent transition-colors">About Us</Link>
                <Link href="/#contact" className="block text-gray-400 hover:text-orbitx-accent transition-colors">Contact</Link>
                <Link href="/guarantee" className="block text-gray-400 hover:text-orbitx-accent transition-colors">Guarantee</Link>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-gray-400">
                <p><a href="https://maps.app.goo.gl/tWs5EBrKsQ82o4wr5" target="_blank" rel="noopener noreferrer" className="hover:text-orbitx-accent underline-offset-2 hover:underline">13 Suid Street, Southern Paarl</a></p>
                <p><a className="hover:text-orbitx-accent underline-offset-2 hover:underline" href="mailto:info@orbitx.co.za">info@orbitx.co.za</a></p>
                <p><a className="hover:text-orbitx-accent underline-offset-2 hover:underline" href="tel:+27218791483">+27 21 879 1483</a></p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-500">© 2025 OrbitX Direct Drive LED Lights. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
