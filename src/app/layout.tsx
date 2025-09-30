import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import AnalyticsProvider from '@/components/AnalyticsProvider'
import UmamiAnalytics from '@/components/UmamiAnalytics'

const inter = Inter({ 
  subsets: ['latin'], 
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial']
})

export const metadata: Metadata = {
  metadataBase: new URL('https://orbitx.co.za'),
  title: 'OrbitX - Direct Drive LED Lights | Industrial & Commercial Lighting Solutions',
  description: 'OrbitX provides cutting-edge Direct Drive LED lighting solutions for industrial, commercial, academic, and mining applications. Made in South Africa with up to 8-year guarantee.',
  keywords: 'LED lights, industrial lighting, commercial lighting, Direct Drive LED, South Africa, OrbitX, energy efficient lighting',
  
  // Open Graph tags for social media sharing (including WhatsApp)
  openGraph: {
    title: 'OrbitX - Direct Drive LED Lights',
    description: 'Cutting-edge Direct Drive LED lighting solutions for industrial, commercial, and mining applications. Made in South Africa.',
    url: 'https://orbitx.co.za',
    siteName: 'OrbitX LED Lights',
    images: [
      {
        url: '/images/orbitx-social.png',
        width: 1200,
        height: 630,
        alt: 'OrbitX - Direct Drive LED Lighting Solutions',
      },
    ],
    locale: 'en_ZA',
    type: 'website',
  },
  
  // Twitter Card tags
  twitter: {
    card: 'summary_large_image',
    title: 'OrbitX - Direct Drive LED Lights',
    description: 'Cutting-edge Direct Drive LED lighting solutions for industrial, commercial, and mining applications.',
    images: ['/images/orbitx-social.png'],
  },
  
  // Additional meta tags
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const umamiWebsiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID
  const umamiSrc = process.env.NEXT_PUBLIC_UMAMI_SRC

  return (
  <html lang="en" className="dark">
      <head>
        {/* Performance optimizations */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//umami.intellixlabs.co.za" />
        <link rel="preload" href="/images/orbitx-logo.svg" as="image" type="image/svg+xml" />
        
        {/* Additional meta tags for better WhatsApp sharing */}
        <meta property="og:image" content="/images/orbitx-social.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="OrbitX - Direct Drive LED Lighting Solutions" />
        
        {/* WhatsApp specific meta tags */}
  <meta property="og:site_name" content="OrbitX LED Lights" />
  <meta name="theme-color" content="#0084ff" />
        
        {/* Favicon */}
        <link rel="icon" href="/images/orbitx-logo.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/images/orbitx-logo.svg" />
        
        {/* Umami Analytics - Hardcoded for Docker compatibility */}
        <script
          async
          src="https://umami.intellixlabs.co.za/script.js"
          data-website-id="1bcbdb6f-8263-4ef0-8a49-340172b88292"
        />
      </head>
  <body className={`${inter.className} bg-black text-white`}>
        {/* Backup Umami Analytics - Using environment variables */}
        {umamiWebsiteId && umamiSrc && (
          <UmamiAnalytics 
            websiteId={umamiWebsiteId} 
            src={umamiSrc} 
          />
        )}
        
        {/* Custom Analytics Provider */}
        <AnalyticsProvider>
          {children}
        </AnalyticsProvider>
      </body>
    </html>
  )
}
