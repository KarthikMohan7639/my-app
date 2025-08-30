#!/bin/bash

# Build hook for Railway deployment
echo "Running Railway build..."

# Install dependencies
npm ci

# Generate Prisma client
npx prisma generate

# Build the application
npm run build

echo "Build completed successfully!"