import Link from 'next/link'
import { products } from '@/data/products'
import { Home, Box, Info, Phone, Users, FileText, Link as LinkIcon, Layers } from 'lucide-react'

const implementedProductIds = new Set([
  'neptune',
  'neptune-ex',
  'phoebe-bulkhead',
  'puck-seamless',
  'rhea-bulkhead',
  'titan',
])

export const metadata = {
  title: 'Sitemap | OrbitX',
  description: 'Visual sitemap with quick links to all key pages and product details.',
}

export default function SitemapPage() {
  const implemented = products.filter(p => implementedProductIds.has(p.id))
  const comingSoon = products.filter(p => !implementedProductIds.has(p.id))

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-6 py-16">
        <header className="mb-10">
          <h1 className="text-4xl font-bold mb-2">Sitemap</h1>
          <p className="text-gray-400">Quick, visual overview of the OrbitX website with clickable links.</p>
        </header>

        {/* Primary sections */}
        <section className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center"><Home className="w-5 h-5 mr-2 text-orbitx-accent"/>Primary</h2>
            <ul className="space-y-2 text-gray-300">
              <li><Link className="hover:text-orbitx-accent" href="/">Home</Link></li>
              <li><Link className="hover:text-orbitx-accent" href="/products">Products</Link></li>
              <li><Link className="hover:text-orbitx-accent" href="/about">About</Link></li>
              <li><Link className="hover:text-orbitx-accent" href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center"><Info className="w-5 h-5 mr-2 text-orbitx-accent"/>Company</h2>
            <ul className="space-y-2 text-gray-300">
              <li><Link className="hover:text-orbitx-accent" href="/guarantee">Guarantee</Link></li>
              <li><Link className="hover:text-orbitx-accent" href="/team">Team</Link></li>
            </ul>
          </div>
          <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center"><LinkIcon className="w-5 h-5 mr-2 text-orbitx-accent"/>Resources</h2>
            <ul className="space-y-2 text-gray-300">
              <li><a className="hover:text-orbitx-accent" href="/pdfs/orbitx-brochure-2024-with-play-button-fr.pdf" target="_blank" rel="noopener noreferrer">Main Brochure (PDF)</a></li>
              <li><a className="hover:text-orbitx-accent" href="/pdfs/orbitx-brand-guideline.pdf" target="_blank" rel="noopener noreferrer">Brand Guidelines (PDF)</a></li>
              <li><a className="hover:text-orbitx-accent" href="/pdfs/orbitx-blue-memo.pdf" target="_blank" rel="noopener noreferrer">Blue Memo (PDF)</a></li>
            </ul>
          </div>
        </section>

        {/* Product map */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 flex items-center"><Layers className="w-5 h-5 mr-2 text-orbitx-accent"/>Product Pages</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {implemented.map(p => (
              <Link key={p.id} href={`/products/${p.id}`} className="group block bg-gray-900/60 border border-gray-800 rounded-lg p-4 hover:border-orbitx-accent transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{p.name}</p>
                    <p className="text-xs text-gray-400">{p.type}</p>
                  </div>
                  <Box className="w-5 h-5 text-gray-500 group-hover:text-orbitx-accent"/>
                </div>
              </Link>
            ))}
          </div>
          {comingSoon.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm uppercase tracking-wider text-gray-400 mb-2">More products</h3>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {comingSoon.map(p => (
                  <Link key={p.id} href="/products" className="block text-xs text-gray-400 hover:text-orbitx-accent underline-offset-2 hover:underline">
                    {p.name} — coming soon
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Contact */}
        <section className="grid md:grid-cols-3 gap-6">
          <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center"><Phone className="w-5 h-5 mr-2 text-orbitx-accent"/>Get in Touch</h2>
            <ul className="space-y-2 text-gray-300">
              <li><a className="hover:text-orbitx-accent" href="mailto:info@orbitx.co.za">info@orbitx.co.za</a></li>
              <li><a className="hover:text-orbitx-accent" href="tel:+27218791483">+27 21 879 1483</a></li>
              <li><a className="hover:text-orbitx-accent" href="https://maps.app.goo.gl/tWs5EBrKsQ82o4wr5" target="_blank" rel="noopener noreferrer">13 Suid Street, Southern Paarl</a></li>
            </ul>
          </div>
          <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center"><Users className="w-5 h-5 mr-2 text-orbitx-accent"/>Teams & People</h2>
            <ul className="space-y-2 text-gray-300">
              <li><Link className="hover:text-orbitx-accent" href="/team">Meet the Team</Link></li>
              <li><Link className="hover:text-orbitx-accent" href="/contact">Contact Page</Link></li>
            </ul>
          </div>
          <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center"><FileText className="w-5 h-5 mr-2 text-orbitx-accent"/>Policies & Docs</h2>
            <ul className="space-y-2 text-gray-300">
              <li><Link className="hover:text-orbitx-accent" href="/guarantee">Guarantee</Link></li>
              <li><a className="hover:text-orbitx-accent" href="/sitemap.xml">XML Sitemap</a></li>
              <li><a className="hover:text-orbitx-accent" href="/robots.txt">Robots.txt</a></li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}
