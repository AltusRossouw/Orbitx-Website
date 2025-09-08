#!/bin/bash

# OrbitX Website Deployment Script for Portainer

echo "🚀 OrbitX Website Docker Deployment"
echo "====================================="

# Function to build and deploy
build_and_deploy() {
    echo "🔨 Building Docker image..."
    docker build -t orbitx-website:latest .
    
    if [ $? -eq 0 ]; then
        echo "✅ Docker image built successfully!"
        
        echo "🐳 Starting container..."
        docker run -d \
            --name orbitx-website \
            -p 3000:3000 \
            --restart unless-stopped \
            -e NODE_ENV=production \
            -e NEXT_TELEMETRY_DISABLED=1 \
            orbitx-website:latest
            
        if [ $? -eq 0 ]; then
            echo "✅ Container started successfully!"
            echo "🌐 Website available at: http://localhost:3000"
            echo "📊 Container status:"
            docker ps | grep orbitx-website
        else
            echo "❌ Failed to start container"
            exit 1
        fi
    else
        echo "❌ Failed to build Docker image"
        exit 1
    fi
}

# Function to deploy with docker-compose
deploy_compose() {
    echo "🐳 Deploying with Docker Compose..."
    docker-compose up -d --build
    
    if [ $? -eq 0 ]; then
        echo "✅ Deployed successfully with Docker Compose!"
        echo "🌐 Website available at: http://localhost:3000"
    else
        echo "❌ Failed to deploy with Docker Compose"
        exit 1
    fi
}

# Function to deploy production setup with nginx
deploy_production() {
    echo "🏭 Deploying Production setup with Nginx..."
    docker-compose -f docker-compose.prod.yml up -d --build
    
    if [ $? -eq 0 ]; then
        echo "✅ Production deployment successful!"
        echo "🌐 Website available at: http://localhost:80"
    else
        echo "❌ Failed to deploy production setup"
        exit 1
    fi
}

# Function to stop and cleanup
cleanup() {
    echo "🧹 Cleaning up containers..."
    docker stop orbitx-website 2>/dev/null || true
    docker rm orbitx-website 2>/dev/null || true
    docker-compose down 2>/dev/null || true
    docker-compose -f docker-compose.prod.yml down 2>/dev/null || true
    echo "✅ Cleanup complete!"
}

# Main menu
case "$1" in
    "build")
        build_and_deploy
        ;;
    "compose")
        deploy_compose
        ;;
    "production")
        deploy_production
        ;;
    "cleanup")
        cleanup
        ;;
    *)
        echo "Usage: $0 {build|compose|production|cleanup}"
        echo ""
        echo "Options:"
        echo "  build       - Build and run single container"
        echo "  compose     - Deploy with docker-compose (development)"
        echo "  production  - Deploy with nginx reverse proxy"
        echo "  cleanup     - Stop and remove all containers"
        echo ""
        echo "Examples:"
        echo "  ./deploy.sh build"
        echo "  ./deploy.sh compose"
        echo "  ./deploy.sh production"
        echo "  ./deploy.sh cleanup"
        exit 1
        ;;
esac
