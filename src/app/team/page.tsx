"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import LogoSvg from '@/components/LogoSvg'
import { team } from '@/data/team'

export default function TeamPage() {
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
              Our Team
            </motion.h1>
            <motion.p 
              className="text-lg text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Meet the people behind OrbitX – engineering, building, and supporting Direct Drive LED solutions.
            </motion.p>
          </div>
        </section>

        {/* Team Grid */}
        <section className="py-16 bg-black">
          <div className="container mx-auto px-6">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
              {team.map((member, i) => (
                <motion.div
                  key={member.id}
                  className="flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.03 }}
                >
                  <div className="relative w-32 h-32 rounded-full overflow-hidden ring-2 ring-gray-800 bg-gray-800/50">
                    {member.image ? (
                      <Image src={member.image} alt={member.name} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-3xl font-semibold bg-gradient-to-br from-gray-800 to-gray-900">
                        {member.name.split(' ').map(w=>w[0]).slice(0,2).join('')}
                      </div>
                    )}
                  </div>
                  <div className="mt-4">
                    <div className="font-semibold">{member.name}</div>
                    <div className="text-sm text-gray-400">{member.role}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gray-900">
          <div className="container mx-auto px-6 text-center">
            <p className="text-gray-300 mb-6">Want to work with us?</p>
            <Link href="/#contact" className="px-6 py-3 bg-orbitx-accent text-black font-semibold rounded-lg hover:bg-white transition">Get in touch</Link>
          </div>
        </section>
  </main>

      {/* Footer (reuse from home via copy for now) */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="mb-4">
                <LogoSvg className="h-10 w-auto" />
              </div>
              <p className="text-gray-400 mb-4">
                Leading South African manufacturer of Direct Drive LED lighting solutions 
                for industrial and commercial applications.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link href="/products" className="block text-gray-400 hover:text-orbitx-accent transition-colors">Products</Link>
                <Link href="/#about" className="block text-gray-400 hover:text-orbitx-accent transition-colors">About Us</Link>
                <Link href="/#contact" className="block text-gray-400 hover:text-orbitx-accent transition-colors">Contact</Link>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <div className="space-y-2 text-gray-400">
                <p>OrbitX Direct Drive LED Lights</p>
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
