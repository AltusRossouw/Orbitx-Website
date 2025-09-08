# Deploying OrbitX Website to External Portainer Server

## 🎯 **Quick Start Guide**

### **Method 1: Git Repository (Easiest)**

1. **Push your code to GitHub/GitLab:**
   ```bash
   git init
   git add .
   git commit -m "OrbitX website ready for deployment"
   git remote add origin https://github.com/yourusername/orbitx-website.git
   git push -u origin main
   ```

2. **In your Portainer dashboard:**
   - Go to **Stacks** → **Add Stack**
   - Name: `orbitx-website`
   - Build method: **Repository**
   - Repository URL: `https://github.com/yourusername/orbitx-website.git`
   - Compose path: `docker-compose.yml`
   - Click **Deploy the stack**

3. **Access your website:** `http://your-server-ip:3000`

---

### **Method 2: Web Editor (No Git Required)**

1. **In Portainer:** Stacks → Add Stack → Web Editor
2. **Name:** `orbitx-website`
3. **Paste this docker-compose:**

```yaml
version: '3.8'

services:
  orbitx-website:
    image: node:18-alpine
    container_name: orbitx-website
    working_dir: /app
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_TELEMETRY_DISABLED=1
    command: |
      sh -c "
        apk add --no-cache git &&
        git clone https://github.com/yourusername/orbitx-website.git . &&
        npm ci &&
        npm run build &&
        npm start
      "
    restart: unless-stopped
    networks:
      - orbitx-network

networks:
  orbitx-network:
    driver: bridge
```

**Note:** Replace `yourusername/orbitx-website.git` with your actual repository URL.

---

### **Method 3: Pre-built Docker Image**

If you want to use a pre-built image:

1. **Build and push to Docker Hub:**
   ```bash
   # Build locally
   docker build -t yourusername/orbitx-website:latest .
   
   # Login to Docker Hub
   docker login
   
   # Push image
   docker push yourusername/orbitx-website:latest
   ```

2. **Use this compose in Portainer:**
```yaml
version: '3.8'

services:
  orbitx-website:
    image: yourusername/orbitx-website:latest
    container_name: orbitx-website
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_TELEMETRY_DISABLED=1
    restart: unless-stopped
```

---

### **Method 4: Direct Server Upload (SSH Access)**

If you have SSH access to your Portainer server:

1. **Upload project files:**
   ```bash
   # Edit the script with your server details
   nano deploy-remote.sh
   
   # Update these variables:
   SERVER_USER="your-username"
   SERVER_HOST="your-server-ip"
   
   # Deploy
   ./deploy-remote.sh deploy
   ```

2. **Or manually:**
   ```bash
   # Compress project
   tar -czf orbitx-website.tar.gz .
   
   # Upload to server
   scp orbitx-website.tar.gz user@your-server:/home/user/
   
   # SSH to server and deploy
   ssh user@your-server
   tar -xzf orbitx-website.tar.gz
   cd orbitx-website
   docker-compose up -d --build
   ```

---

## 🚀 **Production Deployment with Nginx**

For production deployment with reverse proxy:

1. **Use `docker-compose.prod.yml` instead:**
   - In Portainer, set compose path to: `docker-compose.prod.yml`
   - Website will be available on port 80: `http://your-server-ip`

2. **Or copy this production compose:**

```yaml
version: '3.8'

services:
  orbitx-website:
    image: node:18-alpine
    container_name: orbitx-website
    working_dir: /app
    environment:
      - NODE_ENV=production
      - NEXT_TELEMETRY_DISABLED=1
    command: |
      sh -c "
        apk add --no-cache git &&
        git clone https://github.com/yourusername/orbitx-website.git . &&
        npm ci &&
        npm run build &&
        npm start
      "
    restart: unless-stopped
    networks:
      - orbitx-network

  nginx:
    image: nginx:alpine
    container_name: orbitx-nginx
    ports:
      - "80:80"
    volumes:
      - nginx-config:/etc/nginx/nginx.conf:ro
    depends_on:
      - orbitx-website
    restart: unless-stopped
    networks:
      - orbitx-network

volumes:
  nginx-config:
    driver: local

networks:
  orbitx-network:
    driver: bridge
```

## 🔧 **Troubleshooting**

### **Common Issues:**

1. **Port already in use:**
   - Change `"3000:3000"` to `"3001:3000"` or another port

2. **Build fails:**
   - Check Docker logs in Portainer
   - Verify all files are in repository

3. **Can't access website:**
   - Check your server firewall (allow port 3000)
   - Verify container is running in Portainer

### **Logs and Monitoring:**

- **View logs:** Portainer → Containers → orbitx-website → Logs
- **Container status:** Portainer → Containers → Check running status
- **Resource usage:** Portainer → Containers → Stats

## 📋 **Final Checklist**

- ✅ Repository contains all necessary files
- ✅ Docker and docker-compose installed on server
- ✅ Portainer accessible and running
- ✅ Firewall allows port 3000 (or 80 for production)
- ✅ Server has internet access to pull images
- ✅ Sufficient server resources (1GB RAM minimum)

Your OrbitX website will be live at: **http://your-server-ip:3000** 🚀
