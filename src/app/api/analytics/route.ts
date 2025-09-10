import { NextRequest, NextResponse } from 'next/server'
import { addVisit, clearVisits, getVisits, VisitRecord } from '@/lib/analyticsStore'

export async function GET() {
  return NextResponse.json({ visits: getVisits() }, { status: 200 })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { timestamp, page, referrer, userAgent, sessionId, location } = body as VisitRecord
    if (!timestamp || !page || !userAgent || !sessionId) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
    }
    addVisit({ timestamp, page, referrer: referrer || '', userAgent, sessionId, location })
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: 'Bad Request' }, { status: 400 })
  }
}

export async function DELETE(req: NextRequest) {
  const auth = req.headers.get('x-analytics-admin')
  if (auth !== 'orbitx2025') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  clearVisits()
  return NextResponse.json({ ok: true })
}
