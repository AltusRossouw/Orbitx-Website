'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import LogoSvg from './LogoSvg'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/90 backdrop-blur-md border-b border-gray-800' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
          >
            <Link href="/" aria-label="OrbitX Home" className="flex items-center">
              <LogoSvg className="h-8 w-auto" />
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-white hover:text-orbitx-accent transition-colors">Home</Link>
            <Link href="/products" className="text-white hover:text-orbitx-accent transition-colors">Products</Link>
            <Link href="/team" className="text-white hover:text-orbitx-accent transition-colors">Team</Link>
            <Link href="/#about" className="text-white hover:text-orbitx-accent transition-colors">About</Link>
            <Link href="/#contact" className="text-white hover:text-orbitx-accent transition-colors">Contact</Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            className="md:hidden mt-4 py-4 border-t border-gray-800"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-white hover:text-orbitx-accent transition-colors">Home</Link>
              <Link href="/products" className="text-white hover:text-orbitx-accent transition-colors">Products</Link>
              <Link href="/team" className="text-white hover:text-orbitx-accent transition-colors">Team</Link>
              <Link href="/#about" className="text-white hover:text-orbitx-accent transition-colors">About</Link>
              <Link href="/#contact" className="text-white hover:text-orbitx-accent transition-colors">Contact</Link>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  )
}
