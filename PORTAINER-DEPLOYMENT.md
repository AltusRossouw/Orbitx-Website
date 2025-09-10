# OrbitX Website - Portainer Deployment Guide

## 🚀 **Production Deployment Ready**

This guide will help you deploy the OrbitX website using Portainer with optimal configuration for production use.

## 📋 **Prerequisites**

- Portainer installed and running
- Docker and Docker Compose available
- Port 3330 available on your server
- Internet access for GitHub repository cloning

## 🔧 **Deployment Steps**

### **Method 1: Using Portainer UI**

1. **Access Portainer**
   - Open your Portainer instance
   - Navigate to "Stacks" section

2. **Create New Stack**
   - Click "Add Stack"
   - Name: `orbitx-website`
   - Environment: `production`

3. **Use Git Repository Method**
   - Select "Git Repository"
   - Repository URL: `https://github.com/AltusRossouw/Orbitx-Website-New.git`
   - Reference: `refs/heads/main`
   - Compose file path: `docker-compose.portainer-final.yml`

4. **Deploy**
   - Click "Deploy the stack"
   - Wait for build completion (3-5 minutes)

### **Method 2: Using Docker Compose File Upload**

1. **Download Compose File**
   - Copy the content from `docker-compose.portainer-final.yml`

2. **Create Stack in Portainer**
   - Navigate to "Stacks" → "Add Stack"
   - Name: `orbitx-website`
   - Paste the compose file content
   - Click "Deploy the stack"

## 🌐 **Access Your Website**

Once deployed, your website will be available at:
- **Local**: `http://localhost:3330`
- **Server**: `http://your-server-ip:3330`

## 📊 **Container Configuration**

### **Resource Limits**
- CPU: 0.5 cores (max), 0.25 cores (reserved)
- Memory: 512MB (max), 256MB (reserved)

### **Volumes**
- `orbitx_cache`: Next.js build cache for faster rebuilds
- `orbitx_logs`: Application logs (optional)

### **Health Monitoring**
- Health check every 30 seconds
- 3 retry attempts before marking unhealthy
- 90-second startup grace period

## 🔄 **Updating the Website**

### **Automatic Updates (Recommended)**
The container includes Watchtower labels for automatic updates:
```yaml
labels:
  - "com.centurylinklabs.watchtower.enable=true"
```

### **Manual Updates**
1. In Portainer, go to your stack
2. Click "Editor" 
3. Click "Update the stack"
4. Wait for rebuild and deployment

## 🛠 **Troubleshooting**

### **Container Won't Start**
- Check logs in Portainer: Containers → orbitx-website-prod → Logs
- Verify port 3330 is not in use: `netstat -tlnp | grep 3330`

### **Build Failures**
- Ensure GitHub repository is accessible
- Check if all dependencies are properly defined
- Verify Dockerfile syntax

### **Performance Issues**
- Monitor resource usage in Portainer
- Consider increasing memory limits if needed
- Check container logs for errors

## 📝 **Configuration Details**

### **Environment Variables**
```bash
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
PORT=3000
HOSTNAME=0.0.0.0
```

### **Security Features**
- Non-privileged container execution
- Read-only filesystem where possible
- Resource limits to prevent resource exhaustion
- Security options enabled

### **Logging**
- JSON file driver with rotation
- Maximum 10MB per log file
- Keep 3 log file versions

## 🏷 **Labels for Management**
The container includes labels for easy management:
- `portainer.managed=true`: Indicates Portainer management
- `project=orbitx-website`: Project identification
- `environment=production`: Environment tag
- `watchtower.enable=true`: Auto-update capability

## 🌟 **Production Features**

✅ **Optimized Build Process**
- Multi-stage Docker build
- Standalone Next.js output
- Minimal runtime image

✅ **Performance Optimizations**
- Build cache persistence
- Resource limits and reservations
- Health monitoring

✅ **Security Hardening**
- Non-root user execution
- Security options configured
- Read-only capabilities where possible

✅ **Monitoring & Logging**
- Health checks configured
- Log rotation enabled
- Container metrics available

✅ **WhatsApp Sharing Ready**
- PNG social media images included
- Open Graph meta tags configured
- Optimized for social media platforms

## 🔍 **Monitoring**

After deployment, monitor your container:
1. **Portainer Dashboard**: View container status and resource usage
2. **Container Logs**: Check for any errors or warnings
3. **Health Status**: Verify health checks are passing
4. **Website Access**: Ensure the site loads correctly at port 3330

Your OrbitX website is now production-ready with professional deployment configuration! 🎉
