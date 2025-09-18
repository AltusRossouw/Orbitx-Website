"use client"

import Script from 'next/script'

interface UmamiAnalyticsProps {
  websiteId: string
  src: string
}

export default function UmamiAnalytics({ websiteId, src }: UmamiAnalyticsProps) {
  return (
    <Script
      src={src}
      data-website-id={websiteId}
      strategy="afterInteractive"
    />
  )
}