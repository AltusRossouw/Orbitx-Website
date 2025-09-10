#!/bin/bash

# OrbitX Website Health Check Script
# This script tests the health endpoint and basic functionality

echo "🏥 OrbitX Website Health Check"
echo "================================"

# Check if the development server is running
if curl -s http://localhost:3001/api/health > /dev/null 2>&1; then
    echo "✅ Development server is running on port 3001"
    
    # Get health data
    HEALTH_DATA=$(curl -s http://localhost:3001/api/health)
    echo "📊 Health Status:"
    echo "$HEALTH_DATA" | jq '.' 2>/dev/null || echo "$HEALTH_DATA"
    
elif curl -s http://localhost:3000/api/health > /dev/null 2>&1; then
    echo "✅ Server is running on port 3000"
    
    # Get health data
    HEALTH_DATA=$(curl -s http://localhost:3000/api/health)
    echo "📊 Health Status:"
    echo "$HEALTH_DATA" | jq '.' 2>/dev/null || echo "$HEALTH_DATA"
    
else
    echo "❌ No server detected on ports 3000 or 3001"
    echo "💡 Start the server with: npm run dev"
fi

echo ""
echo "🌐 Available URLs:"
echo "   Development: http://localhost:3001"
echo "   Production:  http://localhost:3000"
echo "   Health:      /api/health"
echo ""
echo "📦 Production Deployment:"
echo "   Port: 3330"
echo "   Health: http://your-server:3330/api/health"
