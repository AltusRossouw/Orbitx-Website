"use client"

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

interface VisitData {
  timestamp: number
  page: string
  referrer: string
  userAgent: string
  sessionId: string
  location?: {
    country?: string
    city?: string
    region?: string
    latitude?: number
    longitude?: number
  }
}

// Generate a session ID for tracking unique visitors
const getSessionId = () => {
  let sessionId = localStorage.getItem('visitor-session-id')
  if (!sessionId) {
    sessionId = Math.random().toString(36).substring(2) + Date.now().toString(36)
    localStorage.setItem('visitor-session-id', sessionId)
  }
  return sessionId
}

export default function useAnalytics() {
  const pathname = usePathname()

  useEffect(() => {
    // Skip tracking for the analytics page itself
    if (pathname === '/analytics') return

    const trackVisit = async () => {
      const baseVisitData = {
        timestamp: Date.now(),
        page: pathname,
        referrer: document.referrer,
        userAgent: navigator.userAgent,
        sessionId: getSessionId()
      }

      let visitData: VisitData = baseVisitData

      // Try to get location data
      try {
        // First try IP-based location (free service)
        const locationResponse = await fetch('https://ipapi.co/json/')
        if (locationResponse.ok) {
          const locationData = await locationResponse.json()
          visitData = {
            ...baseVisitData,
            location: {
              country: locationData.country_name,
              city: locationData.city,
              region: locationData.region,
              latitude: locationData.latitude,
              longitude: locationData.longitude
            }
          }
        }
      } catch (error) {
        // If IP-based location fails, try browser geolocation
        if (navigator.geolocation) {
          try {
            const position = await new Promise<GeolocationPosition>((resolve, reject) => {
              navigator.geolocation.getCurrentPosition(resolve, reject, {
                timeout: 5000,
                enableHighAccuracy: false
              })
            })
            
            visitData = {
              ...baseVisitData,
              location: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
              }
            }
          } catch (geoError) {
            // Location tracking failed, use base data without location
            console.log('Location tracking unavailable')
          }
        }
      }

      // Get existing visits
      const visits = JSON.parse(localStorage.getItem('site-visits') || '[]')
      visits.push(visitData)

      // Keep only last 1000 visits to prevent storage bloat
      const recentVisits = visits.slice(-1000)
      
      localStorage.setItem('site-visits', JSON.stringify(recentVisits))
    }

    // Small delay to ensure page is loaded
    const timer = setTimeout(trackVisit, 1000)
    
    return () => clearTimeout(timer)
  }, [pathname])
}
