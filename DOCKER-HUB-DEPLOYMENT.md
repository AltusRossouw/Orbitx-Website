# Docker Hub Deployment Guide

This guide explains how to build, push, and deploy the OrbitX website using Docker Hub.

## 🐳 Docker Hub Repository

**Repository:** `altusrossouw/orbitx-website`  
**Registry:** Docker Hub (docker.io)

## 🚀 Automated Builds (Recommended)

### GitHub Actions Setup

The repository includes automated Docker builds using GitHub Actions that:
- ✅ Builds on every push to main branch
- ✅ Supports multi-architecture (AMD64 + ARM64)
- ✅ Pushes to Docker Hub automatically
- ✅ Tags images properly (latest, version tags)
- ✅ Updates Docker Hub description

### Prerequisites for Automated Builds

1. **Create Docker Hub Account** (if you don't have one)
2. **Add GitHub Secrets:**
   - Go to your GitHub repository → Settings → Secrets and variables → Actions
   - Add these secrets:
     ```
     DOCKER_USERNAME: your-dockerhub-username
     DOCKER_PASSWORD: your-dockerhub-password-or-token
     ```

### How Automated Builds Work

1. **Push code to main branch** → Triggers build
2. **GitHub Actions builds image** → Multi-platform support
3. **Pushes to Docker Hub** → Tagged as `latest` and version
4. **Ready for deployment** → Pull from Docker Hub

## 🔨 Manual Build and Push

### Prerequisites

- Docker installed on your machine
- Docker Hub account
- Logged into Docker Hub: `docker login`

### Build and Push Commands

```bash
# 1. Navigate to project directory
cd /path/to/orbitx-website

# 2. Build the image
docker build -t altusrossouw/orbitx-website:latest .

# 3. Tag with version (optional)
docker tag altusrossouw/orbitx-website:latest altusrossouw/orbitx-website:v1.0.0

# 4. Push to Docker Hub
docker push altusrossouw/orbitx-website:latest
docker push altusrossouw/orbitx-website:v1.0.0  # if tagged

# 5. Verify the push
docker images | grep orbitx-website
```

### Build Script (Optional)

Create a `build-and-push.sh` script:

```bash
#!/bin/bash
set -e

VERSION=${1:-latest}
IMAGE_NAME="altusrossouw/orbitx-website"

echo "Building Docker image: ${IMAGE_NAME}:${VERSION}"
docker build -t ${IMAGE_NAME}:${VERSION} .

if [ "$VERSION" != "latest" ]; then
    docker tag ${IMAGE_NAME}:${VERSION} ${IMAGE_NAME}:latest
fi

echo "Pushing to Docker Hub..."
docker push ${IMAGE_NAME}:${VERSION}
if [ "$VERSION" != "latest" ]; then
    docker push ${IMAGE_NAME}:latest
fi

echo "Build and push completed successfully!"
```

Usage:
```bash
chmod +x build-and-push.sh
./build-and-push.sh v1.0.0  # Specific version
./build-and-push.sh         # Latest
```

## 🚀 Deployment Using Docker Hub Image

### Option 1: Portainer Deployment

1. **Update your stack in Portainer**
2. **Use this docker-compose.yml configuration:**

```yaml
version: "3.8"

services:
  orbitx-website:
    image: altusrossouw/orbitx-website:latest
    container_name: orbitx-website
    ports:
      - "3330:3000"
    environment:
      - NODE_ENV=production
      - NEXT_TELEMETRY_DISABLED=1
      - PORT=3000
      - HOSTNAME=0.0.0.0
      # Umami Analytics
      - NEXT_PUBLIC_UMAMI_WEBSITE_ID=1bcbdb6f-8263-4ef0-8a49-340172b88292
      - NEXT_PUBLIC_UMAMI_SRC=https://umami.intellixlabs.co.za/script.js
    restart: unless-stopped
    healthcheck:
      test: ["CMD-SHELL", "curl -fsS http://localhost:3000/api/health || exit 1"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 60s
```

3. **Deploy the stack**

### Option 2: Command Line Deployment

```bash
# Pull latest image
docker pull altusrossouw/orbitx-website:latest

# Run container
docker run -d \
  --name orbitx-website \
  -p 3330:3000 \
  -e NODE_ENV=production \
  -e NEXT_PUBLIC_UMAMI_WEBSITE_ID=1bcbdb6f-8263-4ef0-8a49-340172b88292 \
  -e NEXT_PUBLIC_UMAMI_SRC=https://umami.intellixlabs.co.za/script.js \
  --restart unless-stopped \
  altusrossouw/orbitx-website:latest
```

### Option 3: Docker Compose with Hub Image

```bash
# Set environment variable to use Docker Hub image
export DOCKER_IMAGE=altusrossouw/orbitx-website:latest

# Deploy using existing docker-compose.yml
docker-compose up -d
```

## 🔄 Updates and Versioning

### Automated Updates (GitHub Actions)

1. **Push code changes** to main branch
2. **GitHub Actions automatically builds** new image
3. **Pull latest image** in production:
   ```bash
   docker pull altusrossouw/orbitx-website:latest
   docker-compose up -d  # Restarts with new image
   ```

### Manual Updates

1. **Build and push** new version (see manual build section)
2. **Update production:**
   ```bash
   docker pull altusrossouw/orbitx-website:latest
   docker restart orbitx-website
   ```

### Version Tagging

Use semantic versioning for releases:
```bash
# Tag and push specific versions
docker tag altusrossouw/orbitx-website:latest altusrossouw/orbitx-website:v1.2.0
docker push altusrossouw/orbitx-website:v1.2.0

# Deploy specific version
docker run ... altusrossouw/orbitx-website:v1.2.0
```

## 📊 Benefits of Docker Hub Deployment

✅ **Faster Deployments** - No building on production servers  
✅ **Consistent Images** - Same image across all environments  
✅ **Version Control** - Easy rollbacks and version management  
✅ **Multi-Architecture** - Supports ARM64 and AMD64  
✅ **CI/CD Integration** - Automated builds and deployments  
✅ **Reduced Server Load** - No compilation on deployment servers  

## 🔧 Troubleshooting

### Build Issues
```bash
# Clear Docker cache
docker system prune -a

# Build with no cache
docker build --no-cache -t altusrossouw/orbitx-website:latest .
```

### Push Issues
```bash
# Re-login to Docker Hub
docker logout
docker login

# Check repository permissions
docker push altusrossouw/orbitx-website:latest
```

### Deployment Issues
```bash
# Pull latest image
docker pull altusrossouw/orbitx-website:latest

# Check image exists
docker images | grep orbitx-website

# Check container logs
docker logs orbitx-website
```

## 🔐 Security Notes

- **Never commit Docker Hub credentials** to repository
- **Use GitHub Secrets** for automated builds
- **Regular security updates** by rebuilding images
- **Scan images** for vulnerabilities (Docker Hub provides this)

## 📚 Additional Resources

- [Docker Hub Repository](https://hub.docker.com/r/altusrossouw/orbitx-website)
- [GitHub Actions Workflow](.github/workflows/docker-build.yml)
- [Portainer Deployment Guide](PORTAINER-DEPLOYMENT.md)
- [Umami Integration Guide](UMAMI-INTEGRATION.md)

---

**Ready to deploy!** 🚀 Your OrbitX website is now available as a Docker image on Docker Hub for easy deployment anywhere.