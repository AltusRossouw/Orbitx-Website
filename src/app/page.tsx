'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { 
  ArrowRight, 
  Lightbulb, 
  Shield, 
  MapPin, 
  Award,
  Phone,
  Mail,
  Factory,
  Zap,
  Star,
  ChevronDown,
  Menu,
  X,
  Download,
  ExternalLink
} from 'lucide-react'
import { products, clientImages, companyAssets } from '../data/products'

// Components
// Helper to convert SA numbers like "021 879 1483" or "071 581 5751" to tel:+27... format
const toTelHref = (display: string) => {
  const digits = display.replace(/\D/g, '')
  const intl = digits.startsWith('0') ? `+27${digits.slice(1)}` : (digits.startsWith('27') ? `+${digits}` : `+${digits}`)
  return `tel:${intl}`
}

const Header = () => {
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
            <img
              src="/images/orbitx-logo.svg"
              alt="OrbitX Logo"
              className="h-8 w-auto"
            />
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-white hover:text-orbitx-accent transition-colors">Home</a>
            <a href="#products" className="text-white hover:text-orbitx-accent transition-colors">Products</a>
            <a href="#about" className="text-white hover:text-orbitx-accent transition-colors">About</a>
            <a href="#contact" className="text-white hover:text-orbitx-accent transition-colors">Contact</a>
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
              <a href="#home" className="text-white hover:text-orbitx-accent transition-colors">Home</a>
              <a href="#products" className="text-white hover:text-orbitx-accent transition-colors">Products</a>
              <a href="#about" className="text-white hover:text-orbitx-accent transition-colors">About</a>
              <a href="#contact" className="text-white hover:text-orbitx-accent transition-colors">Contact</a>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  )
}

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        <motion.div 
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, #0066cc 0%, transparent 50%)",
              "radial-gradient(circle at 80% 20%, #00ccff 0%, transparent 50%)",
              "radial-gradient(circle at 40% 80%, #0066cc 0%, transparent 50%)"
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>

      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div className="flex flex-col items-center mb-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mb-6"
            >
              <img
                src="/images/orbitx-logo.svg"
                alt="OrbitX Logo"
                className="h-16 md:h-20 w-auto"
              />
            </motion.div>
            <motion.h1 
              className="text-3xl md:text-5xl font-bold text-gray-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Direct Drive LED Lights
            </motion.h1>
          </motion.div>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Cutting-edge LED lighting solutions for industrial, commercial, and mining applications. 
            Designed and built in South Africa with our unique Direct Drive technology.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.button 
              className="px-8 py-4 bg-orbitx-accent text-black font-semibold rounded-lg hover:bg-white transition-all duration-300 flex items-center justify-center group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Products 
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </motion.button>
            
            <motion.a
              href={companyAssets.mainBrochure}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border border-orbitx-accent text-orbitx-accent font-semibold rounded-lg hover:bg-orbitx-accent hover:text-black transition-all duration-300 flex items-center justify-center group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download Brochure
              <Download className="ml-2 group-hover:translate-y-0.5 transition-transform" size={20} />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="text-orbitx-accent" size={32} />
      </motion.div>
    </section>
  )
}

const Features = () => {
  const features = [
    {
      icon: <Shield size={40} />,
      title: "8-Year Guarantee",
      description: "Industry-leading double guarantee coverage for peace of mind"
    },
    {
      icon: <Zap size={40} />,
      title: "Direct Drive Technology",
      description: "Revolutionary technology for maximum efficiency and longevity"
    },
    {
      icon: <MapPin size={40} />,
      title: "Made in South Africa",
      description: "Locally designed and manufactured by South African engineers"
    },
    {
      icon: <Factory size={40} />,
      title: "Industrial Grade",
      description: "Built tough for commercial, industrial, and mining applications"
    }
  ]

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Why Choose <span className="text-orbitx-accent">OrbitX</span>?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We lead the way in LED lighting innovation with our unique Direct Drive technology 
            and commitment to South African engineering excellence.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="text-center p-6 bg-black/50 rounded-xl border border-gray-800 hover:border-orbitx-accent transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="text-orbitx-accent mb-4 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const Products = () => {
  return (
    <section id="products" className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="text-orbitx-accent">Products</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore our extensive selection of competitively priced LED lighting products, 
            meticulously designed for extended service life and energy savings.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.slice(0, 12).map((product, index) => (
            <motion.div
              key={product.id}
              className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-orbitx-accent transition-all duration-300 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="h-48 relative bg-gradient-to-br from-gray-800 to-gray-900">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-orbitx-accent text-sm font-medium mb-3">{product.type}</p>
                <p className="text-gray-400 text-sm mb-4">{product.specs}</p>
                <div className="flex items-center justify-between">
                  <motion.a
                    href={product.pdfSpec}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orbitx-accent hover:text-white transition-colors font-medium flex items-center group"
                    whileHover={{ x: 5 }}
                  >
                    View Specs <ExternalLink size={16} className="ml-1" />
                  </motion.a>
                  <div className="flex flex-wrap gap-1">
                    {product.features.slice(0, 2).map((feature, idx) => (
                      <span key={idx} className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Show more products button if there are more than 12 */}
        {products.length > 12 && (
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <button className="px-8 py-3 border border-orbitx-accent text-orbitx-accent hover:bg-orbitx-accent hover:text-black transition-all duration-300 rounded-lg">
              View All Products
            </button>
          </motion.div>
        )}
      </div>
    </section>
  )
}

const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="text-orbitx-accent">OrbitX</span>
            </h2>
            <p className="text-lg text-gray-300 mb-6">
              With manufacturing that started in 2016 in Paarl, we currently have more than 
              100,000 OrbitX lights in operation across South Africa, Ghana, and Zimbabwe.
            </p>
            <p className="text-lg text-gray-300 mb-6">
              Our vision is to provide commercial and industrial lights mimicking South African 
              sunlight along with very long lifespans, virtually no maintenance, and lifecycle 
              costs that are lower than any other light.
            </p>
            <p className="text-lg text-gray-300 mb-8">
              We are passionate about lighting and we understand the demanding environments of 
              industrial, commercial, academic, mining and horticultural lighting.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-orbitx-accent mb-2">100k+</div>
                <div className="text-sm text-gray-400">Lights Deployed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orbitx-accent mb-2">8 Years</div>
                <div className="text-sm text-gray-400">Guarantee</div>
              </div>
            </div>

            <motion.a
              href={companyAssets.guaranteeDocument}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-orbitx-accent text-black font-semibold rounded-lg hover:bg-white transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              View Our Guarantee <ExternalLink className="ml-2" size={18} />
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-orbitx-dark-blue to-black p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-4">Our Clients</h3>
              <div className="space-y-3 text-gray-300">
                <p>• Rhodes Food Group</p>
                <p>• Outdoor Warehouse</p>
                <p>• Agrimark & Stellenpak</p>
                <p>• Bella Frutta & City Logistics</p>
                <p>• The Le Roux Group</p>
                <p>• Stellenbosch University</p>
                <p>• Cape Town University</p>
                <p>• Atlantis Foundries</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const ClientShowcase = () => {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="text-orbitx-accent">Installations</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            See OrbitX LED lights in action across various industrial, commercial, and agricultural applications.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {clientImages.map((client, index) => (
            <motion.div
              key={index}
              className="relative group rounded-xl overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="aspect-[4/3] relative">
                <Image
                  src={client.image}
                  alt={client.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white font-semibold text-lg mb-2">{client.name}</h3>
                  <p className="text-gray-300 text-sm">{client.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Contact <span className="text-orbitx-accent">Us</span>
          </h2>
          <p className="text-xl text-gray-300">
            We can&apos;t wait to hear from you!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="space-y-8">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-orbitx-accent rounded-lg flex items-center justify-center">
                  <MapPin className="text-black" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Address</h4>
                  <p className="text-gray-400">13 Suid Street, Southern Paarl</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-orbitx-accent rounded-lg flex items-center justify-center">
                  <Phone className="text-black" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Phone</h4>
                  <p className="text-gray-400">
                    Sales: <a className="hover:text-orbitx-accent underline-offset-2 hover:underline" href={toTelHref('021 879 1483')}>021 879 1483</a>
                  </p>
                  <p className="text-gray-400">
                    Ian Manchip: <a className="hover:text-orbitx-accent underline-offset-2 hover:underline" href={toTelHref('071 581 5751')}>071 581 5751</a>
                  </p>
                  <p className="text-gray-400">
                    Frans Rossouw: <a className="hover:text-orbitx-accent underline-offset-2 hover:underline" href={toTelHref('082 883 5008')}>082 883 5008</a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-orbitx-accent rounded-lg flex items-center justify-center">
                  <Mail className="text-black" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Email</h4>
                  <p className="text-gray-400">
                    <a className="hover:text-orbitx-accent underline-offset-2 hover:underline" href="mailto:info@orbitx.co.za">info@orbitx.co.za</a>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input 
                  type="text" 
                  placeholder="Your Name"
                  className="w-full p-4 bg-gray-900 border border-gray-800 rounded-lg focus:border-orbitx-accent focus:outline-none transition-colors"
                />
                <input 
                  type="email" 
                  placeholder="Your Email"
                  className="w-full p-4 bg-gray-900 border border-gray-800 rounded-lg focus:border-orbitx-accent focus:outline-none transition-colors"
                />
              </div>
              <input 
                type="text" 
                placeholder="Subject"
                className="w-full p-4 bg-gray-900 border border-gray-800 rounded-lg focus:border-orbitx-accent focus:outline-none transition-colors"
              />
              <textarea 
                rows={6} 
                placeholder="Your Message"
                className="w-full p-4 bg-gray-900 border border-gray-800 rounded-lg focus:border-orbitx-accent focus:outline-none transition-colors resize-none"
              ></textarea>
              <motion.button 
                type="submit"
                className="w-full p-4 bg-orbitx-accent text-black font-semibold rounded-lg hover:bg-white transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="mb-4">
              <img
                src="/images/orbitx-logo.svg"
                alt="OrbitX Logo"
                className="h-10 w-auto"
              />
            </div>
            <p className="text-gray-400 mb-4">
              Leading South African manufacturer of Direct Drive LED lighting solutions 
              for industrial and commercial applications.
            </p>
            <div className="flex items-center text-sm text-gray-500">
              <Award size={16} className="mr-2" />
              ISO 9001 Certified
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <a href="#products" className="block text-gray-400 hover:text-orbitx-accent transition-colors">Products</a>
              <a href="#about" className="block text-gray-400 hover:text-orbitx-accent transition-colors">About Us</a>
              <a href="#contact" className="block text-gray-400 hover:text-orbitx-accent transition-colors">Contact</a>
              <a href={companyAssets.mainBrochure} target="_blank" rel="noopener noreferrer" className="block text-gray-400 hover:text-orbitx-accent transition-colors">Main Brochure</a>
              <a href={companyAssets.guaranteeDocument} target="_blank" rel="noopener noreferrer" className="block text-gray-400 hover:text-orbitx-accent transition-colors">Guarantee Info</a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2 text-gray-400">
              <p>13 Suid Street, Southern Paarl</p>
              <p>
                <a className="hover:text-orbitx-accent underline-offset-2 hover:underline" href="mailto:info@orbitx.co.za">info@orbitx.co.za</a>
              </p>
              <p>
                <a className="hover:text-orbitx-accent underline-offset-2 hover:underline" href={toTelHref('021 879 1483')}>021 879 1483</a>
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-500">
            © 2024 OrbitX Direct Drive LED Lights. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

// Main App Component
export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main>
        <Hero />
        <Features />
        <Products />
        <About />
        <ClientShowcase />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
