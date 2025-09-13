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

export default function NeptuneExProductPage() {
  const ex = products.find(p => p.id === 'neptune-ex')
  const image = ex?.image || '/images/products/91of1-800x533.png'
  const specPdf = ex?.pdfSpec || '/pdfs/OrbitX-Neptune-Ex-specifications.pdf'
  const name = ex?.name || 'Neptune Ex Rated'
  const type = ex?.type || 'INTEGRATED IP68 LINEAR LED LIGHT'
  // IES mapping for EX variants present in docs
  const IES_BASE = '/products/neptune-ex/docs/'
  const iesFiles: Record<string, string> = {
    // 1200mm
    '1200-16': 'OrbitX Neptune EX 1200mm 16W.ies',
    '1200-32': 'OrbitX Neptune EX 1200mm 32W.ies',
    '1200-48': 'OrbitX Neptune EX 1200mm 48W.ies',
    '1200-64': 'OrbitX Neptune EX 1200mm 64W.ies',
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section id="neptune-ex" className="relative py-16 md:py-20 bg-gray-900 overflow-hidden">
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
                  {name}
                </motion.h1>
                <p className="text-orbitx-accent text-sm font-medium mb-3">{type}</p>
                <motion.p 
                  className="text-lg text-gray-300 mb-6 max-w-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  OrbitX Direct Drive Technology onboard. Explosion protected for hazardous areas. Zone 2: Ex ec IIC T5 Gc IP68. Zones 21 and 22: Ex tb IIIC T85 °C Db IP68.
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
                <Image src={image} alt={name} fill className="object-contain p-6" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Specs Sections */}
        <section className="py-12 bg-black">
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
                'Explosion protection: Ex ec IIC T5 Gc IP68 & Ex tb IIIC T85 °C Db IP68'
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
                'Fire Rating: UL-94 V0 compliant (no flaming droplets)',
                'IP Rating: IP68',
                'SABS: Safety tests passed'
              ]} />

              <SpecCard title="Interference Compliance" items={[
                'WiFi, Barcode Scanner, Radio Frequency: No interference',
                'Standards: IEC 61547, SANS 215 (CISPR15) compliant',
                'Total Harmonic Distortion: IEC 61000-3-2 Class D Compliant'
              ]} />

              <SpecCard title="Additional Options" items={[
                'Optional Battery Backup: Output 1000 lm for 4h; 6h charge; 1y guarantee',
                'Optional Variable Switching: 2 Live inputs, 1 Neutral (e.g., 80W split into 32/48/80W)',
                'Optional Radar Motion Sensor: Programmable sensitivity and time on'
              ]} />
            </div>
          </div>
        </section>

        {/* Dimensions */}
        <section className="py-12 bg-gray-900">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Dimensions</h2>
            <div className="relative rounded-xl border border-gray-800 bg-black overflow-hidden">
              <div className="relative w-full h-72 md:h-96">
                <Image
                  src="/products/neptune-ex/images/neptune-ex-dimensions.png"
                  alt="Neptune Ex Rated dimensions"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Graphs */}
        <section id="graphs" className="py-12 bg-black">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Graphs</h2>
            <div className="grid lg:grid-cols-2 gap-8">
              <GraphCard id="survival-curve" title="Light Survival Rate Curve" subtitle="Time (×1000 h) vs Light Survival (%)">
                <SurvivalCurve />
              </GraphCard>
              <GraphCard id="lumen-maintenance" title="Lumen Maintenance Curve (L70)" subtitle="Time (×1000 h) vs Lumen Output (%)">
                <LumenMaintenance />
              </GraphCard>
              <GraphCard id="light-quality" title="Type A Lighting*" subtitle="Colour Rendering Index (CRI) vs Gamut Area Index (GAI)">
                <>
                  <CRIvsGAI />
                  <p className="text-[11px] text-gray-500 mt-2">*Type A Lighting as defined by the Lighting Research Centre, New York</p>
                </>
              </GraphCard>
              <GraphCard id="spd" title="Spectral Power Distribution (SPD)" subtitle="Wavelength (nm) vs Relative Power">
                <SPD />
              </GraphCard>
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
                <tbody className="divide-y divide-gray-800 text-gray-300">
                  {[
                    ['600 mm', '9', '1000'],
                    ['', '18', '2000'],
                    ['', '27', '3000'],
                    ['', '36', '4000'],
                    ['', '45', '5000'],
                    ['1200 mm', '16', '7500*'],
                    ['', '20', '2500'],
                    ['', '32', '4000'],
                    ['', '40', '5000'],
                    ['', '48', '6000'],
                    ['', '60', '7500'],
                    ['', '80', '10000'],
                  ].map((row, i) => (
                    <tr key={i}>
                      <td className="p-3">{row[0]}</td>
                      <td className="p-3 text-center">{row[1]}</td>
                      <td className="p-3 text-center">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-gray-500 text-xs mt-2">* Note: The 16W 1200mm model&apos;s lumen output appears inconsistent in the source document. Please verify with manufacturer.</p>
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
                    ['OXNT1200205', '1200', '20 W', '4', '1280 × 185 × 185', '6.56'],
                    ['OXNT1200325', '1200', '32 W', '4', '1280 × 185 × 185', '6.71'],
                    ['OXNT1200405', '1200', '40 W', '4', '1280 × 185 × 185', '6.71'],
                    ['OXNT1200485', '1200', '48 W', '4', '1280 × 185 × 185', '6.86'],
                    ['OXNT1200605', '1200', '60 W', '4', '1280 × 185 × 185', '6.86'],
                    ['OXNT1200805', '1200', '80 W', '4', '1280 × 185 × 185', '7.04'],
                  ].map((row, i) => {
                    const lengthMm = row[1]
                    const powerW = parseInt(row[2].replace(/\D/g, ''))
                    const key = `${lengthMm}-${powerW}`
                    const iesFile = iesFiles[key]
                    const iesHref = iesFile ? IES_BASE + iesFile : undefined
                    return (
                      <tr key={i}>
                        <td className="p-3">{row[0]}</td>
                        <td className="p-3 text-center">{row[1]}</td>
                        <td className="p-3 text-center">{row[2]}</td>
                        <td className="p-3 text-center">{row[3]}</td>
                        <td className="p-3">{row[4]}</td>
                        <td className="p-3 text-center">{row[5]}</td>
                        <td className="p-3">
                          {iesHref ? (
                            <a className="text-orbitx-accent hover:underline" href={iesHref} target="_blank" rel="noopener noreferrer">Download IES</a>
                          ) : (
                            <span className="text-gray-500">—</span>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <p className="text-gray-500 text-xs mt-2">Specification tolerance: ±10%</p>
          </div>
        </section>
      </main>

      {/* Footer */}
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
                <Link href="/products" className="block text-gray-400 hover:text-orbitx-accent transition-colors">Products</Link>
                <Link href="/#about" className="block text-gray-400 hover:text-orbitx-accent transition-colors">About Us</Link>
                <Link href="/#contact" className="block text-gray-400 hover:text-orbitx-accent transition-colors">Contact</Link>
                <a href={companyAssets.mainBrochure} target="_blank" rel="noopener noreferrer" className="block text-gray-400 hover:text-orbitx-accent transition-colors">Main Brochure</a>
                <Link href="/guarantee" className="block text-gray-400 hover:text-orbitx-accent transition-colors">Guarantee</Link>
                <Link href="/sitemap" className="block text-gray-400 hover:text-orbitx-accent transition-colors">Sitemap</Link>
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

function GraphCard({ id, title, subtitle, children }: { id: string, title: string, subtitle?: string, children: React.ReactNode }) {
  return (
    <div id={id} className="bg-black border border-gray-800 rounded-xl p-5">
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      {subtitle && <p className="text-gray-400 text-sm mb-4">{subtitle}</p>}
      <div className="w-full overflow-hidden">
        {children}
      </div>
    </div>
  )
}

// Shared helpers and graphs (copied from Neptune page for visual parity)
function scale(v: number, d0: number, d1: number, r0: number, r1: number) {
  if (d1 === d0) return r0
  const t = (v - d0) / (d1 - d0)
  return r0 + t * (r1 - r0)
}

function SurvivalCurve() {
  const data = [
    { x: 0, y: 99 },
    { x: 20, y: 99 },
    { x: 40, y: 99 },
    { x: 60, y: 99 },
    { x: 80, y: 98 },
    { x: 90, y: 92 },
    { x: 100, y: 86 },
  ]
  const W = 520, H = 300, pad = 44
  const xMin = 0, xMax = 100, yMin = 0, yMax = 100
  const x = (v: number) => scale(v, xMin, xMax, pad, W - pad)
  const y = (v: number) => scale(v, yMin, yMax, H - pad, pad)
  const path = data.map((p, i) => `${i === 0 ? 'M' : 'L'} ${x(p.x)},${y(p.y)}`).join(' ')
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
      <Axes W={W} H={H} pad={pad} xLabel="Time (1000 hours)" yLabel="Light Survival (%)" yTicks={[0,20,40,60,80,100]} xTicks={[0,20,40,60,80,100]} />
      <path d={path} fill="none" stroke="#00c2ff" strokeWidth={2.5} />
    </svg>
  )
}

function LumenMaintenance() {
  const data = [ [0,98], [80,65] ].map(d => ({ x: d[0], y: d[1] }))
  const W = 520, H = 300, pad = 44
  const xMin = 0, xMax = 80, yMin = 0, yMax = 100
  const x = (v: number) => scale(v, xMin, xMax, pad, W - pad)
  const y = (v: number) => scale(v, yMin, yMax, H - pad, pad)
  const path = data.map((p, i) => `${i === 0 ? 'M' : 'L'} ${x(p.x)},${y(p.y)}`).join(' ')
  const l70y = y(70)
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
      <Axes W={W} H={H} pad={pad} xLabel="Time (1000 hours)" yLabel="Lumen Output (%)" yTicks={[0,20,40,60,80,100]} xTicks={[0,10,20,30,40,50,60,70,80]} />
      <path d={path} fill="none" stroke="#00c2ff" strokeWidth={2.5} />
      <line x1={x(0)} y1={l70y} x2={x(80)} y2={l70y} stroke="#ff4d4f" strokeDasharray="6 6" />
      <text x={x(10)} y={l70y - 6} fontSize={12} fill="#ff4d4f">L70</text>
    </svg>
  )
}

function CRIvsGAI() {
  const point = { x: 83, y: 96 }
  const W = 520, H = 300, pad = 44
  const xMin = 0, xMax = 100, yMin = 0, yMax = 100
  const x = (v: number) => scale(v, xMin, xMax, pad, W - pad)
  const y = (v: number) => scale(v, yMin, yMax, H - pad, pad)
  const band = `M ${x(83)},${y(0)} L ${x(100)},${y(0)} L ${x(100)},${y(100)} L ${x(83)},${y(100)} Z`
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
      <Axes W={W} H={H} pad={pad} xLabel="Colour Rendering Index (CRI)" yLabel="Gamut Area Index (GAI)" yTicks={[0,20,40,60,80,100]} xTicks={[0,20,40,60,80,100]} />
      <path d={band} fill="rgba(0, 122, 255, 0.15)" />
      <line x1={x(0)} y1={y(96)} x2={x(100)} y2={y(96)} stroke="#9aa0a6" strokeDasharray="6 6" opacity={0.6} />
      <line x1={x(83)} y1={y(0)} x2={x(83)} y2={y(100)} stroke="#9aa0a6" strokeDasharray="6 6" opacity={0.6} />
      <circle cx={x(point.x)} cy={y(point.y)} r={7} fill="#111827" stroke="#ff5a5f" strokeWidth={3} />
      <defs>
        <marker id="arrowBlue" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="#3b82f6" />
        </marker>
      </defs>
      {(() => {
        const startX = x(68) + 6
        const startY = y(76)
        const d = `M ${startX},${startY} L ${x(point.x-2)},${y(point.y-2)}`
        return (
          <path d={d} stroke="#3b82f6" strokeWidth={2.5} strokeDasharray="6 6" strokeLinecap="round" fill="none" markerEnd="url(#arrowBlue)" />
        )
      })()}
      <rect x={x(40)} y={y(74)} width={x(68)-x(40)} height={y(50)-y(74)} rx={12} ry={12} fill="#0b0f19" stroke="#3b82f6" opacity={0.95} />
      <text x={x(54)} y={y(66)} fontSize={12} textAnchor="middle" fill="#e5e7eb">OrbitX</text>
      <text x={x(54)} y={y(60)} fontSize={12} textAnchor="middle" fill="#e5e7eb">CRI 83, GAI 96</text>
      <text x={x(54)} y={y(54)} fontSize={12} textAnchor="middle" fill="#e5e7eb">Type A Lighting</text>
    </svg>
  )
}

function SPD() {
  const data = [
    [360,0.00],[370,0.00],[380,0.00],[390,0.01],[400,0.02],[410,0.05],[420,0.09],[430,0.20],
    [440,0.40],[445,0.70],[452,0.95],[455,1.00],[458,0.92],[465,0.80],[475,0.55],[480,0.38],
    [485,0.30],[490,0.35],[500,0.45],[510,0.50],[520,0.55],[530,0.57],[540,0.58],[550,0.59],
    [560,0.60],[570,0.60],[580,0.59],[590,0.58],[600,0.56],[610,0.52],[620,0.45],[630,0.38],
    [640,0.30],[650,0.24],[660,0.18],[670,0.14],[680,0.10],[690,0.07],[700,0.05],[710,0.03],
    [720,0.02],[730,0.01],[735,0.00]
  ].map(d => ({ x: d[0], y: d[1] }))
  const W = 520, H = 300, pad = 44
  const xMin = 360, xMax = 735, yMin = 0, yMax = 1
  const x = (v: number) => scale(v, xMin, xMax, pad, W - pad)
  const y = (v: number) => scale(v, yMin, yMax, H - pad, pad)
  const pts = data.map(p => ({ x: x(p.x), y: y(p.y) }))
  function smoothPath(points: {x: number, y: number}[], tension = 0.6) {
    if (points.length < 2) return ''
    const d: string[] = [`M ${points[0].x},${points[0].y}`]
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i - 1] || points[i]
      const p1 = points[i]
      const p2 = points[i + 1]
      const p3 = points[i + 2] || p2
      const c1x = p1.x + (p2.x - p0.x) / 6 * tension
      const c1y = p1.y + (p2.y - p0.y) / 6 * tension
      const c2x = p2.x - (p3.x - p1.x) / 6 * tension
      const c2y = p2.y - (p3.y - p1.y) / 6 * tension
      d.push(`C ${c1x},${c1y} ${c2x},${c2y} ${p2.x},${p2.y}`)
    }
    return d.join(' ')
  }
  const linePath = smoothPath(pts, 0.6)
  const first = pts[0], last = pts[pts.length - 1]
  const areaPath = `${linePath} L ${last.x},${y(0)} L ${first.x},${y(0)} Z`
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
      <defs>
        <linearGradient id="spdGradient" x1={pad} x2={W - pad} y1={0} y2={0} gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2a00ff" />
          <stop offset={`${((435-360)/(xMax-xMin))*100}%`} stopColor="#0057ff" />
          <stop offset={`${((485-360)/(xMax-xMin))*100}%`} stopColor="#00c2ff" />
          <stop offset={`${((510-360)/(xMax-xMin))*100}%`} stopColor="#00ff6a" />
          <stop offset={`${((560-360)/(xMax-xMin))*100}%`} stopColor="#e4ff00" />
          <stop offset={`${((585-360)/(xMax-xMin))*100}%`} stopColor="#ffb300" />
          <stop offset={`${((610-360)/(xMax-xMin))*100}%`} stopColor="#ff7a00" />
          <stop offset={`${((660-360)/(xMax-xMin))*100}%`} stopColor="#ff0000" />
          <stop offset="100%" stopColor="#4b0000" />
        </linearGradient>
      </defs>
      <Axes W={W} H={H} pad={pad} xLabel="Wavelength (nm)" yLabel="P (relative)" yTicks={[0,0.25,0.5,0.75,1]} xTicks={[360,485,610,735]} />
      <path d={areaPath} fill="url(#spdGradient)" opacity={0.95} />
      <path d={linePath} fill="none" stroke="#111" strokeDasharray="5 4" strokeOpacity={0.6} strokeWidth={2} />
    </svg>
  )
}

function Axes({ W, H, pad, xLabel, yLabel, xTicks, yTicks }: { W: number, H: number, pad: number, xLabel: string, yLabel: string, xTicks: (number)[], yTicks: (number)[] }) {
  const xMin = pad, xMax = W - pad, yMin = H - pad, yMax = pad
  const sx = (v: number) => scale(v, Math.min(...xTicks), Math.max(...xTicks), xMin, xMax)
  const sy = (v: number) => scale(v, Math.min(...yTicks), Math.max(...yTicks), yMin, yMax)
  return (
    <g>
      <line x1={xMin} y1={yMin} x2={xMax} y2={yMin} stroke="#444" />
      <line x1={xMin} y1={yMin} x2={xMin} y2={yMax} stroke="#444" />
      {xTicks.map((t, i) => (
        <g key={`xt-${i}`}>
          <line x1={sx(t)} y1={yMin} x2={sx(t)} y2={yMin + 6} stroke="#555" />
          <text x={sx(t)} y={yMin + 18} textAnchor="middle" fontSize={11} fill="#9aa0a6">{t}</text>
          <line x1={sx(t)} y1={yMin} x2={sx(t)} y2={yMax} stroke="#222" />
        </g>
      ))}
      {yTicks.map((t, i) => (
        <g key={`yt-${i}`}>
          <line x1={xMin - 6} y1={sy(t)} x2={xMin} y2={sy(t)} stroke="#555" />
          <text x={xMin - 10} y={sy(t) + 4} textAnchor="end" fontSize={11} fill="#9aa0a6">{t}</text>
          <line x1={xMin} y1={sy(t)} x2={xMax} y2={sy(t)} stroke="#222" />
        </g>
      ))}
      <text x={(xMin + xMax) / 2} y={H - 8} textAnchor="middle" fontSize={12} fill="#bbb">{xLabel}</text>
      <text x={12} y={(yMin + yMax) / 2} textAnchor="middle" fontSize={12} fill="#bbb" transform={`rotate(-90 12 ${(yMin + yMax) / 2})`}>{yLabel}</text>
    </g>
  )
}
