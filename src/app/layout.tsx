import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'OrbitX - Direct Drive LED Lights | Industrial & Commercial Lighting Solutions',
  description: 'OrbitX provides cutting-edge Direct Drive LED lighting solutions for industrial, commercial, academic, and mining applications. Made in South Africa with up to 8-year guarantee.',
  keywords: 'LED lights, industrial lighting, commercial lighting, Direct Drive LED, South Africa, OrbitX, energy efficient lighting',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black text-white`}>
        {children}
      </body>
    </html>
  )
}
