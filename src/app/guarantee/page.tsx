"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import { companyAssets } from '../../data/products'
import { Shield, Clock, Wrench, AlertTriangle, FileText, Award } from 'lucide-react'

export default function GuaranteePage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative py-20 bg-gray-900 overflow-hidden">
          {/* Animated Background (matches other pages) */}
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
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-orbitx-accent/20 border border-orbitx-accent/30 mb-6"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Shield className="w-10 h-10 text-orbitx-accent" />
            </motion.div>
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              OrbitX Guarantee
            </motion.h1>
            <motion.p 
              className="text-lg text-gray-300 max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Your assurance of quality and reliability with our Direct Drive LED lighting solutions
            </motion.p>
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link
                href={companyAssets.guaranteeDocument}
                target="_blank"
                className="inline-flex items-center px-6 py-3 bg-orbitx-accent text-black font-semibold rounded-lg hover:bg-white transition-colors"
              >
                <FileText className="w-5 h-5 mr-2" />
                Download Full Guarantee (PDF)
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Overview Cards */}
        <section className="py-16 bg-black">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <motion.div 
                className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 mb-4">
                  <Clock className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Up to 8 Years</h3>
                <p className="text-gray-400">Operational guarantee for Direct Drive LED products</p>
              </motion.div>

              <motion.div 
                className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/20 border border-blue-500/30 mb-4">
                  <Award className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">70% Light Output</h3>
                <p className="text-gray-400">Guaranteed lumen maintenance for up to 5 years</p>
              </motion.div>

              <motion.div 
                className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orbitx-accent/20 border border-orbitx-accent/30 mb-4">
                  <Wrench className="w-8 h-8 text-orbitx-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Free Repairs</h3>
                <p className="text-gray-400">No charge repairs or replacements during guarantee period</p>
              </motion.div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto space-y-12">
              
              {/* Introduction */}
              <motion.div
                className="bg-gray-900/50 border border-gray-800 rounded-xl p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-orbitx-accent/20 border border-orbitx-accent/30 flex items-center justify-center">
                      <Shield className="w-6 h-6 text-orbitx-accent" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Guarantee Coverage</h2>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      OrbitX provides the following guarantee, which extends to the purchaser of the OrbitX product who purchased directly from OrbitX or from an authorised OrbitX reseller.
                    </p>
                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-yellow-200 font-medium mb-1">Important Requirement</p>
                          <p className="text-yellow-100 text-sm">
                            All guarantee services require your <strong>invoice number</strong> (serves as guarantee number) and the product&#39;s <strong>serial number</strong>. Please retain your invoice as no guarantee service will be provided without this information.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Coverage Periods */}
              <motion.div
                className="bg-gray-900/50 border border-gray-800 rounded-xl p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                      <Clock className="w-6 h-6 text-green-400" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-6">Coverage Periods</h2>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-orbitx-accent mb-3">Operational Guarantee</h3>
                        <p className="text-gray-300 mb-4">Products are guaranteed free of defects in materials or workmanship:</p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-black/30 rounded-lg p-4 border border-gray-700">
                            <h4 className="font-semibold text-green-400 mb-2">8 Years</h4>
                            <ul className="text-sm text-gray-300 space-y-1">
                              <li>• Neptune & Phoebe Integrated LED Luminaires</li>
                              <li>• Battery backup - OrbitX dc to dc converter</li>
                            </ul>
                          </div>
                          <div className="bg-black/30 rounded-lg p-4 border border-gray-700">
                            <h4 className="font-semibold text-blue-400 mb-2">6 Years</h4>
                            <ul className="text-sm text-gray-300 space-y-1">
                              <li>• Titan, Puck, Rhea & Geminus luminaires</li>
                              <li>• Tube lamps</li>
                            </ul>
                          </div>
                          <div className="bg-black/30 rounded-lg p-4 border border-gray-700">
                            <h4 className="font-semibold text-yellow-400 mb-2">5 Years</h4>
                            <ul className="text-sm text-gray-300 space-y-1">
                              <li>• Integrated LED flood lights</li>
                              <li>• Battery backup - 3rd party dc to dc converter</li>
                            </ul>
                          </div>
                          <div className="bg-black/30 rounded-lg p-4 border border-gray-700">
                            <h4 className="font-semibold text-gray-400 mb-2">1 Year</h4>
                            <ul className="text-sm text-gray-300 space-y-1">
                              <li>• Battery backup - lithium battery</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-orbitx-accent mb-3">Light Output Guarantee</h3>
                        <p className="text-gray-300 mb-4">Guaranteed minimum 70% of original light output:</p>
                        <div className="grid md:grid-cols-3 gap-4">
                          <div className="bg-black/30 rounded-lg p-4 border border-gray-700">
                            <h4 className="font-semibold text-green-400 mb-2">5 Years</h4>
                            <p className="text-sm text-gray-300">Neptune & Phoebe Integrated LED Luminaires</p>
                          </div>
                          <div className="bg-black/30 rounded-lg p-4 border border-gray-700">
                            <h4 className="font-semibold text-blue-400 mb-2">3 Years</h4>
                            <p className="text-sm text-gray-300">Titan, Puck, Rhea, Geminus & Tube lamps</p>
                          </div>
                          <div className="bg-black/30 rounded-lg p-4 border border-gray-700">
                            <h4 className="font-semibold text-yellow-400 mb-2">3 Years</h4>
                            <p className="text-sm text-gray-300">Integrated LED flood lights</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Service Details */}
              <motion.div
                className="bg-gray-900/50 border border-gray-800 rounded-xl p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-orbitx-accent/20 border border-orbitx-accent/30 flex items-center justify-center">
                      <Wrench className="w-6 h-6 text-orbitx-accent" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Service Terms</h2>
                    <div className="space-y-4 text-gray-300">
                      <p className="leading-relaxed">
                        During the guarantee period, OrbitX will repair or replace defective parts with new or reconditioned parts at OrbitX&#39;s option, without charge to the purchaser.
                      </p>
                      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-300 mb-2">Shipping Policy</h4>
                        <ul className="text-blue-100 text-sm space-y-1">
                          <li>• <strong>First 60 days:</strong> OrbitX covers all shipping fees</li>
                          <li>• <strong>After 60 days:</strong> Customer covers shipping fees both ways</li>
                        </ul>
                      </div>
                      <p className="text-sm">
                        All original parts replaced become OrbitX property. After-market modifications void the guarantee. Purchaser is responsible for removal/reinstallation costs.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Exclusions */}
              <motion.div
                className="bg-gray-900/50 border border-gray-800 rounded-xl p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-red-500/20 border border-red-500/30 flex items-center justify-center">
                      <AlertTriangle className="w-6 h-6 text-red-400" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Exclusions & Limitations</h2>
                    <div className="space-y-4">
                      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                        <h4 className="font-semibold text-red-300 mb-3">Guarantee Does Not Cover:</h4>
                        <ul className="text-red-100 text-sm space-y-2">
                          <li>• Force majeure, misuse, or improper installation</li>
                          <li>• Poor electrical connections or negligence by other parties</li>
                          <li>• Non-compliance with OrbitX specifications or NRS048 standards</li>
                          <li>• Voltage surges exceeding 1500V (visible MOV damage)</li>
                          <li>• Third-party components not supplied by OrbitX</li>
                          <li>• Abnormal operating conditions or customer arrears</li>
                        </ul>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-300 mb-2">Liability Limitation</h4>
                        <p className="text-gray-400 text-sm">
                          OrbitX liability is limited to the original purchase price. No liability for commercial losses, business interruption, or consequential damages.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Governing Law */}
              <motion.div
                className="bg-gray-900/50 border border-gray-800 rounded-xl p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-gray-600/20 border border-gray-600/30 flex items-center justify-center">
                      <FileText className="w-6 h-6 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Governing Law</h2>
                    <p className="text-gray-300 leading-relaxed">
                      All terms and provisions of this guarantee are governed by South African law, regardless of conflicts of law principles of any jurisdiction.
                    </p>
                  </div>
                </div>
              </motion.div>

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
              <div className="flex items-center text-sm text-gray-500">
                <Award size={16} className="mr-2" />
                <a href="https://www.sabs.co.za" target="_blank" rel="noopener noreferrer" className="hover:text-orbitx-accent underline-offset-2 hover:underline">SABS Tested</a>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link href="/products" className="block text-gray-400 hover:text-orbitx-accent transition-colors">Products</Link>
                <Link href="/#about" className="block text-gray-400 hover:text-orbitx-accent transition-colors">About Us</Link>
                <Link href="/#contact" className="block text-gray-400 hover:text-orbitx-accent transition-colors">Contact</Link>
                <a href={companyAssets.mainBrochure} target="_blank" rel="noopener noreferrer" className="block text-gray-400 hover:text-orbitx-accent transition-colors">Main Brochure</a>
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