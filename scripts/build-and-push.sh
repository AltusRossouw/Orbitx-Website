#!/bin/bash
# OrbitX Website - Docker Build and Push Script
# Usage: ./build-and-push.sh [version]

set -e

# Configuration
IMAGE_NAME="altusrossouw/orbitx-website"
VERSION=${1:-latest}
DOCKERFILE="./Dockerfile"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🐳 OrbitX Website Docker Build and Push${NC}"
echo -e "${BLUE}======================================${NC}"

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}❌ Docker is not running. Please start Docker and try again.${NC}"
    exit 1
fi

# Check if Dockerfile exists
if [ ! -f "$DOCKERFILE" ]; then
    echo -e "${RED}❌ Dockerfile not found at $DOCKERFILE${NC}"
    exit 1
fi

# Check if logged into Docker Hub
if ! docker info | grep -q "Username"; then
    echo -e "${YELLOW}⚠️  You might not be logged into Docker Hub.${NC}"
    echo -e "${YELLOW}   Run 'docker login' if the push fails.${NC}"
fi

echo -e "${BLUE}Building image: ${IMAGE_NAME}:${VERSION}${NC}"

# Build the image
docker build -t ${IMAGE_NAME}:${VERSION} .

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Build successful!${NC}"
else
    echo -e "${RED}❌ Build failed!${NC}"
    exit 1
fi

# Tag as latest if not already latest
if [ "$VERSION" != "latest" ]; then
    echo -e "${BLUE}Tagging as latest...${NC}"
    docker tag ${IMAGE_NAME}:${VERSION} ${IMAGE_NAME}:latest
fi

# Push to Docker Hub
echo -e "${BLUE}Pushing to Docker Hub...${NC}"

docker push ${IMAGE_NAME}:${VERSION}

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Push successful for ${VERSION}!${NC}"
else
    echo -e "${RED}❌ Push failed for ${VERSION}!${NC}"
    exit 1
fi

# Push latest tag if we created it
if [ "$VERSION" != "latest" ]; then
    docker push ${IMAGE_NAME}:latest
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Push successful for latest!${NC}"
    else
        echo -e "${RED}❌ Push failed for latest!${NC}"
        exit 1
    fi
fi

echo -e "${GREEN}🎉 Build and push completed successfully!${NC}"
echo -e "${BLUE}📋 Summary:${NC}"
echo -e "   Image: ${IMAGE_NAME}:${VERSION}"
if [ "$VERSION" != "latest" ]; then
    echo -e "   Also tagged as: ${IMAGE_NAME}:latest"
fi
echo -e "   Registry: Docker Hub"
echo -e "   Status: Ready for deployment"

echo -e "${BLUE}🚀 To deploy, use:${NC}"
echo -e "   docker run -d -p 3330:3000 ${IMAGE_NAME}:${VERSION}"
echo -e "   or update your Portainer stack to use: ${IMAGE_NAME}:${VERSION}"