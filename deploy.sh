#!/bin/bash

# ScamShield Rail - Multi-Service Deployment Script
# This script orchestrates deployment of all services

set -e

echo "🚀 ScamShield Rail - Multi-Service Deployment"
echo "=============================================="

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo -e "${YELLOW}⚠️  Python 3 not found. Please install Python 3.8+${NC}"
    exit 1
fi

# Check if Go is installed
if ! command -v go &> /dev/null; then
    echo -e "${YELLOW}⚠️  Go not found. Installing Go services will be skipped.${NC}"
    GO_AVAILABLE=false
else
    GO_AVAILABLE=true
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}⚠️  Node.js not found. Please install Node.js 18+${NC}"
    exit 1
fi

echo ""
echo -e "${BLUE}📦 Installing dependencies...${NC}"

# Install Node.js dependencies
echo -e "${GREEN}Installing frontend dependencies...${NC}"
npm install

# Install Python dependencies
echo -e "${GREEN}Installing Python backend dependencies...${NC}"
cd backend
python3 -m pip install -r requirements.txt
cd ..

# Build Go service
if [ "$GO_AVAILABLE" = true ]; then
    echo -e "${GREEN}Building Go file service...${NC}"
    cd file-service
    go build -o file-validator main.go
    cd ..
fi

echo ""
echo -e "${BLUE}🏗️  Building frontend...${NC}"
npm run build

echo ""
echo -e "${GREEN}✅ Deployment complete!${NC}"
echo ""
echo "To start all services:"
echo "  1. Frontend: npm run dev (port 3000)"
echo "  2. Python API: cd backend && python3 app.py (port 5000)"
if [ "$GO_AVAILABLE" = true ]; then
    echo "  3. Go File Service: cd file-service && ./file-validator (port 8080)"
fi
echo ""
echo "Or use the start-services script to run all at once."
