"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import Header from '@/components/Header'
import { MapPin, Phone, Mail, Clock, Send, ExternalLink, Award } from 'lucide-react'
import { companyAssets } from '@/data/products'

// Local helper to convert display phone numbers to tel:+27 format
const toTelHref = (display: string) => {
  const digits = display.replace(/\D/g, '')
  const intl = digits.startsWith('0') ? `+27${digits.slice(1)}` : (digits.startsWith('27') ? `+${digits}` : `+${digits}`)
  return `tel:${intl}`
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative py-20 bg-gray-900 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
            <motion.div 
              className="absolute inset-0 opacity-30"
              animate={{
                background: [
                  "radial-gradient(circle at 20% 50%, #0066cc 0%, transparent 50%)",
                  "radial-gradient(circle at 80% 20%, #0084ff 0%, transparent 50%)",
                  "radial-gradient(circle at 40% 80%, #0066cc 0%, transparent 50%)"
                ]
              }}
              transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
            />
          </div>
          <div className="relative z-10 container mx-auto px-6 text-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Contact Us
            </motion.h1>
            <motion.p 
              className="text-lg text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              We can’t wait to hear from you. Reach out via phone, email, or the form below.
            </motion.p>
          </div>
        </section>

        {/* Contact Info + Form */}
        <section className="py-16 bg-black">
          <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12">
            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orbitx-accent rounded-lg flex items-center justify-center shrink-0">
                  <MapPin className="text-black" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Address</h3>
                  <p className="text-gray-400">
                    <a
                      href="https://maps.app.goo.gl/tWs5EBrKsQ82o4wr5"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-orbitx-accent underline-offset-2 hover:underline inline-flex items-center gap-1"
                    >
                      13 Suid Street, Southern Paarl
                      <ExternalLink size={14} className="opacity-70" />
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orbitx-accent rounded-lg flex items-center justify-center shrink-0">
                  <Phone className="text-black" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Phone</h3>
                  <p className="text-gray-400">Sales: <a className="hover:text-orbitx-accent underline-offset-2 hover:underline" href={toTelHref('+27 21 879 1483')}>+27 21 879 1483</a></p>
                  <p className="text-gray-400">Ian Manchip: <a className="hover:text-orbitx-accent underline-offset-2 hover:underline" href={toTelHref('+27 71 581 5751')}>+27 71 581 5751</a></p>
                  <p className="text-gray-400">Frans Rossouw: <a className="hover:text-orbitx-accent underline-offset-2 hover:underline" href={toTelHref('+27 82 883 5008')}>+27 82 883 5008</a></p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orbitx-accent rounded-lg flex items-center justify-center shrink-0">
                  <Mail className="text-black" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Email</h3>
                  <p className="text-gray-400"><a className="hover:text-orbitx-accent underline-offset-2 hover:underline" href="mailto:info@orbitx.co.za">info@orbitx.co.za</a></p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orbitx-accent rounded-lg flex items-center justify-center shrink-0">
                  <Clock className="text-black" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Business Hours</h3>
                  <p className="text-gray-400">Mon–Fri: 08:00 – 17:00</p>
                  <p className="text-gray-400">Weekends & Public Holidays: Closed</p>
                </div>
              </div>

              {/* Map */}
              <div className="rounded-xl overflow-hidden border border-gray-800 bg-gray-900">
                <div style={{ aspectRatio: '16 / 9' }} className="w-full">
                  <iframe
                    title="OrbitX Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3316.7803310223017!2d18.959728813488013!3d-33.766341913651715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dcda8457ff03b8f%3A0xc4b7eed4c09800b1!2sOrbitX%20Direct%20Drive%20LED%20Lights!5e0!3m2!1sen!2sza!4v1757516928141!5m2!1sen!2sza"
                    className="w-full h-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <ContactForm />
            </motion.div>
          </div>
        </section>
      </main>
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
              <div className="flex items-center text-sm text-gray-500">
                <Award size={16} className="mr-2" />
                <a
                  href="https://www.sabs.co.za"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orbitx-accent underline-offset-2 hover:underline"
                >
                  SABS approved
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <a href="/products" className="block text-gray-400 hover:text-orbitx-accent transition-colors">Products</a>
                <a href="/#about" className="block text-gray-400 hover:text-orbitx-accent transition-colors">About Us</a>
                <a href="/#contact" className="block text-gray-400 hover:text-orbitx-accent transition-colors">Contact</a>
                <a href={companyAssets.mainBrochure} target="_blank" rel="noopener noreferrer" className="block text-gray-400 hover:text-orbitx-accent transition-colors">Main Brochure</a>
                <a href="/guarantee" className="block text-gray-400 hover:text-orbitx-accent transition-colors">Guarantee</a>
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
    </div>
  )
}

function ContactForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = (data.get('name') as string) || ''
    const email = (data.get('email') as string) || ''
    const subject = (data.get('subject') as string) || ''
    const message = (data.get('message') as string) || ''

    // Fallback: open mail client
    const mailto = `mailto:info@orbitx.co.za?subject=${encodeURIComponent(subject || 'Website enquiry')}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`
    window.location.href = mailto
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid md:grid-cols-2 gap-6">
        <input 
          name="name"
          type="text" 
          placeholder="Your Name"
          required
          className="w-full p-4 bg-gray-900 border border-gray-800 rounded-lg focus:border-orbitx-accent focus:outline-none transition-colors"
        />
        <input 
          name="email"
          type="email" 
          placeholder="Your Email"
          required
          className="w-full p-4 bg-gray-900 border border-gray-800 rounded-lg focus:border-orbitx-accent focus:outline-none transition-colors"
        />
      </div>
      <input 
        name="subject"
        type="text" 
        placeholder="Subject"
        className="w-full p-4 bg-gray-900 border border-gray-800 rounded-lg focus:border-orbitx-accent focus:outline-none transition-colors"
      />
      <textarea 
        name="message"
        rows={8} 
        placeholder="Your Message"
        required
        className="w-full p-4 bg-gray-900 border border-gray-800 rounded-lg focus:border-orbitx-accent focus:outline-none transition-colors resize-none"
      />
      <div className="grid sm:grid-cols-2 gap-3">
        <motion.button 
          type="submit"
          className="w-full p-4 bg-orbitx-accent text-black font-semibold rounded-lg hover:bg-white transition-colors flex items-center justify-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Send size={18} /> Send Message
        </motion.button>
        <a
          href="/#contact"
          className="w-full p-4 text-center border border-gray-800 rounded-lg hover:border-orbitx-accent hover:text-orbitx-accent transition-colors"
        >
          Back to Landing Contact
        </a>
      </div>
    </form>
  )
}