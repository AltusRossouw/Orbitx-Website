# OrbitX LED Lighting Website

Modern, responsive website for OrbitX LED lighting company built with Next.js 14, TypeScript, and Tailwind CSS.

## 🌟 Features

- **Modern Design**: Dark theme with professional LED lighting aesthetics
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **Performance Optimized**: Next.js 14 with App Router for fast loading
- **SEO Ready**: Open Graph meta tags for social media sharing
- **TypeScript**: Full type safety throughout the application
- **Product Showcase**: Complete product catalog with images and specifications
- **Docker Ready**: Optimized for containerized deployment with Portainer

## 🚀 Quick Start

### Development

1. **Clone & Install:**
   ```bash
   git clone https://github.com/AltusRossouw/Orbitx-Website-New.git
   cd Orbitx-Website-New
   npm install
   ```

2. **Development:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

3. **Production Build:**
   ```bash
   npm run build
   npm start
   ```

### 🐳 Portainer Deployment

For production deployment using Portainer:

1. **Quick Start:**
   ```bash
   ./scripts/portainer-quickstart.sh
   ```

2. **Manual Portainer Deployment:**
   - See [PORTAINER-DEPLOYMENT.md](./PORTAINER-DEPLOYMENT.md) for detailed instructions
   - Use the included `docker-compose.yml` file
   - Access on port 3330 by default

3. **Verify Deployment:**
   ```bash
   ./scripts/verify-deployment.sh
   ```

## 📁 Project Structure

```
src/
├── app/
│   ├── api/health/          # Health check endpoint
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Main website component
├── components/              # React components
└── data/
    └── products.ts          # Product catalog data

public/
├── images/                  # Website images and assets
├── pdfs/                    # Product specification PDFs
└── social/                  # Social media sharing images
```

## 🛠 Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Font**: Inter (Google Fonts)
- **Deployment**: Docker with Portainer support

## 🐳 Docker & Deployment

### Included Files
- `Dockerfile`: Multi-stage production build
- `docker-compose.yml`: Complete stack configuration
- `.env.example`: Environment variable template
- `PORTAINER-DEPLOYMENT.md`: Detailed deployment guide

### Health Monitoring
- Health check endpoint: `/api/health`
- Container health monitoring
- Resource usage tracking
- Deployment verification scripts

### Configuration
```bash
# Environment variables (see .env.example)
ORBITX_PORT=3330              # External port
NODE_ENV=production           # Environment
CONTAINER_NAME=orbitx-website # Container name
CPU_LIMIT=1.0                 # CPU cores
MEMORY_LIMIT=1G               # Memory limit
```

## 📱 Website Sections

- **Header**: Navigation with OrbitX logo
- **Hero**: Main introduction with call-to-action
- **Products**: Product showcase with specifications
- **About**: Company information and expertise
- **Contact**: Contact details and inquiry form

## 🔗 WhatsApp Integration

The website includes optimized WhatsApp sharing with:
- Custom social media preview images
- Open Graph meta tags
- Proper sharing metadata

## 📊 Performance Features

- Static site generation for fast loading
- Image optimization with Next.js Image component
- Code splitting and lazy loading
- SEO-optimized meta tags

## 🎨 Design Highlights

- **Dark Theme**: Professional appearance matching LED industry
- **Blue Accent Colors**: Consistent with OrbitX branding (#3534FE)
- **Responsive Grid Layouts**: Adapts to all screen sizes
- **Smooth Animations**: Enhanced user experience with Framer Motion

## 📈 SEO & Social Media

- Complete Open Graph implementation
- Twitter Card support
- WhatsApp-optimized sharing
- Structured metadata for search engines

---

**Built with ❤️ for OrbitX LED Lighting Solutions**
