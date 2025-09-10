// Simple file-backed store alternative: in-memory volatile store.
// NOTE: This will reset on server restart/Vercel redeploys. Swap with a database for persistence.

export type VisitRecord = {
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

let visits: VisitRecord[] = []

export function addVisit(v: VisitRecord) {
  visits.push(v)
  // keep last 10k
  if (visits.length > 10000) visits = visits.slice(-10000)
}

export function clearVisits() {
  visits = []
}

export function getVisits(): VisitRecord[] {
  return visits
}
