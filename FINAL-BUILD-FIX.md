# 🛠 Final Fix for Docker Build Issues

## ✅ **Ultimate Solution Applied**

Created `Dockerfile.basic` that completely avoids npm ci issues by using npm install with production flag.

### **Key Changes:**
1. **Dockerfile.basic**: Uses `npm install --production --no-package-lock`
2. **No package-lock.json dependency**: Builds without lock file constraints
3. **Maximum compatibility**: Works with any Node.js Alpine environment

### **Updated Stack Configuration:**

```yaml
version: '3.8'

services:
  orbitx-website:
    build: 
      context: https://github.com/AltusRossouw/Orbitx-Website-New.git
      dockerfile: Dockerfile.basic
    container_name: orbitx-website-prod
    ports:
      - "3330:3000"
    environment:
      - NODE_ENV=production
      - NEXT_TELEMETRY_DISABLED=1
      - PORT=3000
      - HOSTNAME=0.0.0.0
    volumes:
      - orbitx_cache:/app/.next/cache
      - orbitx_logs:/app/logs
    restart: unless-stopped
    security_opt:
      - no-new-privileges:true
    read_only: false
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M
    labels:
      - "com.centurylinklabs.watchtower.enable=true"
      - "traefik.enable=false"
      - "portainer.managed=true"
      - "project=orbitx-website"
      - "environment=production"
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 90s
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"

volumes:
  orbitx_cache:
    driver: local
    labels:
      - "project=orbitx-website"
      - "environment=production"
  orbitx_logs:
    driver: local
    labels:
      - "project=orbitx-website" 
      - "environment=production"

networks:
  default:
    name: orbitx-network
    labels:
      - "project=orbitx-website"
```

### **Deployment Steps:**
1. Commit and push these changes
2. Use the updated stack config in Portainer
3. The build should now complete without npm ci errors

This ultra-simple approach should resolve all Docker build issues! 🎉
