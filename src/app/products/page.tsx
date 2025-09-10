'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink, Award } from 'lucide-react'
import { products, companyAssets } from '../../data/products'

// Helper to convert display phone numbers to tel:+27 format
const toTelHref = (display: string) => {
  const digits = display.replace(/\D/g, '')
  const intl = digits.startsWith('0') ? `+27${digits.slice(1)}` : (digits.startsWith('27') ? `+${digits}` : `+${digits}`)
  return `tel:${intl}`
}

// Inline logo SVG (copied to avoid cross-file refactor)
const LogoSvg = ({ className = 'h-8 w-auto', title = 'OrbitX Logo' }: { className?: string; title?: string }) => (
  <svg
    className={className}
    viewBox="0 0 426 100"
    role="img"
    aria-label={title}
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>{title}</title>
    <path d="M0 0 C2.28412421 0.01071901 4.56746217 0.00005954 6.8515625 -0.01269531 C18.70244383 -0.02521115 28.86516248 0.52548447 38.015625 8.82714844 C42.05362535 13.11379413 43.89621392 17.58914291 45.2890625 23.26074219 C45.46179688 23.93073242 45.63453125 24.60072266 45.8125 25.29101562 C46.49212412 29.52613233 46.45174804 33.70436486 46.45703125 37.98730469 C46.46202385 39.40249893 46.46202385 39.40249893 46.46711731 40.84628296 C46.47217228 42.84169021 46.47452608 44.83710588 46.47436523 46.83251953 C46.47653988 49.85431249 46.49467816 52.87573307 46.51367188 55.89746094 C46.51660862 57.84407429 46.51859153 59.79068935 46.51953125 61.73730469 C46.52671677 62.62729156 46.53390228 63.51727844 46.54130554 64.43423462 C46.50268718 75.27859918 45.28742643 84.82347358 37.6875 92.97949219 C30.68381301 99.50347459 23.2310056 100.72402149 13.98046875 100.69433594 C13.01431137 100.69957779 12.04815399 100.70481964 11.05271912 100.71022034 C9.01977494 100.71661231 6.98679365 100.71534039 4.95385742 100.70678711 C1.86374318 100.69827574 -1.2245209 100.72708106 -4.31445312 100.75878906 C-6.29947862 100.76040145 -8.28450735 100.75982283 -10.26953125 100.75683594 C-11.18230331 100.76806992 -12.09507538 100.77930389 -13.0355072 100.7908783 C-21.62543154 100.69872521 -28.88230324 97.90281882 -35.2109375 91.99902344 C-47.79321186 77.41800237 -43.33111071 48.81767175 -42.3984375 31.13574219 C-41.63110189 22.77914209 -39.91671039 14.31840594 -33.7109375 8.26074219 C-23.25667972 0.33308261 -12.60938368 -0.07041323 0 0 Z M-17.7109375 21.26074219 C-22.05336304 26.95081704 -21.87760948 33.11018031 -21.9140625 39.96386719 C-21.91976257 40.80109314 -21.92546265 41.63831909 -21.93133545 42.50091553 C-21.94075824 44.26931506 -21.94730859 46.03773193 -21.95117188 47.80615234 C-21.9608552 50.4879484 -21.99189488 53.16897017 -22.0234375 55.85058594 C-22.02997089 57.57584185 -22.03522004 59.30110319 -22.0390625 61.02636719 C-22.0514093 61.81730774 -22.0637561 62.60824829 -22.07647705 63.42315674 C-22.05187631 69.68577779 -21.31215882 76.65952086 -16.7109375 81.26074219 C-10.77589957 84.22826115 -4.38826059 83.52434849 2.1015625 83.57324219 C3.37322266 83.60224609 4.64488281 83.63125 5.95507812 83.66113281 C14.98955724 83.87301156 14.98955724 83.87301156 22.2890625 79.26074219 C27.30619559 70.43750813 26.47109903 59.74183463 26.4765625 49.88574219 C26.49493164 48.15324219 26.49493164 48.15324219 26.51367188 46.38574219 C26.82905477 33.30273536 26.82905477 33.30273536 21.8515625 21.63574219 C16.49913365 16.67495447 9.37884651 18.03847613 2.4765625 18.01074219 C1.20490234 17.99011719 -0.06675781 17.96949219 -1.37695312 17.94824219 C-2.60736328 17.94308594 -3.83777344 17.93792969 -5.10546875 17.93261719 C-6.22800049 17.92327148 -7.35053223 17.91392578 -8.50708008 17.90429688 C-12.17852463 18.31276362 -14.55980357 19.36111638 -17.7109375 21.26074219 Z " fill="#3534FE" transform="translate(42.7109375,-0.2607421875)"/>
    <path d="M0 0 C18.17016475 -1.93854856 18.17016475 -1.93854856 23.9765625 2.0390625 C25.85995626 4.59963154 27.44455989 7.16524642 28.90429688 9.98730469 C30.62853561 13.15455605 32.66600027 16.10027926 34.68334961 19.08642578 C35.7500405 20.66672042 36.803532 22.25602468 37.84204102 23.85498047 C40.28998441 27.61190782 42.62775954 30.98821279 46 34 C46.2371875 33.30648437 46.474375 32.61296875 46.71875 31.8984375 C48.53497292 27.78978687 51.1750273 24.38607882 53.85961914 20.81787109 C56.2736555 17.5622402 58.39153284 14.37508339 60.21484375 10.75 C64.54248495 2.50554525 64.54248495 2.50554525 68 0 C74.21813028 -1.75864974 80.69537754 -0.87384397 87 0 C87.67065421 5.02518365 85.40395073 7.88296939 82.5625 11.75 C81.56246198 13.15660028 80.56386734 14.56422742 79.56640625 15.97265625 C78.72746826 17.14852295 78.72746826 17.14852295 77.87158203 18.34814453 C74.56978856 23.02647491 71.3592953 27.76727525 68.14328003 32.50476074 C67.01516298 34.16518234 65.8837021 35.82333049 64.75219727 37.48144531 C64.05022217 38.51237305 63.34824707 39.54330078 62.625 40.60546875 C61.99851562 41.52481201 61.37203125 42.44415527 60.7265625 43.39135742 C59.07448472 45.88746193 57.51851634 48.42090946 56 51 C56.87398438 52.20269531 56.87398438 52.20269531 57.765625 53.4296875 C63.20936543 60.96396843 68.46207578 68.60394178 73.58007812 76.36328125 C75.92427736 79.91158802 78.28665583 83.43586958 80.76171875 86.89453125 C81.18380615 87.4867749 81.60589355 88.07901855 82.04077148 88.68920898 C83.17066586 90.26439991 84.31149437 91.83173164 85.453125 93.3984375 C87 96 87 96 87 100 C80.27542326 101.488226 73.55059005 102.68447376 67 100 C60.67343929 94.17794162 56.660531 86.29768616 52.59033203 78.81982422 C51.20258529 76.3592048 49.73679447 74.1148437 48.05859375 71.84765625 C46 69 46 69 46 67 C42.53198832 70.30335052 39.74036734 73.59458509 37.1171875 77.59765625 C36.42496094 78.64630859 35.73273438 79.69496094 35.01953125 80.77539062 C33.95798828 82.40250977 33.95798828 82.40250977 32.875 84.0625 C31.45666583 86.22066794 30.03743104 88.37824434 28.6171875 90.53515625 C27.99440918 91.487854 27.37163086 92.44055176 26.72998047 93.42211914 C26.15908691 94.27281982 25.58819336 95.12352051 25 96 C24.53118408 96.76465576 24.06236816 97.52931152 23.5793457 98.31713867 C22 100 22 100 19.73168945 100.45410156 C18.86761475 100.4331543 18.00354004 100.41220703 17.11328125 100.390625 C16.17548828 100.37773438 15.23769531 100.36484375 14.27148438 100.3515625 C13.29501953 100.31804687 12.31855469 100.28453125 11.3125 100.25 C10.32443359 100.23195313 9.33636719 100.21390625 8.31835938 100.1953125 C5.87793158 100.14815447 3.43945231 100.08236042 1 100 C4.70633603 92.89939418 9.06262263 86.40517154 13.6875 79.875 C15.11032586 77.84571844 16.53220011 75.81576934 17.953125 73.78515625 C18.64212891 72.8017627 19.33113281 71.81836914 20.04101562 70.80517578 C22.70264611 66.99384299 25.33754166 63.16614091 27.9375 59.3125 C28.34379639 58.72001465 28.75009277 58.1275293 29.16870117 57.51708984 C31.96135255 53.56831547 31.96135255 53.56831547 33 49 C31.7009827 46.60352955 31.7009827 46.60352955 29.6875 44.1875 C26.44842702 39.94319747 23.37026595 35.65124863 20.4375 31.1875 C15.32846749 23.44301096 10.0876139 15.79062025 4.82592773 8.14916992 C4.20016846 7.23627197 3.57440918 6.32337402 2.9296875 5.3828125 C2.36491699 4.56184082 1.80014648 3.74086914 1.21826172 2.89501953 C0 1 0 1 0 0 Z " fill="#AAAAAA" transform="translate(339,0)"/>
    <path d="M0 0 C5.94 0 11.88 0 18 0 C18.33 12.54 18.66 25.08 19 38 C20.32 36.68 21.64 35.36 23 34 C31.15644406 29.51144352 41.55556117 29.93273428 50.375 32 C55.67636393 33.83043836 59.16705609 37.20331088 62 42 C64.0754065 47.68080549 64.45680192 53.14467898 64.6875 59.125 C64.74393677 60.51779175 64.74393677 60.51779175 64.80151367 61.9387207 C65.66016052 86.80919944 65.66016052 86.80919944 58.25 94.9140625 C51.89807232 100.49846558 47.04967177 100.24263744 38.75 100.3125 C37.61691406 100.34150391 36.48382813 100.37050781 35.31640625 100.40039062 C28.90577097 100.44924072 24.84962527 100.37302416 20 96 C19.505 95.505 19.505 95.505 19 95 C18.67 96.65 18.34 98.3 18 100 C12.06 100 6.12 100 0 100 C0 67 0 34 0 0 Z M22 48 C16.23322836 55.49680314 17.40349357 66.02754918 18 75 C18.712558 79.1286449 19.64332412 82.60143151 22.64453125 85.6953125 C25.96625844 87.53520782 28.66143535 87.43375762 32.4375 87.4375 C34.38462891 87.46650391 34.38462891 87.46650391 36.37109375 87.49609375 C40.60281819 86.91759105 42.16660037 86.17279051 45 83 C47.20820638 77.59623211 47.33545357 72.37257489 47.3125 66.625 C47.32861328 65.82578125 47.34472656 65.0265625 47.36132812 64.203125 C47.36596524 58.47165294 46.55470879 53.19035474 44 48 C40.02632696 44.87782833 36.15272827 44.52453583 31.24609375 44.71484375 C27.59498641 45.17837564 25.20799588 46.13936239 22 48 Z " fill="#3534FE" transform="translate(167,0)"/>
    <path d="M0 0 C5.94 0 11.88 0 18 0 C18 4.62 18 9.24 18 14 C26.25 14 34.5 14 43 14 C43 18.62 43 23.24 43 28 C34.75 28 26.5 28 18 28 C18.09719546 32.87511986 18.20008516 37.74944068 18.31738281 42.62402344 C18.3555451 44.28052556 18.39041975 45.93710695 18.421875 47.59375 C18.467804 49.98205801 18.52575037 52.36982632 18.5859375 54.7578125 C18.59748871 55.49242706 18.60903992 56.22704163 18.62094116 56.98391724 C18.74444727 61.33667794 19.41074817 64.94601375 21 69 C22.47906892 69.02689216 23.95827483 69.04634621 25.4375 69.0625 C26.26121094 69.07410156 27.08492188 69.08570312 27.93359375 69.09765625 C29.99163938 69.23267348 29.99163938 69.23267348 31 68 C31.23427778 65.98405418 31.41336124 63.961526 31.5625 61.9375 C31.706875 59.978125 31.85125 58.01875 32 56 C36.95 56 41.9 56 47 56 C47.4422626 72.65855803 47.4422626 72.65855803 44 78 C37.58087434 83.94943354 32.18651757 83.24693121 23.75 83.3125 C22.52152344 83.34150391 21.29304688 83.37050781 20.02734375 83.40039062 C8.73427368 83.47991929 8.73427368 83.47991929 4 79 C-0.46668831 72.99307434 -0.1401523 66.71460278 -0.09765625 59.54296875 C-0.0962413 58.64000565 -0.09482635 57.73704254 -0.09336853 56.80671692 C-0.08778823 53.93361037 -0.07523934 51.06058284 -0.0625 48.1875 C-0.05748245 46.23502717 -0.05291999 44.28255311 -0.04882812 42.33007812 C-0.03782525 37.55335515 -0.02057418 32.77669096 0 28 C-2.97 28 -5.94 28 -9 28 C-9 23.38 -9 18.76 -9 14 C-6.03 14 -3.06 14 0 14 C0 9.38 0 4.76 0 0 Z " fill="#3534FE" transform="translate(281,17)"/>
    <path d="M0 0 C5.94 0 11.88 0 18 0 C18.33 1.98 18.66 3.96 19 6 C19.70125 5.38125 20.4025 4.7625 21.125 4.125 C27.00171082 -0.21865582 32.89943824 -0.69139937 40 0 C46.21949366 1.28716478 49.43142462 3.80934491 53 9 C53.90238747 11.70716242 54.11851302 13.23776768 54.09765625 16.01171875 C54.09443359 16.76904297 54.09121094 17.52636719 54.08789062 18.30664062 C54.07532227 19.48516602 54.07532227 19.48516602 54.0625 20.6875 C54.05798828 21.48478516 54.05347656 22.28207031 54.04882812 23.10351562 C54.0370585 25.06904257 54.01912348 27.03453085 54 29 C48.72 29 43.44 29 38 29 C37.51171875 26.20052083 37.0234375 23.40104167 36.53515625 20.6015625 C36.12287938 18.03090344 36.12287938 18.03090344 35 16 C30.27828547 14.58845587 26.89276675 14.53767436 22.5 16.8125 C19.53455146 19.40039455 19.53455146 19.40039455 18.84178162 23.06277466 C18.82623734 23.91104828 18.81069305 24.7593219 18.79467773 25.63330078 C18.77473251 26.59414581 18.75478729 27.55499084 18.73423767 28.54495239 C18.70916893 30.10438065 18.70916893 30.10438065 18.68359375 31.6953125 C18.66281265 32.75789276 18.64203156 33.82047302 18.62062073 34.91525269 C18.55509739 38.31843438 18.49622727 41.72169489 18.4375 45.125 C18.39431743 47.42839366 18.35070323 49.73177926 18.30664062 52.03515625 C18.19941313 57.69002284 18.09815351 63.34496892 18 69 C12.06 69 6.12 69 0 69 C0 46.23 0 23.46 0 0 Z " fill="#3534FE" transform="translate(101,31)"/>
    <path d="M0 0 C5.94 0 11.88 0 18 0 C18 22.77 18 45.54 18 69 C12.06 69 6.12 69 0 69 C0 46.23 0 23.46 0 0 Z " fill="#3534FE" transform="translate(243,31)"/>
    <path d="M0 0 C5.94 0 11.88 0 18 0 C18 5.94 18 11.88 18 18 C12.06 18 6.12 18 0 18 C0 12.06 0 6.12 0 0 Z " fill="#3534FE" transform="translate(243,0)"/>
  </svg>
)

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top Nav */}
      <motion.header 
        className="sticky top-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-gray-800"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" aria-label="OrbitX Home" className="flex items-center">
            <LogoSvg className="h-8 w-auto" />
          </Link>
          <nav className="hidden md:flex items-center space-x-8 text-sm">
            <Link href="/" className="hover:text-orbitx-accent">Home</Link>
            <Link href="/products" className="text-orbitx-accent">Products</Link>
            <Link href="/#about" className="hover:text-orbitx-accent">About</Link>
            <Link href="/#contact" className="hover:text-orbitx-accent">Contact</Link>
          </nav>
          <Link 
            href={companyAssets.mainBrochure}
            target="_blank"
            className="px-4 py-2 border border-orbitx-accent text-orbitx-accent rounded-lg hover:bg-orbitx-accent hover:text-black transition"
          >
            Brochure
          </Link>
        </div>
      </motion.header>

      <main>
        {/* Hero */}
        <section className="relative py-20 bg-gray-900">
          <div className="container mx-auto px-6 text-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Our Products
            </motion.h1>
            <motion.p 
              className="text-lg text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Explore our industrial-grade Direct Drive LED range. Download full specifications for each product.
            </motion.p>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16 bg-black">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-orbitx-accent transition-all duration-300 group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ y: -4 }}
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
                        whileHover={{ x: 4 }}
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
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gray-900">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-gray-300 mb-6">Need help choosing? Download our brochure or contact us.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a 
                  href={companyAssets.mainBrochure}
                  target="_blank"
                  className="px-6 py-3 bg-orbitx-accent text-black font-semibold rounded-lg hover:bg-white transition"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Download Brochure
                </motion.a>
                <motion.a 
                  href="/#contact"
                  className="px-6 py-3 border border-orbitx-accent text-orbitx-accent rounded-lg hover:bg-orbitx-accent hover:text-black transition"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Contact Us
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      {/* Footer copied from home page for consistency */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="mb-4">
                <LogoSvg className="h-10 w-auto" />
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
                <Link href="/products" className="block text-gray-400 hover:text-orbitx-accent transition-colors">Products</Link>
                <Link href="/#about" className="block text-gray-400 hover:text-orbitx-accent transition-colors">About Us</Link>
                <Link href="/#contact" className="block text-gray-400 hover:text-orbitx-accent transition-colors">Contact</Link>
                <a href={companyAssets.mainBrochure} target="_blank" rel="noopener noreferrer" className="block text-gray-400 hover:text-orbitx-accent transition-colors">Main Brochure</a>
                <a href={companyAssets.guaranteeDocument} target="_blank" rel="noopener noreferrer" className="block text-gray-400 hover:text-orbitx-accent transition-colors">Guarantee Info</a>
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
