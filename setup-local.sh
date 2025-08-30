#!/bin/bash

# Environment Setup Script for Local Development
echo "Setting up environment for local development..."

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
  echo "Creating .env.local from .env.example..."
  cp .env.example .env.local
  echo "✓ .env.local created"
  echo
  echo "⚠️  IMPORTANT: Edit .env.local with your actual values:"
  echo "   - Set a real DATABASE_URL for your local MySQL"
  echo "   - Generate a secure JWT_SECRET (at least 32 characters)"
  echo "   - Update NEXTAUTH_URL if not using localhost:3000"
  echo
else
  echo "✓ .env.local already exists"
fi

# Install dependencies
echo "Installing dependencies..."
npm install

# Check if Prisma client exists
echo "Setting up database..."
if command -v npx &> /dev/null; then
  echo "Generating Prisma client..."
  npx prisma generate
  echo "✓ Prisma client generated"
  
  echo
  echo "📝 Next steps:"
  echo "1. Make sure your MySQL database is running"
  echo "2. Update DATABASE_URL in .env.local"
  echo "3. Run: npm run db:push"
  echo "4. Run: npm run dev"
else
  echo "⚠️  npx not found. Install Node.js and npm first."
fi

echo
echo "🚀 Ready for local development!"