#!/bin/bash

# Deployment Script for Hostinger
# Usage: ./deploy.sh

# 1. Pull latest code
echo "Pulling latest code from GitHub..."
git pull origin main

# 2. Install dependencies
echo "Installing dependencies..."
npm install --production

# 3. Build the project
echo "Building the project..."
npm run build

# 4. Restart the app
# Assuming PM2 is used, which is common on Hostinger
echo "Restarting the app..."
if pm2 list | grep -q "lifestats"; then
    pm2 restart lifestats
else
    pm2 start server.ts --name lifestats --interpreter tsx
fi

echo "Deployment complete!"
