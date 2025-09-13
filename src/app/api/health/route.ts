import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Basic health check - could be extended with database checks, etc.
    const healthData = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      version: process.env.npm_package_version || '0.1.0',
      service: 'orbitx-website',
      build: {
        standalone: true,
        nextjs: '14.2.15',
        node: process.version
      },
      memory: {
        usage: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
        unit: 'MB'
      },
      deployment: {
        container: process.env.HOSTNAME || 'unknown',
        port: process.env.PORT || '3000',
        ready: true
      }
    }

    return NextResponse.json(healthData, { 
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'X-Health-Check': 'orbitx-website'
      }
    })
  } catch (error) {
    const errorData = {
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      service: 'orbitx-website',
      error: error instanceof Error ? error.message : 'Unknown error',
      ready: false
    }

    return NextResponse.json(errorData, { 
      status: 503,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'X-Health-Check': 'orbitx-website'
      }
    })
  }
}
