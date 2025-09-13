# OrbitX Website - Portainer Deployment Guide

This guide provides step-by-step instructions for deploying the OrbitX website using Portainer with Docker Compose.

## Prerequisites

- Portainer CE/EE installed and running
- Docker Engine 20.10+ or Docker Desktop
- Git access to the OrbitX repository
- Minimum 2GB RAM and 2 CPU cores recommended

## Quick Deployment

### Option 1: Direct Repository Deployment (Recommended)

1. **Access Portainer Dashboard**
   - Navigate to your Portainer instance
   - Go to **Stacks** in the left sidebar
   - Click **+ Add stack**

2. **Create New Stack**
   - **Name**: `orbitx-website`
   - **Method**: Select "Repository"
   - **Repository URL**: `https://github.com/AltusRossouw/Orbitx-Website.git` (or your fork)
   - **Repository Reference**: `refs/heads/main`
   - **Compose Path**: `docker-compose.yml`

3. **Environment Variables** (Optional)
   ```env
   ORBITX_PORT=3330
   NODE_ENV=production
   CONTAINER_NAME=orbitx-website
   COMPOSE_PROJECT_NAME=orbitx
   ```

4. **Deploy Stack**
   - Click **Deploy the stack**
   - Wait for deployment to complete (usually 2-3 minutes)

### Option 2: Manual Docker Compose

1. **Create Stack from Editor**
   - Name: `orbitx-website`
   - Method: "Web editor"
   - Paste the Docker Compose configuration below:

```yaml
version: "3.8"

services:
  orbitx-website:
    build:
      context: https://github.com/AltusRossouw/Orbitx-Website.git#main
      dockerfile: Dockerfile
    image: orbitx-website:latest
    container_name: ${CONTAINER_NAME:-orbitx-website}
    ports:
      - "${ORBITX_PORT:-3330}:3000"
    environment:
      - NODE_ENV=${NODE_ENV:-production}
      - NEXT_TELEMETRY_DISABLED=1
      - PORT=3000
      - HOSTNAME=0.0.0.0
    healthcheck:
      test: ["CMD-SHELL", "curl -fsS http://localhost:3000/api/health || exit 1"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 60s
    restart: unless-stopped
    volumes:
      - orbitx_cache:/app/.next/cache
    deploy:
      resources:
        limits:
          cpus: "1.0"
          memory: 1G
        reservations:
          cpus: "0.5"
          memory: 512M
    labels:
      - "com.centurylinklabs.watchtower.enable=true"
      - "traefik.enable=false"
      - "app=orbitx-website"
      - "environment=production"
      - "portainer.stack=orbitx-website"

volumes:
  orbitx_cache:
    driver: local
    labels:
      - "app=orbitx-website"
```

## Configuration Options

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `ORBITX_PORT` | `3330` | External port for accessing the website |
| `NODE_ENV` | `production` | Node.js environment |
| `CONTAINER_NAME` | `orbitx-website` | Docker container name |
| `COMPOSE_PROJECT_NAME` | `orbitx` | Docker Compose project name |

### Resource Limits

The default configuration allocates:
- **CPU**: 0.5-1.0 cores
- **Memory**: 512MB-1GB
- **Storage**: Persistent cache volume

Adjust these in the `deploy.resources` section based on your server capacity.

## Accessing the Website

After successful deployment:

1. **Check Stack Status**
   - Go to **Stacks** → `orbitx-website`
   - Verify all services are "Running"

2. **Access Website**
   - **Local**: `http://localhost:3330`
   - **Server**: `http://your-server-ip:3330`

3. **Health Check**
   - **Endpoint**: `http://your-server-ip:3330/api/health`
   - **Expected Response**: JSON with `status: "healthy"`

## Portainer Management

### Viewing Logs

1. Go to **Containers**
2. Click on `orbitx-website`
3. Select **Logs** tab
4. Monitor for startup messages and errors

### Updating the Website

**Method 1: Stack Redeploy**
1. Go to **Stacks** → `orbitx-website`
2. Click **Editor** tab
3. Click **Update the stack**
4. Check "Re-pull image and redeploy"

**Method 2: Container Recreation**
1. Go to **Containers**
2. Select `orbitx-website`
3. Click **Recreate**
4. Enable "Pull latest image"

### Scaling and Performance

**Memory Monitoring**
```bash
# Check container memory usage
docker stats orbitx-website
```

**Scaling Up (if needed)**
- Increase memory limits in docker-compose.yml
- Adjust CPU limits for high traffic
- Consider multiple replicas for load balancing

## Troubleshooting

### Common Issues

**1. Port Already in Use**
```
Error: bind: address already in use
```
**Solution**: Change `ORBITX_PORT` to an available port (e.g., 3331, 8080)

**2. Build Failures**
```
Error: failed to solve: process "/bin/sh -c npm run build" did not complete successfully
```
**Solution**: 
- Check Portainer logs for specific build errors
- Ensure adequate memory (minimum 1GB during build)
- Verify internet connectivity for npm packages

**3. Health Check Failures**
```
Health check failed
```
**Solution**:
- Wait 60 seconds for startup period
- Check container logs for application errors
- Verify port 3000 is accessible inside container

### Debug Commands

**Check Container Status**
```bash
docker ps | grep orbitx
```

**View Detailed Logs**
```bash
docker logs orbitx-website --tail 50 -f
```

**Test Health Endpoint**
```bash
curl http://localhost:3330/api/health
```

**Inspect Container**
```bash
docker inspect orbitx-website
```

## Security Considerations

### Network Security
- Website runs on specified port only
- No exposed database or admin interfaces
- Non-root user inside container

### Update Strategy
- Enable Watchtower labels for automatic updates
- Regular security updates via container recreation
- Monitor logs for security events

### Backup Recommendations
- Cache volume: `orbitx_cache` (can be recreated)
- Container images: Stored in Portainer registry
- Configuration: Export stack definition

## Production Checklist

- [ ] Stack deployed successfully
- [ ] Website accessible on configured port
- [ ] Health check endpoint responding
- [ ] Logs show no errors
- [ ] SSL/TLS configured (if using reverse proxy)
- [ ] Domain name configured (if applicable)
- [ ] Monitoring setup (optional)
- [ ] Backup strategy in place

## Advanced Configuration

### Reverse Proxy Integration

**Traefik Labels** (if using Traefik):
```yaml
labels:
  - "traefik.enable=true"
  - "traefik.http.routers.orbitx.rule=Host(`orbitx.yourdomain.com`)"
  - "traefik.http.routers.orbitx.tls=true"
  - "traefik.http.routers.orbitx.tls.certresolver=letsencrypt"
```

**Nginx Reverse Proxy**:
```nginx
location / {
    proxy_pass http://localhost:3330;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

### Performance Tuning

**High Traffic Configuration**:
```yaml
deploy:
  resources:
    limits:
      cpus: "2.0"
      memory: 2G
    reservations:
      cpus: "1.0"
      memory: 1G
  replicas: 2
```

## Support

For deployment issues:

1. Check this guide first
2. Review Portainer container logs
3. Verify system requirements
4. Check network connectivity
5. Contact system administrator if needed

---

**Last Updated**: September 2025  
**Compatible With**: Portainer CE 2.19+, Docker Engine 20.10+