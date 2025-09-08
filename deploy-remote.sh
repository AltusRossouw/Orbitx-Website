#!/bin/bash

# Remote Server Deployment Script
# Run this script to deploy OrbitX website to your remote server

SERVER_USER="your-username"
SERVER_HOST="your-server-ip"
PROJECT_NAME="orbitx-website"

echo "🚀 Deploying OrbitX Website to Remote Server"
echo "=============================================="

# Function to deploy via SCP and SSH
deploy_remote() {
    echo "📦 Creating deployment package..."
    
    # Create a temporary deployment directory
    mkdir -p /tmp/orbitx-deploy
    
    # Copy necessary files
    cp Dockerfile /tmp/orbitx-deploy/
    cp docker-compose.yml /tmp/orbitx-deploy/
    cp docker-compose.prod.yml /tmp/orbitx-deploy/
    cp nginx.conf /tmp/orbitx-deploy/
    cp package.json /tmp/orbitx-deploy/
    cp next.config.js /tmp/orbitx-deploy/
    cp -r src /tmp/orbitx-deploy/
    cp -r public /tmp/orbitx-deploy/
    cp .dockerignore /tmp/orbitx-deploy/ 2>/dev/null || true
    
    # Create archive
    cd /tmp
    tar -czf orbitx-website.tar.gz orbitx-deploy/
    
    echo "📤 Uploading to server..."
    scp orbitx-website.tar.gz $SERVER_USER@$SERVER_HOST:~/
    
    echo "🚀 Deploying on server..."
    ssh $SERVER_USER@$SERVER_HOST << 'EOF'
        # Extract files
        tar -xzf orbitx-website.tar.gz
        cd orbitx-deploy
        
        # Stop existing container if running
        docker-compose down 2>/dev/null || true
        
        # Build and start
        docker-compose up -d --build
        
        echo "✅ Deployment complete!"
        echo "🌐 Website should be available at: http://$(hostname -I | awk '{print $1}'):3000"
        
        # Show status
        docker-compose ps
EOF
    
    # Cleanup
    rm -rf /tmp/orbitx-deploy /tmp/orbitx-website.tar.gz
    
    echo "🎉 Deployment script completed!"
}

# Function to deploy production version
deploy_production() {
    echo "🏭 Deploying Production Version..."
    
    ssh $SERVER_USER@$SERVER_HOST << 'EOF'
        cd orbitx-deploy
        
        # Stop existing services
        docker-compose -f docker-compose.prod.yml down 2>/dev/null || true
        
        # Start production services
        docker-compose -f docker-compose.prod.yml up -d --build
        
        echo "✅ Production deployment complete!"
        echo "🌐 Website available at: http://$(hostname -I | awk '{print $1}'):80"
        
        # Show status
        docker-compose -f docker-compose.prod.yml ps
EOF
}

# Check arguments
case "$1" in
    "deploy")
        deploy_remote
        ;;
    "production")
        deploy_production
        ;;
    *)
        echo "Usage: $0 {deploy|production}"
        echo ""
        echo "Before running, update the SERVER_USER and SERVER_HOST variables in this script"
        echo ""
        echo "Examples:"
        echo "  $0 deploy       - Deploy development version"
        echo "  $0 production   - Deploy production version with Nginx"
        exit 1
        ;;
esac
