"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import Header from '@/components/Header'
import { ExternalLink, Award, Zap, Shield, Sun } from 'lucide-react'
import { companyAssets } from '@/data/products'

// Local helper to convert display phone numbers to tel:+27 format
const toTelHref = (display: string) => {
  const digits = display.replace(/\D/g, '')
  const intl = digits.startsWith('0') ? `+27${digits.slice(1)}` : (digits.startsWith('27') ? `+${digits}` : `+${digits}`)
  return `tel:${intl}`
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative py-20 bg-gray-900 overflow-hidden">
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
              transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
            />
          </div>
          <div className="relative z-10 container mx-auto px-6 text-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              About OrbitX
            </motion.h1>
            <motion.p 
              className="text-lg text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              South African engineering excellence delivering industrial-grade Direct Drive LED lighting since 2016.
            </motion.p>
          </div>
        </section>

        {/* About Content */}
        <section className="py-16 bg-black">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  About 
                  <span className="sr-only">OrbitX</span>
                  <span aria-hidden="true" className="inline-block align-[0.06em] md:align-[0.08em] ml-2 leading-none">
                    <Image
                      src="/images/orbitx-logo.svg"
                      alt=""
                      aria-hidden
                      width={200}
                      height={60}
                      className="h-[0.95em] md:h-[1.05em] w-auto inline-block align-middle"
                    />
                  </span>
                </h2>
                <p className="text-lg text-gray-300 mb-6">
                  With manufacturing that started in 2016 in Paarl, we currently have more than 
                  100,000 OrbitX lights in operation across South Africa, Ghana, and Zimbabwe.
                </p>
                <p className="text-lg text-gray-300 mb-6">
                  Our vision is to provide commercial and industrial lights mimicking South African 
                  sunlight along with very long lifespans, virtually no maintenance, and lifecycle 
                  costs that are lower than any other light.
                </p>
                <p className="text-lg text-gray-300 mb-8">
                  We are passionate about lighting and we understand the demanding environments of 
                  industrial, commercial, academic, mining and horticultural lighting.
                </p>
                
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orbitx-accent mb-2">100k+</div>
                    <div className="text-sm text-gray-400">Lights Deployed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orbitx-accent mb-2">8 Years</div>
                    <div className="text-sm text-gray-400">Guarantee</div>
                  </div>
                </div>

                <motion.a
                  href={companyAssets.guaranteeDocument}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-orbitx-accent text-black font-semibold rounded-lg hover:bg-white transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  View Our Guarantee <ExternalLink className="ml-2" size={18} />
                </motion.a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-orbitx-dark-blue to-black p-8 rounded-2xl">
                  <h3 className="text-2xl font-bold mb-4">Some of Our Clients</h3>
                  <div className="space-y-3 text-gray-300">
                    <p>• Rhodes Food Group</p>
                    <p>• Outdoor Warehouse</p>
                    <p>• Agrimark & Stellenpak</p>
                    <p>• Bella Frutta & City Logistics</p>
                    <p>• The Le Roux Group</p>
                    <p>• Stellenbosch University</p>
                    <p>• Cape Town University</p>
                    <p>• Atlantis Foundries</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Technology Highlights */}
        <section className="py-16 bg-gray-900">
          <div className="container mx-auto px-6">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Technology</h2>
              <p className="text-gray-300 max-w-3xl mx-auto">
                Direct Drive architecture, robust thermal design, and high-CRI optics engineered for South African conditions.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[{
                icon: <Zap className="text-orbitx-accent" size={28} />,
                title: 'Direct Drive Efficiency',
                desc: 'Fewer points of failure and superior power delivery for long service life.'
              }, {
                icon: <Shield className="text-orbitx-accent" size={28} />,
                title: 'Industrial Reliability',
                desc: 'Rugged housings, surge protection, and strict QA for harsh environments.'
              }, {
                icon: <Sun className="text-orbitx-accent" size={28} />,
                title: 'Natural Light Quality',
                desc: 'Optimized spectra and optics for visual comfort and high productivity.'
              }].map((f, i) => (
                <motion.div
                  key={f.title}
                  className="p-6 rounded-xl bg-black/50 border border-gray-800 hover:border-orbitx-accent transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="mb-4">{f.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                  <p className="text-gray-400 text-sm">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Milestones */}
        <section className="py-16 bg-black">
          <div className="container mx-auto px-6">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Our Milestones
            </motion.h2>
            <div className="max-w-3xl mx-auto space-y-6">
              {[
                { year: '2016', text: 'OrbitX founded and first Direct Drive prototypes built in Paarl.' },
                { year: '2018', text: 'Scaled local manufacturing and began national rollouts.' },
                { year: '2021', text: '100+ large installations completed across SA and neighboring countries.' },
                { year: '2024', text: 'Expanded product family with new industrial and horticultural lines.' }
              ].map((m, i) => (
                <motion.div
                  key={m.year}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  viewport={{ once: true }}
                >
                  <div className="shrink-0 w-16 text-orbitx-accent font-semibold">{m.year}</div>
                  <div className="flex-1 text-gray-300">{m.text}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
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
              <div className="text-sm text-gray-500">
                <div className="flex items-center">
                  <Award size={16} className="mr-2" />
                  <a
                    href="https://www.sabs.co.za"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-orbitx-accent underline-offset-2 hover:underline"
                  >
                    SABS Approved
                  </a>
                </div>
                <p className="pl-6 text-xs text-gray-500">Available on request</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <a href="/products" className="block text-gray-400 hover:text-orbitx-accent transition-colors">Products</a>
                <a href="/#about" className="block text-gray-400 hover:text-orbitx-accent transition-colors">About Us</a>
                <a href="/#contact" className="block text-gray-400 hover:text-orbitx-accent transition-colors">Contact</a>
                <a href={companyAssets.mainBrochure} target="_blank" rel="noopener noreferrer" className="block text-gray-400 hover:text-orbitx-accent transition-colors">Main Brochure</a>
                <a href="/guarantee" className="block text-gray-400 hover:text-orbitx-accent transition-colors">Guarantee</a>
                <a href="/sitemap" className="block text-gray-400 hover:text-orbitx-accent transition-colors">Sitemap</a>
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
