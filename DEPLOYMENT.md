# OrbitX Website - Portainer Deployment Guide

## 📦 **Docker Package Ready for Portainer**

This OrbitX website has been configured as a complete Docker package that can be easily deployed in Portainer.

## 🚀 **Quick Deployment Options**

### **Option 1: Simple Deployment (Recommended for testing)**
Use the basic `docker-compose.yml` file:

```bash
# Build and run the container
docker-compose up -d --build
```

**Access:** http://localhost:3000

### **Option 2: Production Deployment with Nginx**
Use the `docker-compose.prod.yml` for production with reverse proxy:

```bash
# Build and run with nginx reverse proxy
docker-compose -f docker-compose.prod.yml up -d --build
```

**Access:** http://localhost:80

## 🔧 **Portainer Deployment Steps**

### **Method 1: Using Portainer Stacks (Recommended)**

1. **Login to Portainer Dashboard**
2. **Navigate to Stacks** → **Add Stack**
3. **Choose deployment method:**

   **Option A: Git Repository**
   - Name: `orbitx-website`
   - Repository URL: `<your-git-repo-url>`
   - Compose path: `docker-compose.yml` (or `docker-compose.prod.yml`)
   - Auto-updates: Enable (optional)

   **Option B: Web Editor**
   - Name: `orbitx-website`
   - Copy and paste the docker-compose content below

4. **Deploy the Stack**

### **Basic Docker Compose for Portainer:**

```yaml
version: '3.8'

services:
  orbitx-website:
    build: .
    container_name: orbitx-website
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_TELEMETRY_DISABLED=1
    restart: unless-stopped
    networks:
      - orbitx-network

networks:
  orbitx-network:
    driver: bridge
```

### **Production Docker Compose (with Nginx):**

```yaml
version: '3.8'

services:
  orbitx-website:
    build: .
    container_name: orbitx-website
    environment:
      - NODE_ENV=production
      - NEXT_TELEMETRY_DISABLED=1
    restart: unless-stopped
    networks:
      - orbitx-network

  nginx:
    image: nginx:alpine
    container_name: orbitx-nginx
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
    depends_on:
      - orbitx-website
    restart: unless-stopped
    networks:
      - orbitx-network

networks:
  orbitx-network:
    driver: bridge
```

### **Method 2: Using Portainer App Templates**

1. Create a custom app template in Portainer:
   - **Name:** OrbitX Website
   - **Description:** Modern LED lighting company website
   - **Logo:** https://orbitx.co.za/favicon.ico
   - **Repository:** `<your-repo-url>`
   - **Compose File:** docker-compose.yml

## 📁 **Required Files Structure**

Make sure your repository contains these files:

```
orbitx-website/
├── Dockerfile
├── docker-compose.yml
├── docker-compose.prod.yml
├── nginx.conf
├── .dockerignore
├── package.json
├── next.config.js
├── src/
├── public/
│   ├── images/
│   └── pdfs/
└── README.md
```

## 🔧 **Configuration Options**

### **Environment Variables**
You can customize the deployment with these environment variables:

```yaml
environment:
  - NODE_ENV=production
  - NEXT_TELEMETRY_DISABLED=1
  - PORT=3000  # Custom port if needed
```

### **Port Configuration**
- **Default:** 3000 (development)
- **Production with Nginx:** 80 (HTTP) / 443 (HTTPS)
- **Custom:** Modify the ports section in docker-compose

### **SSL/HTTPS Setup (Optional)**
1. Place SSL certificates in `./ssl/` directory
2. Uncomment HTTPS server block in `nginx.conf`
3. Update `docker-compose.prod.yml` to expose port 443

## 🚀 **Deployment Commands**

### **Local Testing:**
```bash
# Build the Docker image
docker build -t orbitx-website .

# Run the container
docker run -d -p 3000:3000 --name orbitx-website orbitx-website
```

### **Production Deployment:**
```bash
# Using production compose
docker-compose -f docker-compose.prod.yml up -d --build

# View logs
docker-compose logs -f orbitx-website

# Stop/restart
docker-compose down
docker-compose up -d
```

## 📊 **Container Specifications**

- **Base Image:** Node.js 18 Alpine Linux
- **Final Size:** ~150MB (optimized with standalone output)
- **Memory Usage:** ~100-200MB
- **CPU Usage:** Low (static website with SSG)
- **Architecture:** Multi-platform (amd64, arm64)

## 🔍 **Health Checks & Monitoring**

The container exposes port 3000 and can be monitored via:
- **Health Check URL:** `http://container-ip:3000/`
- **Status:** Check container logs in Portainer
- **Resource Usage:** Monitor via Portainer dashboard

## 🔒 **Security Features**

- ✅ Non-root user execution
- ✅ Minimal attack surface (Alpine Linux)
- ✅ Security headers via Nginx
- ✅ No sensitive data in container
- ✅ Read-only file system compatible

## 🎯 **Production Ready**

This Docker package is production-ready with:
- ✅ Optimized Next.js standalone output
- ✅ Multi-stage build for minimal size
- ✅ Nginx reverse proxy support
- ✅ SSL/TLS ready configuration
- ✅ Container orchestration ready
- ✅ Auto-restart policies
- ✅ Proper logging and monitoring

## 🆘 **Troubleshooting**

**Container won't start:**
- Check logs: `docker logs orbitx-website`
- Verify port availability: `netstat -tulpn | grep :3000`

**Build fails:**
- Check Docker disk space: `docker system df`
- Clear build cache: `docker system prune -a`

**Can't access website:**
- Verify port mapping in docker-compose
- Check firewall settings
- Confirm container is running: `docker ps`
