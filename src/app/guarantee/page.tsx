"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import Header from '@/components/Header'
import { companyAssets } from '../../data/products'

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
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Our Guarantee
            </motion.h1>
            <motion.p 
              className="text-lg text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Direct Drive Guarantee for OrbitX products
            </motion.p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 bg-black">
          <div className="container mx-auto px-6 prose prose-invert max-w-4xl">
            <h2>OrbitX Direct Drive Guarantee</h2>
            <p>
              OrbitX provides the following guarantee, which extends to the purchaser of the OrbitX product who purchased directly from OrbitX or from an authorised OrbitX reseller.
            </p>
            <p>
              Please note that any guarantee services or questions must be accompanied by the invoice number from the transaction through which the guaranteed product was purchased and the serial number of the product, as found on the product label. The invoice number serves as your guarantee number and must be retained. OrbitX will offer no guarantee service without this number.
            </p>

            <h3>Coverage period</h3>
            <p>OrbitX guarantees that its products and their parts are free of defects in materials or workmanship from the original ship date for the following duration:</p>
            <ul>
              <li>OrbitX Direct Drive Neptune and Phoebe Integrated LED Luminaires: 8 years</li>
              <li>OrbitX Direct Drive Titan, Puck, Rhea and Geminus luminaires, as well as Tube lamps: 6 years</li>
              <li>OrbitX Integrated LED flood lights: 5 years</li>
              <li>Luminaires supplied by third parties: as per third party guarantee</li>
              <li>Battery backup solutions - OrbitX dc to dc converter: 8 years</li>
              <li>Battery backup solutions - third party dc to dc converter: 5 years</li>
              <li>Battery backup solutions - lithium battery: 1 year</li>
            </ul>

            <p>Furthermore, OrbitX guarantees that the total light output per lamp will remain higher or equal to 70% of the light output stated on the original OrbitX invoice for the following duration:</p>
            <ul>
              <li>OrbitX Direct Drive Neptune and Phoebe Integrated LED Luminaires: 5 years</li>
              <li>OrbitX Direct Drive Titan, Puck, Rhea and Geminus luminaires, as well as Tube lamps: 3 years</li>
              <li>OrbitX Integrated LED flood lights: 3 years</li>
            </ul>

            <h3>Service</h3>
            <p>
              During these periods, OrbitX will repair or replace defective parts with new or reconditioned parts at OrbitX’s option, without charge to the purchaser. Shipping fees incurred from returns for under-guarantee service in the first 60 days will be paid by OrbitX. All shipping fees both to and from OrbitX following this 60-day period must be paid by the customer.
            </p>
            <p>
              All original parts replaced by OrbitX or its authorised service centre become the property of OrbitX. Any after-market additions or modifications will invalidate the OrbitX guarantee. The Purchaser is responsible for the removal and reinstallation of faulty products and the associated costs.
            </p>

            <h3>Exclusions and limitations</h3>
            <p>
              OrbitX makes no other guarantee or warranty, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or conformity to any representation or description, with respect to OrbitX products other than as set forth herein.
            </p>
            <p>
              Except as provided herein, OrbitX is not liable for any loss, cost, expense, inconvenience or damage that may result from use or inability to use an OrbitX product, including, but not limited to, commercial losses, business interruption, injuries and fatalities. Under no circumstances shall OrbitX be liable for any loss, cost, expense, inconvenience or damage exceeding the purchase price paid to OrbitX of the original OrbitX product. In no event shall OrbitX be liable for costs of procurement of substitute goods by the purchaser or for unauthorised repairs undertaken by the purchaser. The guarantee and remedies set forth herein are exclusive and in lieu of all others, oral or written, expressed or implied. No reseller, agent or employee is authorised to make any modification, extension or addition to this guarantee.
            </p>
            <p>
              This guarantee shall not apply to any damages caused as a result of force majeure, misuse or improper use of the products, faulty installation, poor electrical connections or negligence by any party other than OrbitX. In addition, this guarantee is not applicable to any OrbitX product improperly shipped, stored, installed, operated, and used, including, inter alia, shipping, storage, installation, operation and use otherwise than in accordance with one or more of the following: OrbitX specifications, including for maximum operating temperature; installation and operating instructions, wiring diagrams and guidelines; poor or loose connections, or faulty lamp holders.
            </p>
            <p>
              This warranty does not cover any peripheral devices, pc boards or any other components not installed and supplied by OrbitX. OrbitX products are supplied with integrated voltage spike arresting circuitry designed to withstand surges up to 1500V. Despite OrbitX’s best efforts to protect its products against poor electricity supply, the guarantee is invalidated if the electricity supply to the product does not conform to the latest version of NRS048 (available from the SABS) or if the circuit supplying the product does not comply to SABS electrical wiring standards.
            </p>
            <p>
              Damage to the surge arrestor or any other part of the light due to a voltage spike exceeding 1500V is not covered under this guarantee. This will be determined based on visible damage to the MOV that forms part of the surge arrestor.
            </p>
            <p>
              Moreover, this guarantee shall not apply if the unit was subjected to abnormal stresses or operating conditions or the purchaser is in arrears to OrbitX.
            </p>

            <h3>Governing law</h3>
            <p>
              Notwithstanding principles of conflicts of law of any jurisdiction to the contrary, all terms and provisions of this agreement are to be construed and governed according to South African law.
            </p>

            <div className="mt-10">
              <Link
                href={companyAssets.guaranteeDocument}
                target="_blank"
                className="inline-flex items-center px-6 py-3 bg-orbitx-accent text-black font-semibold rounded-lg hover:bg-white transition-colors"
              >
                Download Guarantee (PDF)
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Simple footer like other internal pages */}
      <footer className="bg-gray-900 border-t border-gray-800 py-8">
        <div className="container mx-auto px-6 text-center text-gray-500">
          © 2025 OrbitX Direct Drive LED Lights. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
