"use client"

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

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

    const trackVisit = () => {
      const visitData = {
        timestamp: Date.now(),
        page: pathname,
        referrer: document.referrer,
        userAgent: navigator.userAgent,
        sessionId: getSessionId()
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
