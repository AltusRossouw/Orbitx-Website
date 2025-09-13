#!/bin/bash

# OrbitX Website - Portainer Deployment Verification Script
# This script verifies that the OrbitX website is properly deployed and running

set -e

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
CONTAINER_NAME="${CONTAINER_NAME:-orbitx-website}"
PORT="${ORBITX_PORT:-3330}"
HOST="${HOST:-localhost}"
TIMEOUT=30

echo -e "${BLUE}OrbitX Website - Deployment Verification${NC}"
echo "========================================"
echo "Container: $CONTAINER_NAME"
echo "URL: http://$HOST:$PORT"
echo "Timeout: ${TIMEOUT}s"
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

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
echo "Checking prerequisites..."
if command_exists docker; then
    print_status "OK" "Docker is installed"
else
    print_status "ERROR" "Docker is not installed or not in PATH"
    exit 1
fi

if command_exists curl; then
    print_status "OK" "curl is available"
else
    print_status "WARN" "curl not available, using wget for tests"
    if ! command_exists wget; then
        print_status "ERROR" "Neither curl nor wget available for testing"
        exit 1
    fi
fi

echo ""

# Check if container is running
echo "Checking container status..."
if docker ps --format "table {{.Names}}\t{{.Status}}" | grep -q "$CONTAINER_NAME"; then
    container_status=$(docker ps --format "table {{.Names}}\t{{.Status}}" | grep "$CONTAINER_NAME" | awk '{print $2}')
    print_status "OK" "Container '$CONTAINER_NAME' is running ($container_status)"
else
    print_status "ERROR" "Container '$CONTAINER_NAME' is not running"
    echo ""
    echo "Available containers:"
    docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
    exit 1
fi

# Check container health
echo ""
echo "Checking container health..."
health_status=$(docker inspect --format='{{.State.Health.Status}}' "$CONTAINER_NAME" 2>/dev/null || echo "no-healthcheck")
case $health_status in
    "healthy")
        print_status "OK" "Container health check: healthy"
        ;;
    "unhealthy")
        print_status "ERROR" "Container health check: unhealthy"
        ;;
    "starting")
        print_status "WARN" "Container health check: starting (may need more time)"
        ;;
    "no-healthcheck")
        print_status "WARN" "No health check configured for container"
        ;;
    *)
        print_status "WARN" "Unknown health status: $health_status"
        ;;
esac

# Check if port is accessible
echo ""
echo "Checking port accessibility..."
if command_exists nc; then
    if timeout 5 nc -z "$HOST" "$PORT" 2>/dev/null; then
        print_status "OK" "Port $PORT is accessible on $HOST"
    else
        print_status "ERROR" "Port $PORT is not accessible on $HOST"
    fi
else
    print_status "WARN" "netcat (nc) not available, skipping port check"
fi

# Test HTTP endpoint
echo ""
echo "Testing HTTP endpoints..."

# Test main page
echo "Testing main page..."
if command_exists curl; then
    if curl -sSf -m $TIMEOUT "http://$HOST:$PORT/" >/dev/null 2>&1; then
        print_status "OK" "Main page (/) responds correctly"
    else
        print_status "ERROR" "Main page (/) is not responding"
    fi
else
    if wget -q -T $TIMEOUT -O /dev/null "http://$HOST:$PORT/" 2>/dev/null; then
        print_status "OK" "Main page (/) responds correctly"
    else
        print_status "ERROR" "Main page (/) is not responding"
    fi
fi

# Test health endpoint
echo "Testing health endpoint..."
if command_exists curl; then
    health_response=$(curl -sSf -m $TIMEOUT "http://$HOST:$PORT/api/health" 2>/dev/null || echo "")
    if [ -n "$health_response" ]; then
        health_status_api=$(echo "$health_response" | grep -o '"status":"[^"]*"' | cut -d'"' -f4 2>/dev/null || echo "unknown")
        if [ "$health_status_api" = "healthy" ]; then
            print_status "OK" "Health endpoint reports: healthy"
        else
            print_status "WARN" "Health endpoint reports: $health_status_api"
        fi
    else
        print_status "ERROR" "Health endpoint is not responding"
    fi
else
    if wget -q -T $TIMEOUT -O - "http://$HOST:$PORT/api/health" 2>/dev/null | grep -q "healthy"; then
        print_status "OK" "Health endpoint reports: healthy"
    else
        print_status "ERROR" "Health endpoint is not responding or unhealthy"
    fi
fi

# Check container logs for errors
echo ""
echo "Checking recent container logs..."
recent_logs=$(docker logs --tail 20 "$CONTAINER_NAME" 2>&1)
if echo "$recent_logs" | grep -i -E "error|fatal|exception" >/dev/null; then
    print_status "WARN" "Found error messages in recent logs"
    echo "Recent errors:"
    echo "$recent_logs" | grep -i -E "error|fatal|exception" | tail -5
else
    print_status "OK" "No recent errors found in logs"
fi

# Check resource usage
echo ""
echo "Checking resource usage..."
container_stats=$(docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}" "$CONTAINER_NAME" 2>/dev/null | tail -n 1)
if [ -n "$container_stats" ]; then
    cpu_usage=$(echo "$container_stats" | awk '{print $2}' | sed 's/%//')
    mem_usage=$(echo "$container_stats" | awk '{print $3}')
    
    print_status "OK" "Current resource usage: CPU ${cpu_usage}%, Memory: ${mem_usage}"
    
    # Warn if CPU usage is very high
    if [ -n "$cpu_usage" ] && [ "${cpu_usage%.*}" -gt 80 ]; then
        print_status "WARN" "High CPU usage detected (${cpu_usage}%)"
    fi
else
    print_status "WARN" "Could not retrieve resource usage statistics"
fi

# Summary
echo ""
echo "========================================"
echo -e "${BLUE}Deployment Verification Summary${NC}"
echo "========================================"

# Determine overall status
overall_status="OK"
if docker ps --format "{{.Names}}" | grep -q "$CONTAINER_NAME"; then
    if command_exists curl; then
        if ! curl -sSf -m 10 "http://$HOST:$PORT/" >/dev/null 2>&1; then
            overall_status="ERROR"
        fi
    fi
else
    overall_status="ERROR"
fi

if [ "$overall_status" = "OK" ]; then
    print_status "OK" "OrbitX website is successfully deployed and running"
    echo ""
    echo "🌐 Access your website at: http://$HOST:$PORT"
    echo "🔍 Health check at: http://$HOST:$PORT/api/health"
    echo "📊 Monitor container: docker stats $CONTAINER_NAME"
    echo ""
else
    print_status "ERROR" "Deployment verification failed"
    echo ""
    echo "🔧 Troubleshooting steps:"
    echo "1. Check container logs: docker logs $CONTAINER_NAME"
    echo "2. Verify container is running: docker ps"
    echo "3. Check port binding: docker port $CONTAINER_NAME"
    echo "4. Review deployment guide: PORTAINER-DEPLOYMENT.md"
    echo ""
    exit 1
fi

echo "✅ Verification completed successfully!"