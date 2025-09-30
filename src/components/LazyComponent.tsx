'use client'

import { Suspense, lazy, ComponentType } from 'react'

interface LazyComponentProps {
  component: () => Promise<{ default: ComponentType<any> }>
  fallback?: React.ReactNode
  [key: string]: any
}

export default function LazyComponent({ 
  component, 
  fallback = <div className="animate-pulse bg-gray-800 rounded h-32 w-full" />,
  ...props 
}: LazyComponentProps) {
  const LazyLoadedComponent = lazy(component)

  return (
    <Suspense fallback={fallback}>
      <LazyLoadedComponent {...props} />
    </Suspense>
  )
}

// Pre-defined lazy components for common use cases
export const LazyAnalytics = lazy(() => import('@/components/UmamiAnalytics'))
export const LazyMotionDiv = lazy(() => import('framer-motion').then(mod => ({ default: mod.motion.div })))
export const LazyImage = lazy(() => import('next/image').then(mod => ({ default: mod.default })))
