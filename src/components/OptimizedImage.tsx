'use client'

import Image from 'next/image'
import { useState, useCallback } from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  priority?: boolean
  quality?: number
  sizes?: string
  className?: string
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  fill?: boolean
  style?: React.CSSProperties
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  quality = 85,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  className = '',
  placeholder = 'empty',
  blurDataURL,
  fill = false,
  style,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleLoad = useCallback(() => {
    setIsLoading(false)
  }, [])

  const handleError = useCallback(() => {
    setHasError(true)
    setIsLoading(false)
  }, [])

  // Generate blur data URL if not provided
  const defaultBlurDataURL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AJ8A/9k='

  if (hasError) {
    return (
      <div 
        className={`bg-gray-800 flex items-center justify-center ${className}`}
        style={style}
      >
        <span className="text-gray-400 text-sm">Image failed to load</span>
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden ${className}`} style={style}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-800 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-600 border-t-blue-500 rounded-full animate-spin" />
        </div>
      )}
      
      <Image
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        priority={priority}
        quality={quality}
        sizes={sizes}
        placeholder={placeholder}
        blurDataURL={blurDataURL || defaultBlurDataURL}
        onLoad={handleLoad}
        onError={handleError}
        className={`transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          ...style,
          objectFit: 'cover',
        }}
        {...props}
      />
    </div>
  )
}

// Pre-configured image components for common use cases
export const HeroImage = (props: Omit<OptimizedImageProps, 'priority' | 'quality' | 'sizes'>) => (
  <OptimizedImage
    {...props}
    priority={true}
    quality={90}
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
  />
)

export const ProductImage = (props: Omit<OptimizedImageProps, 'quality' | 'sizes'>) => (
  <OptimizedImage
    {...props}
    quality={85}
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  />
)

export const ClientLogo = (props: Omit<OptimizedImageProps, 'quality' | 'sizes'>) => (
  <OptimizedImage
    {...props}
    quality={90}
    sizes="(max-width: 640px) 120px, (max-width: 1024px) 140px, 160px"
  />
)
