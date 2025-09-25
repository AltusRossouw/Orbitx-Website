"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
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
  Download,
  ExternalLink
} from 'lucide-react'
import { clientImages, companyAssets } from '../data/products'
import Header from '@/components/Header'

// Components
// Helper to convert SA numbers like "021 879 1483" or "071 581 5751" to tel:+27... format
const toTelHref = (display: string) => {
  const digits = display.replace(/\D/g, '')
  const intl = digits.startsWith('0') ? `+27${digits.slice(1)}` : (digits.startsWith('27') ? `+${digits}` : `+${digits}`)
  return `tel:${intl}`
}

// Helper to generate a Google Maps link for a given address
const toMapsHref = (address: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`


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
              "radial-gradient(circle at 80% 20%, #0084ff 0%, transparent 50%)",
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
              <Image
                src="/images/orbitx-logo.svg"
                alt="OrbitX"
                width={240}
                height={72}
                priority
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
            <motion.a 
              href="/products"
              className="px-8 py-4 bg-orbitx-accent text-black font-semibold rounded-lg hover:bg-white transition-all duration-300 flex items-center justify-center group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Products 
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </motion.a>
            
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
            Why Choose 
            <span className="sr-only">OrbitX</span>
            <span aria-hidden="true" className="inline-block align-[0.06em] md:align-[0.08em] mx-2 leading-none">
              <Image
                src="/images/orbitx-logo.svg"
                alt=""
                aria-hidden
                width={200}
                height={60}
                className="h-[0.95em] md:h-[1.05em] w-auto inline-block align-middle"
              />
            </span>
            ?
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

// Products section removed; now lives on /products

const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-900 scroll-mt-24 md:scroll-mt-32">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              About 
              <span className="sr-only">OrbitX</span>
              <span aria-hidden="true" className="inline-block align-[0.06em] md:align-[0.08em] ml-2 leading-none">
                <Image
                  src="/images/orbitx-logo.svg"
                  alt=""
                  aria-hidden
                  width={200}
                  height={60}
                  className="h-[0.95em] md:h-[1.05em] w-auto inline-block align-middle"
                />
              </span>
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
            
            <div className="flex justify-center">
              <div className="grid grid-cols-2 gap-8 mb-8 max-w-md">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orbitx-accent mb-2">100k+</div>
                  <div className="text-sm text-gray-400">Lights Deployed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orbitx-accent mb-2">8 Years</div>
                  <div className="text-sm text-gray-400">Guarantee</div>
                </div>
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
        </div>
      </div>
    </section>
  )
}

// Our Clients section with logo grid
const OurClients = () => {
  const clientLogos = [
    {
      name: "Rhodes Food Group",
      image: "/images/clients/logos/rhodes-quality.png",
      alt: "Rhodes Food Group logo"
    },
    {
      name: "Outdoor Warehouse",
      image: "/images/clients/logos/outdoor-warehouse.png",
      alt: "Outdoor Warehouse logo"
    },
    {
      name: "Agrimark",
      image: "/images/clients/logos/agrimark.png",
      alt: "Agrimark logo"
    },
    {
      name: "Stellenpak",
      image: "/images/clients/logos/stellenpank.png",
      alt: "Stellenpak logo"
    },
    {
      name: "City Logistics",
      image: "/images/clients/logos/city-logistics.png",
      alt: "City Logistics logo"
    },
    {
      name: "The Le Roux Group",
      image: "/images/clients/logos/the-leroux-group.png",
      alt: "The Le Roux Group logo"
    },
    {
      name: "Stellenbosch University",
      image: "/images/clients/logos/stellenbosch-unoversity.png",
      alt: "Stellenbosch University logo"
    },
    {
      name: "University of Cape Town",
      image: "/images/clients/logos/university-of-capetown.png",
      alt: "University of Cape Town logo"
    },
    {
      name: "Atlantis Foundries",
      image: "/images/clients/logos/atlantis-foundaries.png",
      alt: "Atlantis Foundries logo"
    }
  ]

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="text-orbitx-accent">Clients</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Trusted by leading organizations across South Africa for reliable, long-lasting LED lighting solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8 items-center justify-items-center">
          {clientLogos.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group w-full"
            >
              <div className="bg-white rounded-xl p-4 md:p-6 transition-all duration-300 border border-gray-600 hover:border-orbitx-accent h-24 md:h-28 flex items-center justify-center hover:shadow-lg hover:shadow-orbitx-accent/20">
                <Image
                  src={client.image}
                  alt={client.alt}
                  width={140}
                  height={60}
                  className="w-full h-full object-contain object-center transition-transform duration-300 group-hover:scale-105"
                  style={{
                    maxWidth: '140px',
                    maxHeight: '60px',
                    minWidth: '80px',
                    minHeight: '40px'
                  }}
                />
              </div>
            </motion.div>
          ))}
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

const Videos = () => {
  const videos = [
    { id: 'ndW9jQkd2JQ', title: 'OrbitX Marketing Video 1' },
    { id: '1LMtXhsm3TQ', title: 'OrbitX Marketing Video 2' },
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
            Watch
            <span className="sr-only"> OrbitX</span>
            <span aria-hidden="true" className="inline-block align-[0.06em] md:align-[0.08em] ml-2 leading-none">
              <Image
                src="/images/orbitx-logo.svg"
                alt=""
                aria-hidden
                width={200}
                height={60}
                className="h-[0.95em] md:h-[1.05em] w-auto inline-block align-middle"
              />
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Learn more about our Direct Drive LED technology and explore our marketing videos.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {videos.map((v, i) => (
            <motion.div
              key={v.id}
              className="w-full rounded-xl overflow-hidden border border-gray-800 bg-black"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <div style={{ aspectRatio: '16 / 9' }} className="w-full">
                <iframe
                  title={v.title}
                  src={`https://www.youtube-nocookie.com/embed/${v.id}?rel=0`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
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
    <section id="contact" className="py-20 bg-black scroll-mt-24 md:scroll-mt-32">
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
                  <p className="text-gray-400">
                    <a
                      href="https://maps.app.goo.gl/tWs5EBrKsQ82o4wr5"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-orbitx-accent underline-offset-2 hover:underline"
                    >
                      13 Suid Street, Southern Paarl
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-orbitx-accent rounded-lg flex items-center justify-center">
                  <Phone className="text-black" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Phone</h4>
                  <p className="text-gray-400">
                    Sales: <a className="hover:text-orbitx-accent underline-offset-2 hover:underline" href={toTelHref('+27 21 879 1483')}>+27 21 879 1483</a>
                  </p>
                  <p className="text-gray-400">
                    Ian Manchip: <a className="hover:text-orbitx-accent underline-offset-2 hover:underline" href={toTelHref('+27 71 581 5751')}>+27 71 581 5751</a>
                  </p>
                  <p className="text-gray-400">
                    Frans Rossouw: <a className="hover:text-orbitx-accent underline-offset-2 hover:underline" href={toTelHref('+27 82 883 5008')}>+27 82 883 5008</a>
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
              <Image
                src="/images/orbitx-logo.svg"
                alt="OrbitX"
                width={160}
                height={48}
                className="h-10 w-auto"
              />
            </div>
            <p className="text-gray-400 mb-4">
              Leading South African manufacturer of Direct Drive LED lighting solutions 
              for industrial and commercial applications.
            </p>
            <div className="text-sm text-gray-500">
              <div className="flex items-center">
                <Award size={16} className="mr-2" />
                <a
                  href="https://www.sabs.co.za"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orbitx-accent underline-offset-2 hover:underline"
                >
                  SABS Approved
                </a>
              </div>
              <p className="pl-6 text-xs text-gray-500">Available on request</p>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <a href="/products" className="block text-gray-400 hover:text-orbitx-accent transition-colors">Products</a>
              <a href="#about" className="block text-gray-400 hover:text-orbitx-accent transition-colors">About Us</a>
              <a href="#contact" className="block text-gray-400 hover:text-orbitx-accent transition-colors">Contact</a>
              <a href={companyAssets.mainBrochure} target="_blank" rel="noopener noreferrer" className="block text-gray-400 hover:text-orbitx-accent transition-colors">Main Brochure</a>
              <a href="/guarantee" className="block text-gray-400 hover:text-orbitx-accent transition-colors">Guarantee</a>
              <a href="/sitemap" className="block text-gray-400 hover:text-orbitx-accent transition-colors">Sitemap</a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2 text-gray-400">
              <p>
                <a
                  href="https://maps.app.goo.gl/tWs5EBrKsQ82o4wr5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orbitx-accent underline-offset-2 hover:underline"
                >
                  13 Suid Street, Southern Paarl
                </a>
              </p>
              <p>
                <a className="hover:text-orbitx-accent underline-offset-2 hover:underline" href="mailto:info@orbitx.co.za">info@orbitx.co.za</a>
              </p>
              <p>
                <a className="hover:text-orbitx-accent underline-offset-2 hover:underline" href={toTelHref('+27 21 879 1483')}>+27 21 879 1483</a>
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-500">
            © 2025 OrbitX Direct Drive LED Lights. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

// Main App Component
export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Features />
  {/* Products moved to /products */}
        <About />
        <OurClients />
        <ClientShowcase />
  <Videos />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
