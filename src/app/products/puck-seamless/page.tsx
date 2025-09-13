"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import { ExternalLink, Award } from 'lucide-react'
import { products, companyAssets } from '@/data/products'

const toTelHref = (display: string) => {
  const digits = display.replace(/\D/g, '')
  const intl = digits.startsWith('0') ? `+27${digits.slice(1)}` : (digits.startsWith('27') ? `+${digits}` : `+${digits}`)
  return `tel:${intl}`
}

export default function PuckSeamlessProductPage() {
  const puckSeamless = products.find(p => p.id === 'puck-seamless')
  const image = puckSeamless?.image || '/images/products/puck-seamless-800x418.png'
  const specPdf = puckSeamless?.pdfSpec || '/pdfs/OrbitX-Puck-Seamless-specifications.pdf'

  // IES files for Puck Seamless
  const IES_BASE = '/products/puck-seamless/docs/'
  const iesFiles: Record<string, string> = {
    '1200-58-4000k': 'OrbitX Puck Seamless 1200mm 58W 4000K.ies',
    '1200-58-5000k': 'OrbitX Puck Seamless 1200mm 58W 5000K.ies',
    '2400-116-4000k': 'OrbitX Puck Seamless 2400mm 116W 4000K.ies',
    '2400-116-5000k': 'OrbitX Puck Seamless 2400mm 116W 5000K.ies',
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section id="puck-seamless" className="relative py-16 md:py-20 bg-gray-900 overflow-hidden">
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
                  Puck Seamless
                </motion.h1>
                <p className="text-orbitx-accent text-sm font-medium mb-3">INTEGRATED LINEAR LED LIGHT</p>
                <motion.p 
                  className="text-lg text-gray-300 mb-6 max-w-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  OrbitX Direct Drive Technology onboard. Features thin end cap line (&lt;3mm) for seamless look when mounted end-to-end. Available in 1200mm and 2400mm lengths with Type A light quality.
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
                <Image src={image} alt="Puck Seamless" fill className="object-contain p-6" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Specs Sections */}
        <section className="py-12 bg-black">
          <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              <SpecCard title="Lifetime & Guarantee" items={[
                'Nominal Lifetime (L70): 60,000 hours (IES LM-80, TM-21)',
                'Operational Guarantee (24/7): 6 years',
                'Light Output Guarantee (24/7): 3 years'
              ]} />

              <SpecCard title="Photometric Data" items={[
                'Luminous Efficacy: 110 lm/W',
                'CCT: 4000K/5000K (options available)',
                'CRI: 83',
                'GAI: 96',
                'Light Quality: Type A compliant (LRC, New York)',
                'Beam Angle: 160°',
                'Stroboscopic Effect (100Hz): 80% flicker free'
              ]} />

              <SpecCard title="Electrical Data" items={[
                'Power: 58W (1200mm) / 116W (2400mm)',
                'Power Factor: >0.98',
                'Operating Voltage: 220-240V AC',
                'Min Sustained Voltage: No minimum, operational from 150V',
                'Max Sustained Voltage: 250V for 2 minutes',
                'On/Off Switching: Unlimited',
                'Delay to Full Brightness: Immediate'
              ]} />
            </div>

            <div className="space-y-6">
              <SpecCard title="Temperature" items={[
                'Max Ambient Temperature (T Ambient): +30°C',
                'Min Ambient Temperature (T Ambient): -40°C'
              ]} />

              <SpecCard title="Safety & Compliance" items={[
                'Risk of Breakage: Low, polycarbonate housing extruded to 1mm (no glass)',
                'Electrical Safety: IEC60598-1, IEC60598-2-5 compliant',
                'Surge Protection: 1.5kV',
                'Fire Rating: UL-94 V2 compliant'
              ]} />

              <SpecCard title="Interference Compliance" items={[
                'WiFi/Barcode/Radio: No interference',
                'IEC 61547, SANS 215 (CISPR15) compliant',
                'THD: IEC 61000-3-2 Class D Compliant'
              ]} />

              <SpecCard title="Design Features" items={[
                'Seamless Design: Thin end cap line (<3mm)',
                'Mounting: End-to-end seamless installation',
                'Dimensions: 36mm × 70mm profile',
                'OHS and MHS Act regulations compliant'
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
                  src="/products/puck-seamless/images/puck-seamless-dimensions.png"
                  alt="Puck Seamless dimensions"
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
              {/* 1. Light Survival Rate Curve */}
              <GraphCard id="survival-curve" title="Light Survival Rate Curve" subtitle="Time (×1000 h) vs Light Survival (%)">
                <PuckSeamlessSurvivalCurve />
              </GraphCard>

              {/* 2. Lumen Maintenance Curve (L70) */}
              <GraphCard id="lumen-maintenance" title="Lumen Maintenance Curve (L70)" subtitle="Time (×1000 h) vs Lumen Output (%)">
                <PuckSeamlessLumenMaintenance />
              </GraphCard>

              {/* 3. Type A Lighting (CRI vs GAI) */}
              <GraphCard id="light-quality" title="Type A Lighting*" subtitle="Colour Rendering Index (CRI) vs Gamut Area Index (GAI)">
                <>
                  <CRIvsGAI />
                  <p className="text-[11px] text-gray-500 mt-2">*Type A Lighting as defined by the Lighting Research Centre, New York</p>
                </>
              </GraphCard>

              {/* 4. Spectral Power Distribution */}
              <GraphCard id="spd" title="Spectral Power Distribution (SPD)" subtitle="Wavelength (nm) vs Relative Power">
                <SPDPuckSeamless />
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
                    <th className="text-left p-3 font-semibold">Length (mm)</th>
                    <th className="text-center p-3 font-semibold">Power (W)</th>
                    <th className="text-center p-3 font-semibold">Luminous Flux (lm)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800 text-gray-300">
                  <tr>
                    <td className="p-3">1200</td>
                    <td className="p-3 text-center">58</td>
                    <td className="p-3 text-center">6500</td>
                  </tr>
                  <tr>
                    <td className="p-3">2400</td>
                    <td className="p-3 text-center">116</td>
                    <td className="p-3 text-center">13000</td>
                  </tr>
                </tbody>
              </table>
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
                    <th className="text-left p-3 font-semibold">Product Code</th>
                    <th className="text-center p-3 font-semibold">Length (mm)</th>
                    <th className="text-center p-3 font-semibold">CCT</th>
                    <th className="text-center p-3 font-semibold">Power Rating</th>
                    <th className="text-center p-3 font-semibold">Units/Box</th>
                    <th className="text-left p-3 font-semibold">Box Dimensions (l × w × h mm)</th>
                    <th className="text-center p-3 font-semibold">Weight (kg)</th>
                    <th className="text-left p-3 font-semibold">IES Files</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800 text-gray-300">
                  {[
                    ['OXPU1200584', '1200', '4000K', '58W', '12', '1280 × 185 × 185', '5.36', '1200-58-4000k'],
                    ['OXPU1200585', '1200', '5000K', '58W', '12', '1280 × 185 × 185', '5.36', '1200-58-5000k'],
                    ['OXPU24001164', '2400', '4000K', '116W', '12', '2480 × 185 × 185', '10.72', '2400-116-4000k'],
                    ['OXPU24001165', '2400', '5000K', '116W', '12', '2480 × 185 × 185', '10.72', '2400-116-5000k'],
                  ].map((row, i) => {
                    const iesKey = row[7] as string
                    const iesFile = iesFiles[iesKey]
                    const iesHref = iesFile ? IES_BASE + iesFile : undefined
                    return (
                      <tr key={i}>
                        <td className="p-3">{row[0]}</td>
                        <td className="p-3 text-center">{row[1]}</td>
                        <td className="p-3 text-center">{row[2]}</td>
                        <td className="p-3 text-center">{row[3]}</td>
                        <td className="p-3 text-center">{row[4]}</td>
                        <td className="p-3">{row[5]}</td>
                        <td className="p-3 text-center">{row[6]}</td>
                        <td className="p-3">{iesHref ? (
                          <a className="text-orbitx-accent hover:underline" href={iesHref} target="_blank" rel="noopener noreferrer">Download IES</a>
                        ) : (
                          <span className="text-gray-500">—</span>
                        )}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

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
                <Link href="/guarantee" className="block text-gray-400 hover:text-orbitx-accent transition-colors">Guarantee</Link>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-gray-400">
                <p><a href="https://maps.app.goo.gl/tWs5EBrKsQ82o4wr5" target="_blank" rel="noopener noreferrer" className="hover:text-orbitx-accent underline-offset-2 hover:underline">13 Suid Street, Southern Paarl</a></p>
                <p><a className="hover:text-orbitx-accent underline-offset-2 hover:underline" href="mailto:info@orbitx.co.za">info@orbitx.co.za</a></p>
                <p><a className="hover:text-orbitx-accent underline-offset-2 hover:underline" href={toTelHref('+27 21 879 1483')}>+27 21 879 1483</a></p>
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

// ---------------- Graph Components (Puck Seamless specific) ----------------
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

function scale(v: number, d0: number, d1: number, r0: number, r1: number) {
  if (d1 === d0) return r0
  const t = (v - d0) / (d1 - d0)
  return r0 + t * (r1 - r0)
}

// 1) Light Survival Rate Curve (60k hour lifetime)
function PuckSeamlessSurvivalCurve() {
  const pts = [
    [0,100],[5,100],[10,100],[15,100],[20,100],[25,100],[30,100],[35,100],[40,100],[45,100],
    [50,100],[55,100],[60,99.5],[65,98],[70,95],[75,91],[80,86],[85,80],[90,72],[95,63],[100,52]
  ].map(d => ({ x: d[0], y: d[1] }))
  const W = 520, H = 300, pad = 44
  const xMin = 0, xMax = 100, yMin = 0, yMax = 100
  const x = (v: number) => scale(v, xMin, xMax, pad, W - pad)
  const y = (v: number) => scale(v, yMin, yMax, H - pad, pad)
  
  // Create smooth curve using bezier curves
  function smoothPath(points: {x: number, y: number}[], tension = 0.4) {
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
  
  const scaledPts = pts.map(p => ({ x: x(p.x), y: y(p.y) }))
  const path = smoothPath(scaledPts, 0.3)
  
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
      <Axes W={W} H={H} pad={pad} xLabel="Time (1000 hours)" yLabel="Light Survival (%)" yTicks={[0,20,40,60,80,100]} xTicks={[0,10,20,30,40,50,60,70,80,90,100]} />
      <path d={path} fill="none" stroke="#00c2ff" strokeWidth={2.5} />
    </svg>
  )
}

// 2) Lumen Maintenance (L70) (60k hour L70)
function PuckSeamlessLumenMaintenance() {
  const pts = [
    [0,100],[10,98],[20,96],[30,94],[40,92],[50,90],[60,83],[65,80],[70,75],[75,70],[80,65],[85,58],[90,50],[95,40],[100,30]
  ].map(d => ({ x: d[0], y: d[1] }))
  const W = 520, H = 300, pad = 44
  const xMin = 0, xMax = 100, yMin = 0, yMax = 100
  const x = (v: number) => scale(v, xMin, xMax, pad, W - pad)
  const y = (v: number) => scale(v, yMin, yMax, H - pad, pad)
  
  function smoothPath(points: {x: number, y: number}[], tension = 0.4) {
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
  
  const scaledPts = pts.map(p => ({ x: x(p.x), y: y(p.y) }))
  const path = smoothPath(scaledPts, 0.4)
  const l70y = y(70)
  const l70x = x(60) // 60k hours for L70
  
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
      <Axes W={W} H={H} pad={pad} xLabel="Time (1000 hours)" yLabel="Lumen Output (%)" yTicks={[0,20,40,60,80,100]} xTicks={[0,10,20,30,40,50,60,70,80,90,100]} />
      <path d={path} fill="none" stroke="#00c2ff" strokeWidth={2.5} />
      {/* L70 reference lines */}
      <line x1={x(0)} y1={l70y} x2={x(100)} y2={l70y} stroke="#ff4d4f" strokeDasharray="6 6" />
      <line x1={l70x} y1={y(0)} x2={l70x} y2={y(100)} stroke="#9aa0a6" strokeDasharray="4 6" opacity={0.5} />
      <text x={l70x + 6} y={y(8)} fontSize={11} fill="#9aa0a6">~60k h</text>
      <text x={x(8)} y={l70y - 6} fontSize={12} fill="#ff4d4f">L70</text>
    </svg>
  )
}

// 3) CRI vs GAI (same Type A values for Puck Seamless)
function CRIvsGAI() {
  // OrbitX measured values
  const orbitx = { x: 83, y: 96 }
  // Callout/arrow target (red ring near the top-right)
  const ring = { x: 89, y: 92 }
  const W = 520, H = 300, pad = 44
  const xMin = 0, xMax = 100, yMin = 0, yMax = 100
  const x = (v: number) => scale(v, xMin, xMax, pad, W - pad)
  const y = (v: number) => scale(v, yMin, yMax, H - pad, pad)

  // Type A target shaded bands: top band (GAI ≥ 90) and right band (CRI ≥ 85)
  const topBand = `M ${x(0)},${y(90)} L ${x(100)},${y(90)} L ${x(100)},${y(100)} L ${x(0)},${y(100)} Z`
  const rightBand = `M ${x(85)},${y(0)} L ${x(100)},${y(0)} L ${x(100)},${y(100)} L ${x(85)},${y(100)} Z`

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
      <Axes W={W} H={H} pad={pad} xLabel="Colour Rendering Index (CRI)" yLabel="Gamut Area Index (GAI)" yTicks={[0,20,40,60,80,100]} xTicks={[0,20,40,60,80,100]} />

      {/* Type A region shading (two bands) */}
      <path d={topBand} fill="rgba(59,130,246,0.14)" />
      <path d={rightBand} fill="rgba(59,130,246,0.14)" />

      {/* Reference dashed lines */}
      <line x1={x(0)} y1={y(95)} x2={x(100)} y2={y(95)} stroke="#111" strokeDasharray="8 6" opacity={0.8} />
      <line x1={x(85)} y1={y(0)} x2={x(85)} y2={y(100)} stroke="#111" strokeDasharray="8 6" opacity={0.8} />

      {/* Red ring near top-right */}
      <circle cx={x(ring.x)} cy={y(ring.y)} r={7} fill="none" stroke="#ef4444" strokeWidth={3} />

      {/* Callout box and arrow */}
      <defs>
        <marker id="arrowBluePuckSeamless" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="#2563eb" />
        </marker>
      </defs>

      {(() => {
        // Callout box similar to screenshot (white with blue border)
        const boxX = x(22)
        const boxY = y(72)
        const boxW = x(52) - x(22)
        const boxH = y(46) - y(72)
        const arrowStartX = boxX + boxW
        const arrowStartY = boxY + boxH * 0.35
        const arrowEndX = x(ring.x - 1.5)
        const arrowEndY = y(ring.y + 1.5)
        return (
          <>
            <rect x={boxX} y={boxY} width={boxW} height={boxH} rx={12} ry={12} fill="#ffffff" stroke="#2563eb" strokeWidth={2} opacity={0.98} />
            <text x={boxX + boxW/2} y={boxY + 20} fontSize={12.5} textAnchor="middle" fill="#111827" fontWeight={600}>OrbitX</text>
            <text x={boxX + boxW/2} y={boxY + 36} fontSize={12} textAnchor="middle" fill="#111827">CRI 83, GAI 96</text>
            <text x={boxX + boxW/2} y={boxY + 52} fontSize={12} textAnchor="middle" fill="#111827">Type A Lighting</text>

            {/* Arrow to red ring */}
            <path d={`M ${arrowStartX},${arrowStartY} L ${arrowEndX},${arrowEndY}`} stroke="#2563eb" strokeWidth={2.5} strokeDasharray="6 6" strokeLinecap="round" fill="none" markerEnd="url(#arrowBluePuckSeamless)" />
          </>
        )
      })()}
    </svg>
  )
}

// 4) Spectral Power Distribution
function SPDPuckSeamless() {
  const data = [
    [360,0.00],[370,0.00],[380,0.00],[390,0.00],[400,0.00],[410,0.00],[420,0.00],[430,0.00],
    [440,0.00],[445,0.02],[450,0.08],[455,0.20],[460,0.40],[465,0.60],[470,0.80],[475,0.90],
    [480,0.98],[485,1.00],[490,0.95],[495,0.80],[500,0.60],[505,0.45],[510,0.35],[515,0.30],
    [520,0.28],[525,0.30],[530,0.32],[535,0.35],[540,0.38],[545,0.42],[550,0.46],[555,0.50],
    [560,0.54],[565,0.58],[570,0.61],[575,0.63],[580,0.64],[585,0.65],[590,0.65],[595,0.65],
    [600,0.64],[605,0.63],[610,0.62],[615,0.60],[620,0.58],[625,0.55],[630,0.52],[635,0.48],
    [640,0.44],[645,0.40],[650,0.36],[655,0.32],[660,0.28],[665,0.24],[670,0.20],[675,0.16],
    [680,0.13],[685,0.10],[690,0.08],[695,0.06],[700,0.04],[705,0.03],[710,0.02],[715,0.02],
    [720,0.01],[725,0.01],[730,0.00],[735,0.00]
  ].map(d => ({ x: d[0], y: d[1] }))
  
  const W = 520, H = 300, pad = 44
  const xMin = 360, xMax = 735, yMin = 0, yMax = 1
  const x = (v: number) => scale(v, xMin, xMax, pad, W - pad)
  const y = (v: number) => scale(v, yMin, yMax, H - pad, pad)
  const pts = data.map(p => ({ x: x(p.x), y: y(p.y) }))
  
  function smoothPath(points: {x: number, y: number}[], tension = 0.5) {
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
  
  const linePath = smoothPath(pts, 0.5)
  const first = pts[0], last = pts[pts.length - 1]
  const areaPath = `${linePath} L ${last.x},${y(0)} L ${first.x},${y(0)} Z`
  
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
      <defs>
        <linearGradient id="spdGradientPuckSeamless" x1={pad} x2={W - pad} y1={0} y2={0} gradientUnits="userSpaceOnUse">
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
      <path d={areaPath} fill="url(#spdGradientPuckSeamless)" opacity={0.95} />
      <path d={linePath} fill="none" stroke="#111" strokeDasharray="5 4" strokeOpacity={0.6} strokeWidth={2} />
    </svg>
  )
}

// Shared Axes
function Axes({ W, H, pad, xLabel, yLabel, xTicks, yTicks }: { W: number, H: number, pad: number, xLabel: string, yLabel: string, xTicks: number[], yTicks: number[] }) {
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