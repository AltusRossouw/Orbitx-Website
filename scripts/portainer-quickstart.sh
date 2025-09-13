#!/bin/bash

# OrbitX Website - Portainer Quick Start Script
# This script helps you quickly deploy the OrbitX website using Docker Compose

set -e

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}OrbitX Website - Portainer Quick Start${NC}"
echo "====================================="
echo ""

# Function to print status
print_status() {
    local status=$1
    local message=$2
    if [ "$status" = "OK" ]; then
        echo -e "✅ ${GREEN}$message${NC}"
    elif [ "$status" = "WARN" ]; then
        echo -e "⚠️  ${YELLOW}$message${NC}"
    else
        echo -e "❌ ${RED}$message${NC}"
    fi
}

# Check if we're in the right directory
if [ ! -f "docker-compose.yml" ]; then
    print_status "ERROR" "docker-compose.yml not found. Please run this script from the OrbitX project root directory."
    exit 1
fi

if [ ! -f "PORTAINER-DEPLOYMENT.md" ]; then
    print_status "ERROR" "PORTAINER-DEPLOYMENT.md not found. Please run this script from the OrbitX project root directory."
    exit 1
fi

print_status "OK" "Found OrbitX project files"

# Check if Docker is running
if ! docker info >/dev/null 2>&1; then
    print_status "ERROR" "Docker is not running. Please start Docker and try again."
    exit 1
fi

print_status "OK" "Docker is running"

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo ""
    echo "Creating .env file from template..."
    cp .env.example .env
    print_status "OK" "Created .env file from .env.example"
    echo ""
    echo -e "${YELLOW}📝 You may want to customize the .env file before deployment${NC}"
    echo "   Current settings:"
    echo "   - Port: 3330"
    echo "   - Environment: production"
    echo "   - Container name: orbitx-website"
    echo ""
else
    print_status "OK" ".env file already exists"
fi

# Show current configuration
echo ""
echo "Current configuration:"
echo "====================="
source .env 2>/dev/null || true
echo "Port: ${ORBITX_PORT:-3330}"
echo "Environment: ${NODE_ENV:-production}"
echo "Container: ${CONTAINER_NAME:-orbitx-website}"
echo "Project: ${COMPOSE_PROJECT_NAME:-orbitx}"
echo ""

# Ask if user wants to proceed
echo -e "${YELLOW}Choose deployment method:${NC}"
echo "1. Deploy with Docker Compose (local)"
echo "2. Show Portainer deployment instructions"
echo "3. Test existing deployment"
echo "4. Exit"
echo ""
read -p "Enter your choice (1-4): " choice

case $choice in
    1)
        echo ""
        echo "🚀 Starting Docker Compose deployment..."
        
        # Stop existing containers
        echo "Stopping any existing containers..."
        docker-compose down 2>/dev/null || true
        
        # Build and start
        echo "Building and starting containers..."
        docker-compose up -d --build
        
        # Wait a moment for startup
        echo "Waiting for container to start..."
        sleep 10
        
        # Run verification
        echo ""
        echo "Running deployment verification..."
        ./scripts/verify-deployment.sh
        ;;
        
    2)
        echo ""
        echo "📖 Portainer Deployment Instructions"
        echo "====================================="
        echo ""
        echo "For detailed Portainer deployment instructions, see:"
        echo "👉 PORTAINER-DEPLOYMENT.md"
        echo ""
        echo "Quick steps:"
        echo "1. Open Portainer web interface"
        echo "2. Go to Stacks → Add stack"
        echo "3. Name: orbitx-website"
        echo "4. Method: Repository"
        echo "5. Repository URL: https://github.com/AltusRossouw/Orbitx-Website.git"
        echo "6. Compose path: docker-compose.yml"
        echo "7. Deploy the stack"
        echo ""
        echo "Environment variables (optional):"
        cat .env | grep -v '^#' | grep -v '^$' | sed 's/^/   /'
        echo ""
        ;;
        
    3)
        echo ""
        echo "🔍 Testing existing deployment..."
        ./scripts/verify-deployment.sh
        ;;
        
    4)
        echo "Exiting..."
        exit 0
        ;;
        
    *)
        print_status "ERROR" "Invalid choice. Please select 1-4."
        exit 1
        ;;
esac

echo ""
echo "🎉 Quick start completed!"
echo ""
echo "Next steps:"
echo "• View deployment guide: cat PORTAINER-DEPLOYMENT.md"
echo "• Check logs: docker logs ${CONTAINER_NAME:-orbitx-website}"
echo "• Access website: http://localhost:${ORBITX_PORT:-3330}"
echo "• Health check: http://localhost:${ORBITX_PORT:-3330}/api/health"