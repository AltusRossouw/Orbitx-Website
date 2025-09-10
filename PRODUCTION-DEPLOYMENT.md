# 🚀 OrbitX Website - Production Deployment Guide

## 📋 **Production-Ready Configuration**

Your OrbitX website is now ready for production deployment on Portainer with a clean, optimized Docker setup.

### **🎯 Key Features:**
- ✅ **Optimized Build Process**: Clean Dockerfile with proper dependency management
- ✅ **Health Monitoring**: Built-in health checks via `/api/health`
- ✅ **Resource Management**: CPU and memory limits configured
- ✅ **Security**: Non-root user execution
- ✅ **Performance**: Cache persistence and efficient image layers
- ✅ **Auto-Updates**: Watchtower integration for automatic updates

## 🔧 **Deployment Options**

### **Option 1: Portainer Stack (Recommended)**

1. **Open Portainer** → Stacks → Add Stack
2. **Stack Name**: `orbitx-website`
3. **Method**: Git Repository
4. **Repository URL**: `https://github.com/AltusRossouw/Orbitx-Website-New.git`
5. **Reference**: `refs/heads/main`
6. **Compose File**: `docker-compose.yml`
7. **Deploy**

### **Option 2: Copy & Paste Stack**

Use this YAML in Portainer Web Editor:

```yaml
version: '3.8'

services:
  orbitx-website:
    build:
      context: https://github.com/AltusRossouw/Orbitx-Website-New.git
      dockerfile: Dockerfile
    container_name: orbitx-website
    ports:
      - "3330:3000"
    environment:
      - NODE_ENV=production
      - NEXT_TELEMETRY_DISABLED=1
      - PORT=3000
      - HOSTNAME=0.0.0.0
    volumes:
      - orbitx_cache:/app/.next/cache
    restart: unless-stopped
    
    # Resource limits
    deploy:
      resources:
        limits:
          cpus: '1.0'
          memory: 1G
        reservations:
          cpus: '0.5'
          memory: 512M
    
    # Health check
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/api/health", "||", "exit", "1"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 60s
    
    # Labels for management
    labels:
      - "com.centurylinklabs.watchtower.enable=true"
      - "traefik.enable=false"
      - "app=orbitx-website"
      - "environment=production"

volumes:
  orbitx_cache:
    driver: local
    labels:
      - "app=orbitx-website"
```

## 🌐 **Access Your Website**

After deployment:
- **Website**: `http://your-server-ip:3330`
- **Health Check**: `http://your-server-ip:3330/api/health`

## 📊 **Resource Requirements**

- **CPU**: 0.5-1.0 cores
- **Memory**: 512MB-1GB
- **Disk**: ~500MB for image + cache
- **Network**: Port 3330

## ⏱️ **Deployment Timeline**

- **First Build**: 3-5 minutes
- **Container Start**: 30-60 seconds
- **Health Check**: 30 seconds
- **Total**: ~6 minutes

## 🔍 **Monitoring & Health**

### **Health Check Endpoint**
Your website includes a built-in health endpoint at `/api/health` that returns:
```json
{
  "status": "healthy",
  "timestamp": "2025-09-10T11:48:39.000Z",
  "uptime": 123.45,
  "environment": "production",
  "version": "0.1.0",
  "service": "orbitx-website"
}
```

### **Container Health**
- **Interval**: Every 30 seconds
- **Timeout**: 10 seconds
- **Retries**: 3 attempts
- **Grace Period**: 60 seconds on startup

## 🛠️ **Troubleshooting**

### **Build Issues**
- Check Portainer build logs
- Ensure GitHub repository is accessible
- Verify all dependencies in package.json

### **Container Won't Start**
- Check port 3330 availability: `netstat -tlnp | grep 3330`
- Review container logs in Portainer
- Verify resource allocation (CPU/Memory)

### **Health Check Failing**
- Access health endpoint directly: `curl http://localhost:3330/api/health`
- Check container logs for Node.js errors
- Verify application is binding to 0.0.0.0:3000

## 🔄 **Updates & Maintenance**

### **Automatic Updates**
- Watchtower will automatically update when you push to GitHub
- Updates happen during low-traffic periods

### **Manual Updates**
1. Push changes to GitHub repository
2. In Portainer: Stacks → orbitx-website → Editor → Update Stack
3. Monitor deployment in logs

### **Rollback**
If issues occur:
1. Check previous image tags in Portainer
2. Use "Redeploy" with previous working image
3. Or revert Git commit and redeploy

## 🔒 **Security Features**

- ✅ **Non-root execution**: Container runs as `nextjs` user
- ✅ **Minimal attack surface**: Alpine Linux base image
- ✅ **No SSH/shell access**: Application-only container
- ✅ **Resource limits**: Prevents DoS attacks
- ✅ **Health monitoring**: Early issue detection

## 🌟 **Production Optimizations**

- ✅ **Multi-stage build**: Smaller final image size
- ✅ **Production dependencies only**: Runtime optimization  
- ✅ **Cache persistence**: Faster subsequent builds
- ✅ **Telemetry disabled**: No external data sharing
- ✅ **Error boundaries**: Graceful failure handling

## 📞 **Support Information**

- **Repository**: https://github.com/AltusRossouw/Orbitx-Website-New
- **Health Endpoint**: `/api/health`
- **Container Port**: 3330
- **Stack Name**: `orbitx-website`

---

**Your OrbitX website is production-ready! 🎉**

Deploy with confidence using the configuration above.
