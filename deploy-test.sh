#!/bin/bash

# Deployment Test Script
echo "Testing deployment configuration..."

# Check if required files exist
echo "✓ Checking deployment configuration files..."

files=(
  ".env.example"
  "DEPLOYMENT.md" 
  "Dockerfile"
  "app.json"
  "docker-compose.yml"
  "netlify.toml"
  "vercel.json"
  "railway.build.sh"
  ".github/workflows/deploy.yml"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "✓ $file exists"
  else
    echo "✗ $file missing"
    exit 1
  fi
done

echo
echo "✓ All deployment configuration files are present!"
echo
echo "🚀 Ready to deploy on:"
echo "  • Vercel: https://vercel.com/new/clone?repository-url=https://github.com/KarthikMohan7639/my-app"
echo "  • Railway: https://railway.app/new/template?template=https://github.com/KarthikMohan7639/my-app"
echo "  • Render: Upload to render.com manually"
echo "  • Netlify: Connect repository at netlify.com"
echo "  • Heroku: Use Heroku CLI with app.json"
echo
echo "📖 See DEPLOYMENT.md for detailed instructions!"