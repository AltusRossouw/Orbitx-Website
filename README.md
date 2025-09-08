# OrbitX - Modern LED Lighting Website

A modern, responsive website for OrbitX Direct Drive LED Lights, built with Next.js, TypeScript, and Tailwind CSS.

## Overview

This is a complete rebuild of the OrbitX website (orbitx.co.za) with a modern dark theme, showcasing their industrial LED lighting solutions. The website features all the original company information, products, and contact details with a sleek, tech-themed design.

## Features

- **Modern Dark Theme**: Professional dark color scheme with OrbitX branding colors
- **Responsive Design**: Fully responsive across all devices
- **Interactive Animations**: Smooth animations using Framer Motion
- **Product Showcase**: Complete product catalog with specifications
- **Company Information**: About section with client testimonials
- **Contact Forms**: Interactive contact forms and information
- **Performance Optimized**: Built with Next.js for optimal performance

## Products Featured

- **Neptune Ex Rated**: IP68 explosion-rated linear LED lights
- **Neptune**: IP65 linear LED lights
- **Titan**: Heavy-duty integrated linear LED lights
- **Rhea Bulkhead**: Surface mount LED lights
- **Phoebe Bulkhead**: IP65 surface mount LED lights
- **T8 LED Tubes**: Energy-efficient tube replacements
- **And many more...**

## Technology Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment Ready**: Optimized for production

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd orbitx-website-new
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Company Information

**OrbitX Direct Drive LED Lights**
- Address: 13 Suid Street, Southern Paarl
- Phone: 021 879 1483
- Email: info@orbitx.co.za
- Contacts: Ian Manchip (071 581 5751), Frans Rossouw (082 883 5008)

## Key Features Implemented

✅ **Hero Section** - Animated landing with company branding
✅ **Product Catalog** - All OrbitX LED products with specifications  
✅ **Company Story** - About section with 100k+ lights deployed
✅ **Client Showcase** - Major clients including universities and corporations
✅ **Contact Information** - Complete contact details and forms
✅ **8-Year Guarantee** - Highlighting their unique double guarantee
✅ **South African Made** - Emphasizing local manufacturing
✅ **Direct Drive Technology** - Their unique selling proposition
✅ **Mobile Responsive** - Works perfectly on all devices
✅ **SEO Optimized** - Meta tags and structured content

## Design Principles

- **Dark Theme**: Professional appearance suitable for industrial clients
- **Tech-Forward**: Modern animations and interactions
- **Content-First**: All original OrbitX information preserved
- **Performance**: Fast loading and optimized assets
- **Accessibility**: Proper contrast ratios and semantic HTML

## Deployment

The website is **production-ready** and can be deployed to:
- **Docker & Portainer** (recommended - see DEPLOYMENT.md)
- Vercel (recommended for Next.js)
- Netlify
- AWS Amplify
- Any hosting platform supporting Node.js or Docker

### 🐳 **Docker Deployment (Portainer Ready)**

This project includes complete Docker configuration for easy deployment in Portainer:

#### Quick Start:
```bash
# Build and run with Docker
docker build -t orbitx-website .
docker run -d -p 3000:3000 --name orbitx-website orbitx-website

# Or use docker-compose
docker-compose up -d --build

# Or use the deployment script
./deploy.sh build
```

#### Portainer Deployment:
1. Upload project to your server
2. In Portainer, go to **Stacks** → **Add Stack**
3. Use the provided `docker-compose.yml`
4. Deploy and access on port 3000

See `DEPLOYMENT.md` for detailed Portainer setup instructions.

## License

This project is proprietary to OrbitX Direct Drive LED Lights.
