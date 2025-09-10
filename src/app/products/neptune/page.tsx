"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import { ExternalLink, Award } from 'lucide-react'
import { products, companyAssets } from '@/data/products'

// Helper to convert SA numbers like "021 879 1483" to tel:+27 format (used in footer)
const toTelHref = (display: string) => {
  const digits = display.replace(/\D/g, '')
  const intl = digits.startsWith('0') ? `+27${digits.slice(1)}` : (digits.startsWith('27') ? `+${digits}` : `+${digits}`)
  return `tel:${intl}`
}

export default function NeptuneProductPage() {
  const neptune = products.find(p => p.id === 'neptune')
  const image = neptune?.image || '/images/products/Neptune-800x416.png'
  const specPdf = neptune?.pdfSpec || '/pdfs/OrbitX-Neptune-specifications.pdf'

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative py-16 md:py-20 bg-gray-900 overflow-hidden">
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
          <div className="relative z-10 container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <motion.h1 
                  className="text-3xl md:text-5xl font-bold mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Neptune
                </motion.h1>
                <p className="text-orbitx-accent text-sm font-medium mb-3">INTEGRATED IP65 LINEAR LED LIGHT</p>
                <motion.p 
                  className="text-lg text-gray-300 mb-6 max-w-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  Weather-resistant integrated LED lighting built on OrbitX Direct Drive technology. Dust, moisture and vapour proof for demanding environments.
                </motion.p>
                <div className="flex flex-wrap gap-3">
                  <motion.a
                    href={specPdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-orbitx-accent text-black font-semibold rounded-lg hover:bg-white transition-colors inline-flex items-center">
                    Download Specs <ExternalLink size={18} className="ml-2" />
                  </motion.a>
                  <Link href="/products" className="px-6 py-3 border border-gray-700 rounded-lg hover:border-orbitx-accent hover:text-orbitx-accent transition-colors">
                    Back to Products
                  </Link>
                </div>
              </div>
              <motion.div 
                className="relative h-56 md:h-72 lg:h-80 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-800 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Image src={image} alt="Neptune" fill className="object-contain p-6" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Configurations & Performance */}
        <section className="py-12 bg-black">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Configurations & Performance</h2>
            <div className="overflow-x-auto rounded-xl border border-gray-800">
              <table className="min-w-full bg-gray-900 text-sm">
                <thead className="bg-gray-800 text-gray-300">
                  <tr>
                    <th className="text-left p-3 font-semibold">Length</th>
                    <th className="text-center p-3 font-semibold">Power (W)</th>
                    <th className="text-center p-3 font-semibold">Luminous Flux (lm)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {[
                    ['600 mm', '9', '1000'],
                    ['', '18', '2000'],
                    ['', '27', '3000'],
                    ['', '36', '4000'],
                    ['', '45', '5000'],
                    ['1200 mm', '16', '2000'],
                    ['', '32', '4000'],
                    ['', '48', '6000'],
                    ['', '64', '8000'],
                    ['', '80', '10000'],
                    ['1200 mm*', '96', '12000'],
                    ['', '112', '15000'],
                    ['', '128', '17000'],
                    ['1500 mm', '19', '2200'],
                    ['', '38', '4400'],
                    ['', '57', '6600'],
                    ['', '76', '8800'],
                    ['2400 mm', '32', '4000'],
                    ['', '64', '8000'],
                    ['', '96', '12000']
                  ].map((row, i) => (
                    <tr key={i} className="text-gray-300">
                      <td className="p-3">{row[0]}</td>
                      <td className="p-3 text-center">{row[1]}</td>
                      <td className="p-3 text-center">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-gray-500 text-xs mt-2">* Indicates the Neptune Supersize housing.</p>
          </div>
        </section>

        {/* Specs Sections */}
        <section className="py-12 bg-gray-900">
          <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              <SpecCard title="Guarantee & Lifetime" items={[
                'Operational Guarantee: 8 years (365d x 24h)',
                'Light Output Guarantee: 5 years (365d x 24h)',
                'Nominal Lifetime (L70): 70,000 hours',
                'Testing Standards: IES LM-80, TM-21'
              ]} />

              <SpecCard title="Photometric Data" items={[
                'Luminous Efficacy: 135 lm/W',
                'Correlated Colour Temperature (CCT): 5000K (options available)',
                'Colour Rendering Index (CRI): 83',
                'Gamut Area Index (GAI): 96',
                'Light Quality: Type A compliant (Lighting Research Centre, New York)',
                'Beam Angle: 120°',
                'Stroboscopic Effect (100Hz): 80% flicker free (complies with OHS and MHS Act)'
              ]} />

              <SpecCard title="Electrical Data" items={[
                'Power: See Configurations table',
                'Power Factor: >0.98',
                'Operating Voltage: 220-240V AC',
                'Minimum Sustained Voltage: No minimum limit, operational from 150V',
                'Maximum Sustained Voltage: 250V for 2 minutes',
                'On/Off Switching: Unlimited',
                'Delay to Full Brightness: Immediate'
              ]} />
            </div>

            <div className="space-y-6">
              <SpecCard title="Temperature" items={[
                'Max Ambient Temperature (T Ambient): +35°C',
                'Min Ambient Temperature (T Ambient): -40°C'
              ]} />

              <SpecCard title="Safety & Compliance" items={[
                'Risk of Breakage: Low, polycarbonate housing extruded to 1mm (no glass)',
                'Electrical Standards: IEC60598-1, IEC60598-2-5 compliant',
                'Surge Protection: 1.5kV',
                'Fire Rating: UL-94 VO compliant (no flaming droplets)',
                'IP Rating: IP65',
                'SABS: Safety tests passed'
              ]} />

              <SpecCard title="Interference Compliance" items={[
                'WiFi, Barcode Scanner, Radio Frequency: No interference',
                'Standards: IEC 61547, SANS 215 (CISPR15) compliant',
                'Total Harmonic Distortion: IEC 61000-3-2 Class C Compliant'
              ]} />

              <SpecCard title="Additional Options" items={[
                'Optional Battery Backup: Output 1000 lm for 4h; 6h charge; 1y guarantee',
                'Optional Variable Switching: 2 Live inputs, 1 Neutral (e.g., 80W split into 32/48/80W)',
                'Optional Radar Motion Sensor: Programmable sensitivity and time on'
              ]} />
            </div>
          </div>
        </section>

        {/* Model Codes & Packaging */}
        <section className="py-12 bg-black">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Model Codes & Packaging</h2>
            <div className="overflow-x-auto rounded-xl border border-gray-800">
              <table className="min-w-full bg-gray-900 text-sm">
                <thead className="bg-gray-800 text-gray-300">
                  <tr>
                    <th className="text-left p-3 font-semibold">Model Code</th>
                    <th className="text-center p-3 font-semibold">Length (mm)</th>
                    <th className="text-center p-3 font-semibold">Power Rating</th>
                    <th className="text-center p-3 font-semibold">Units/Box</th>
                    <th className="text-left p-3 font-semibold">Box Dimensions (l × w × h mm)</th>
                    <th className="text-center p-3 font-semibold">Weight (kg)</th>
                    <th className="text-left p-3 font-semibold">IES Files</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800 text-gray-300">
                  {[
                    ['OXNT0600095', '600', '9 W', '8', '1280 × 185 × 185', '6.92'],
                    ['OXNT0600185', '600', '18 W', '8', '1280 × 185 × 185', '7.08'],
                    ['OXNT0600275', '600', '27 W', '8', '1280 × 185 × 185', '7.23'],
                    ['OXNT0600365', '600', '36 W', '8', '1280 × 185 × 185', '7.38'],
                    ['OXNT0600455', '600', '45 W', '8', '1280 × 185 × 185', '7.53'],
                    ['OXNT1200165', '1200', '16 W', '4', '1280 × 185 × 185', '6.56'],
                    ['OXNT1200325', '1200', '32 W', '4', '1280 × 185 × 185', '6.71'],
                    ['OXNT1200485', '1200', '48 W', '4', '1280 × 185 × 185', '6.86'],
                    ['OXNT1200645', '1200', '64 W', '4', '1280 × 185 × 185', '7.04'],
                    ['OXNT1200805', '1200', '80 W', '4', '1280 × 185 × 185', '7.64'],
                    ['OXNT1200965', '1200', '96 W', '4', '1280 × 185 × 185', '8.08'],
                    ['OXNT12001125', '1200', '112 W', '4', '1280 × 185 × 185', '8.23'],
                    ['OXNT12001285', '1200', '128 W', '4', '1280 × 185 × 185', '8.38'],
                    ['OXNT1500195', '1500', '19 W', '4', '1850 × 185 × 185', '8.19'],
                    ['OXNT1500385', '1500', '38 W', '4', '1850 × 185 × 185', '8.37'],
                    ['OXNT1500575', '1500', '57 W', '4', '1850 × 185 × 185', '8.55'],
                    ['OXNT1500765', '1500', '76 W', '4', '1850 × 185 × 185', '8.78'],
                    ['OXNT2400325', '2400', '32 W', '4', '2480 × 185 × 185', '13.12'],
                    ['OXNT2400645', '2400', '64 W', '4', '2480 × 185 × 185', '13.42'],
                    ['OXNT2400965', '2400', '96 W', '4', '2480 × 185 × 185', '13.72']
                  ].map((row, i) => (
                    <tr key={i}>
                      <td className="p-3">{row[0]}</td>
                      <td className="p-3 text-center">{row[1]}</td>
                      <td className="p-3 text-center">{row[2]}</td>
                      <td className="p-3 text-center">{row[3]}</td>
                      <td className="p-3">{row[4]}</td>
                      <td className="p-3 text-center">{row[5]}</td>
                      <td className="p-3">
                        <a className="text-orbitx-accent hover:underline" href={specPdf} target="_blank" rel="noopener noreferrer">Click to download</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-gray-500 text-xs mt-2">Specification tolerance: ±10%</p>
          </div>
        </section>
      </main>

      {/* Footer (same structure as other pages) */}
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
                  SABS approved
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
            <p className="text-gray-500">© 2025 OrbitX Direct Drive LED Lights. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function SpecCard({ title, items }: { title: string, items: string[] }) {
  return (
    <div className="bg-black/50 border border-gray-800 rounded-xl p-6">
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <ul className="list-disc list-inside text-gray-300 space-y-1">
        {items.map((it, i) => (
          <li key={i}>{it}</li>
        ))}
      </ul>
    </div>
  )
}
