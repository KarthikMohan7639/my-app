#!/bin/bash

# Vercel Deployment Setup
echo "Setting up for Vercel deployment..."

# Check if vercel.json exists
if [ -f "vercel.json" ]; then
  echo "✓ vercel.json found"
else
  echo "✗ vercel.json missing"
  exit 1
fi

echo
echo "🚀 Vercel Deployment Instructions:"
echo
echo "1. Install Vercel CLI: npm i -g vercel"
echo "2. Login to Vercel: vercel login"
echo "3. Deploy: vercel --prod"
echo
echo "Or use the web interface:"
echo "1. Go to https://vercel.com/new"
echo "2. Connect your GitHub repository"
echo "3. Set environment variables:"
echo "   - DATABASE_URL: Your database connection string"
echo "   - JWT_SECRET: A secure random string (32+ chars)"
echo "   - NEXTAUTH_URL: Your vercel app URL"
echo "   - NEXTAUTH_SECRET: A secure random string"
echo "4. Deploy!"
echo
echo "📖 Database Options for Vercel:"
echo "   • PlanetScale (MySQL): https://planetscale.com"
echo "   • Neon (PostgreSQL): https://neon.tech"
echo "   • Supabase (PostgreSQL): https://supabase.com"
echo
echo "✓ Ready for Vercel deployment!"