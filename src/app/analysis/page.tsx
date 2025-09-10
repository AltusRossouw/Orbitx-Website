"use client"

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import { 
  Users, 
  Eye, 
  Globe, 
  Clock,
  TrendingUp,
  Calendar,
  Monitor,
  Smartphone
} from 'lucide-react'

interface VisitData {
  timestamp: number
  page: string
  referrer: string
  userAgent: string
  sessionId: string
}

interface AnalyticsData {
  totalVisits: number
  uniqueVisitors: number
  pageViews: { [key: string]: number }
  referrers: { [key: string]: number }
  devices: { [key: string]: number }
  dailyVisits: { [key: string]: number }
  recentVisits: VisitData[]
}

export default function AnalysisPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [password, setPassword] = useState('')

  useEffect(() => {
    // Check if already authorized
    const authorized = localStorage.getItem('analytics-auth')
    if (authorized === 'true') {
      setIsAuthorized(true)
      loadAnalytics()
    }
  }, [])

  const loadAnalytics = () => {
    const visits = JSON.parse(localStorage.getItem('site-visits') || '[]') as VisitData[]
    
    if (visits.length === 0) {
      setAnalytics({
        totalVisits: 0,
        uniqueVisitors: 0,
        pageViews: {},
        referrers: {},
        devices: {},
        dailyVisits: {},
        recentVisits: []
      })
      return
    }

    const uniqueVisitors = new Set(visits.map(v => v.sessionId)).size
    const pageViews: { [key: string]: number } = {}
    const referrers: { [key: string]: number } = {}
    const devices: { [key: string]: number } = {}
    const dailyVisits: { [key: string]: number } = {}

    visits.forEach(visit => {
      // Page views
      pageViews[visit.page] = (pageViews[visit.page] || 0) + 1
      
      // Referrers
      const ref = visit.referrer || 'Direct'
      referrers[ref] = (referrers[ref] || 0) + 1
      
      // Devices
      const isMobile = /Mobile|Android|iPhone|iPad/.test(visit.userAgent)
      const device = isMobile ? 'Mobile' : 'Desktop'
      devices[device] = (devices[device] || 0) + 1
      
      // Daily visits
      const date = new Date(visit.timestamp).toDateString()
      dailyVisits[date] = (dailyVisits[date] || 0) + 1
    })

    setAnalytics({
      totalVisits: visits.length,
      uniqueVisitors,
      pageViews,
      referrers,
      devices,
      dailyVisits,
      recentVisits: visits.slice(-10).reverse()
    })
  }

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple password check - in production, use proper authentication
    if (password === 'orbitx2025') {
      setIsAuthorized(true)
      localStorage.setItem('analytics-auth', 'true')
      loadAnalytics()
    } else {
      alert('Invalid password')
    }
  }

  const clearData = () => {
    if (confirm('Are you sure you want to clear all analytics data?')) {
      localStorage.removeItem('site-visits')
      loadAnalytics()
    }
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <motion.div
          className="bg-gray-900 p-8 rounded-xl border border-gray-800 w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold mb-6 text-center">Analytics Access</h1>
          <form onSubmit={handleAuth} className="space-y-4">
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-orbitx-accent focus:outline-none"
            />
            <button
              type="submit"
              className="w-full py-3 bg-orbitx-accent text-black font-semibold rounded-lg hover:bg-white transition-colors"
            >
              Access Analytics
            </button>
          </form>
        </motion.div>
      </div>
    )
  }

  if (!analytics) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div>Loading analytics...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />

      <main className="flex-1 pt-20">
        {/* Header */}
        <section className="py-12 bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-4xl font-bold mb-2">Site Analytics</h1>
                <p className="text-gray-400">Monitor website visits and user behavior</p>
              </div>
              <button
                onClick={clearData}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium transition-colors"
              >
                Clear Data
              </button>
            </div>
          </div>
        </section>

        {/* Stats Overview */}
        <section className="py-8 bg-black">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <motion.div
                className="bg-gray-900 p-6 rounded-xl border border-gray-800"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <Eye className="text-orbitx-accent" size={24} />
                  <TrendingUp className="text-green-500" size={20} />
                </div>
                <div className="text-2xl font-bold mb-1">{analytics.totalVisits}</div>
                <div className="text-gray-400 text-sm">Total Visits</div>
              </motion.div>

              <motion.div
                className="bg-gray-900 p-6 rounded-xl border border-gray-800"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <Users className="text-orbitx-accent" size={24} />
                  <TrendingUp className="text-green-500" size={20} />
                </div>
                <div className="text-2xl font-bold mb-1">{analytics.uniqueVisitors}</div>
                <div className="text-gray-400 text-sm">Unique Visitors</div>
              </motion.div>

              <motion.div
                className="bg-gray-900 p-6 rounded-xl border border-gray-800"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <Globe className="text-orbitx-accent" size={24} />
                </div>
                <div className="text-2xl font-bold mb-1">{Object.keys(analytics.pageViews).length}</div>
                <div className="text-gray-400 text-sm">Pages Visited</div>
              </motion.div>

              <motion.div
                className="bg-gray-900 p-6 rounded-xl border border-gray-800"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <Clock className="text-orbitx-accent" size={24} />
                </div>
                <div className="text-2xl font-bold mb-1">
                  {Object.keys(analytics.dailyVisits).length}
                </div>
                <div className="text-gray-400 text-sm">Active Days</div>
              </motion.div>
            </div>

            {/* Charts Grid */}
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              {/* Page Views */}
              <motion.div
                className="bg-gray-900 p-6 rounded-xl border border-gray-800"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Eye className="mr-2 text-orbitx-accent" size={20} />
                  Page Views
                </h3>
                <div className="space-y-3">
                  {Object.entries(analytics.pageViews)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 5)
                    .map(([page, count]) => (
                      <div key={page} className="flex justify-between items-center">
                        <span className="text-gray-300">{page === '/' ? 'Home' : page}</span>
                        <div className="flex items-center">
                          <div 
                            className="bg-orbitx-accent h-2 rounded mr-2"
                            style={{ width: `${Math.max(count / Math.max(...Object.values(analytics.pageViews)) * 100, 10)}px` }}
                          />
                          <span className="text-white font-medium w-8 text-right">{count}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </motion.div>

              {/* Referrers */}
              <motion.div
                className="bg-gray-900 p-6 rounded-xl border border-gray-800"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Globe className="mr-2 text-orbitx-accent" size={20} />
                  Traffic Sources
                </h3>
                <div className="space-y-3">
                  {Object.entries(analytics.referrers)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 5)
                    .map(([referrer, count]) => (
                      <div key={referrer} className="flex justify-between items-center">
                        <span className="text-gray-300 truncate">
                          {referrer === 'Direct' ? 'Direct' : new URL(referrer).hostname}
                        </span>
                        <div className="flex items-center">
                          <div 
                            className="bg-orbitx-accent h-2 rounded mr-2"
                            style={{ width: `${Math.max(count / Math.max(...Object.values(analytics.referrers)) * 100, 10)}px` }}
                          />
                          <span className="text-white font-medium w-8 text-right">{count}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </motion.div>
            </div>

            {/* Device Types */}
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              <motion.div
                className="bg-gray-900 p-6 rounded-xl border border-gray-800"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Monitor className="mr-2 text-orbitx-accent" size={20} />
                  Device Types
                </h3>
                <div className="space-y-3">
                  {Object.entries(analytics.devices).map(([device, count]) => (
                    <div key={device} className="flex justify-between items-center">
                      <div className="flex items-center">
                        {device === 'Mobile' ? 
                          <Smartphone className="mr-2 text-gray-400" size={16} /> : 
                          <Monitor className="mr-2 text-gray-400" size={16} />
                        }
                        <span className="text-gray-300">{device}</span>
                      </div>
                      <div className="flex items-center">
                        <div 
                          className="bg-orbitx-accent h-2 rounded mr-2"
                          style={{ width: `${Math.max(count / analytics.totalVisits * 100, 10)}px` }}
                        />
                        <span className="text-white font-medium">{count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Daily Visits */}
              <motion.div
                className="bg-gray-900 p-6 rounded-xl border border-gray-800"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Calendar className="mr-2 text-orbitx-accent" size={20} />
                  Recent Activity
                </h3>
                <div className="space-y-2">
                  {Object.entries(analytics.dailyVisits)
                    .slice(-7)
                    .map(([date, count]) => (
                      <div key={date} className="flex justify-between items-center text-sm">
                        <span className="text-gray-300">{new Date(date).toLocaleDateString()}</span>
                        <span className="text-white font-medium">{count} visits</span>
                      </div>
                    ))}
                </div>
              </motion.div>
            </div>

            {/* Recent Visits */}
            <motion.div
              className="bg-gray-900 p-6 rounded-xl border border-gray-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <h3 className="text-xl font-semibold mb-4">Recent Visits</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="text-left py-2 text-gray-400">Time</th>
                      <th className="text-left py-2 text-gray-400">Page</th>
                      <th className="text-left py-2 text-gray-400">Referrer</th>
                      <th className="text-left py-2 text-gray-400">Device</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analytics.recentVisits.map((visit, idx) => (
                      <tr key={idx} className="border-b border-gray-800/50">
                        <td className="py-2 text-gray-300">
                          {new Date(visit.timestamp).toLocaleTimeString()}
                        </td>
                        <td className="py-2">{visit.page}</td>
                        <td className="py-2 text-gray-400 truncate max-w-32">
                          {visit.referrer ? new URL(visit.referrer).hostname : 'Direct'}
                        </td>
                        <td className="py-2 text-gray-400">
                          {/Mobile|Android|iPhone|iPad/.test(visit.userAgent) ? 'Mobile' : 'Desktop'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}
