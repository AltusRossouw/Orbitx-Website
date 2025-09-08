# 🚀 Production-Ready Portainer Stack - Git Repository Based

## 📋 **Portainer Stack Configuration**

Copy and paste this **production-ready** configuration into your Portainer Stack:

```yaml
version: '3.8'

services:
  orbitx-website:
    image: node:18-alpine
    container_name: orbitx-website
    working_dir: /app
    ports:
      - "80:3000"  # Website accessible on port 80 (standard web port)
    environment:
      - NODE_ENV=production
      - NEXT_TELEMETRY_DISABLED=1
    command: |
      sh -c "
        echo '🚀 Starting OrbitX Website Production Deployment...' &&
        apk add --no-cache git curl &&
        echo '📡 Cloning repository...' &&
        git clone https://github.com/AltusRossouw/Orbitx-Website-New.git . &&
        echo '📦 Installing dependencies...' &&
        npm ci &&
        echo '🏗️ Building application...' &&
        npm run build &&
        echo '✅ Starting production server...' &&
        npm start
      "
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 120s
    networks:
      - orbitx-network

networks:
  orbitx-network:
    driver: bridge
```

## 🎯 **Deployment Steps in Portainer:**

1. **Access your Portainer dashboard:** `https://your-server-ip:9000`

2. **Navigate to:** Stacks → Add Stack

3. **Stack Configuration:**
   - **Name:** `orbitx-website`
   - **Build method:** Web editor
   - **Paste the YAML configuration above**

4. **Click "Deploy the stack"**

## 🌟 **Production Features:**

### ✅ **What This Configuration Includes:**

- **🌐 Port 80:** Website accessible at `http://your-server-ip` (no port needed)
- **🔄 Auto-restart:** Container automatically restarts if it fails
- **❤️ Health Checks:** Monitors application health every 30 seconds
- **📊 Status Logging:** Shows deployment progress with emojis
- **🔧 Production Build:** Optimized Next.js standalone build
- **🚀 Git-based:** Always deploys latest code from repository
- **📱 All Assets:** Includes all 20+ images and 16 PDFs
- **🎨 Modern Design:** Complete dark theme website

### ⚡ **Performance Optimizations:**

- Uses Alpine Linux (lightweight)
- Production Node.js build
- Next.js standalone output
- Optimized asset delivery
- Minimal container footprint

## 🔍 **Monitoring & Troubleshooting:**

### **Check Deployment Status:**
1. **Portainer Dashboard:** Stacks → orbitx-website
2. **Container Logs:** Containers → orbitx-website → Logs
3. **Health Status:** Look for green health indicator

### **View Deployment Logs:**
The container will show progress with emojis:
```
🚀 Starting OrbitX Website Production Deployment...
📡 Cloning repository...
📦 Installing dependencies...
🏗️ Building application...
✅ Starting production server...
```

### **Common Issues & Solutions:**

**🔴 Container fails to start:**
- Check logs in Portainer
- Verify server has internet access for git clone
- Ensure port 80 is not in use

**🔴 Can't access website:**
- Check server firewall allows port 80
- Verify container is running and healthy
- Try accessing from server: `curl http://localhost`

**🔴 Build takes too long:**
- The first deployment takes 2-3 minutes (normal)
- Subsequent updates are faster due to npm cache

## 🎉 **Success!**

Once deployed successfully:
- **Website URL:** `http://your-server-ip`
- **Status:** Green health indicator in Portainer
- **Features:** Complete OrbitX website with all assets
- **Updates:** Redeploy stack to get latest code changes

## 🔄 **Updating the Website:**

To update with new changes:
1. Push changes to your GitHub repository
2. In Portainer: Stacks → orbitx-website → Editor → Update the stack
3. The container will redeploy with latest code

**Your production-ready OrbitX website will be live on port 80! 🌟**
