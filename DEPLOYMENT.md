# Deployment Guide

This guide covers deploying your Next.js authentication app to various free hosting platforms. Choose the platform that best fits your needs.

## 🚀 Quick Deploy Options

### 1. Vercel (Recommended for Next.js)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/KarthikMohan7639/my-app)

**Why Vercel?**
- Built by the creators of Next.js
- Automatic deployments from GitHub
- Free tier with generous limits
- Excellent performance with Edge Network

**Setup Steps:**
1. Click the deploy button above or visit [Vercel](https://vercel.com)
2. Connect your GitHub repository
3. Configure environment variables (see [Environment Variables](#environment-variables))
4. Deploy!

### 2. Railway

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https://github.com/KarthikMohan7639/my-app)

**Why Railway?**
- Includes database hosting
- Simple deployment process
- Good for full-stack apps
- PostgreSQL/MySQL included

**Setup Steps:**
1. Click the deploy button above
2. Connect your GitHub account
3. Configure environment variables
4. Railway will automatically provision a database

### 3. Render

**Why Render?**
- Free static site hosting
- PostgreSQL database included
- Easy to use interface
- Good performance

**Setup Steps:**
1. Visit [Render](https://render.com)
2. Connect your GitHub repository
3. Choose "Web Service"
4. Set build command: `npm run build`
5. Set start command: `npm start`
6. Add environment variables

### 4. Netlify

**Why Netlify?**
- Excellent for static sites
- Great CDN performance
- Easy continuous deployment
- Generous free tier

**Setup Steps:**
1. Visit [Netlify](https://netlify.com)
2. Connect your GitHub repository
3. Build settings are configured in `netlify.toml`
4. Add environment variables in Netlify dashboard

### 5. Heroku

**Why Heroku?**
- Traditional PaaS platform
- Many add-ons available
- Good documentation
- Easy scaling

**Setup Steps:**
1. Install [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
2. Run: `heroku create your-app-name`
3. Add database addon: `heroku addons:create jawsdb:kitefin`
4. Configure environment variables: `heroku config:set JWT_SECRET=your-secret`
5. Deploy: `git push heroku main`

## 📊 Database Options

### For Production (Free Tiers)

#### 1. PlanetScale (MySQL - Recommended)
- 10GB storage free
- Serverless MySQL platform
- Branching like Git
- [Sign up](https://planetscale.com)

#### 2. Railway PostgreSQL
- Automatically included with Railway deployment
- 1GB storage free
- Easy to set up

#### 3. Neon (PostgreSQL)
- Serverless PostgreSQL
- 3GB storage free
- Great performance
- [Sign up](https://neon.tech)

#### 4. Supabase (PostgreSQL)
- 500MB storage free
- Includes auth and storage
- Real-time features
- [Sign up](https://supabase.com)

## 🔧 Environment Variables

Create these environment variables in your deployment platform:

### Required Variables
```bash
# Database
DATABASE_URL="your-database-connection-string"

# Authentication
JWT_SECRET="your-super-secret-jwt-key-minimum-32-characters"
NEXTAUTH_URL="https://your-app-domain.com"
NEXTAUTH_SECRET="your-nextauth-secret-key"

# Node Environment
NODE_ENV="production"
```

### Platform-Specific Examples

#### PlanetScale Database URL
```bash
DATABASE_URL="mysql://username:password@host.planetscale.com:3306/database_name?sslaccept=strict"
```

#### Railway PostgreSQL URL
```bash
DATABASE_URL="postgresql://username:password@host:port/database_name"
```

#### Neon PostgreSQL URL
```bash
DATABASE_URL="postgresql://username:password@host:port/database_name?sslmode=require"
```

## 🛠️ Database Setup

### 1. Update Prisma Schema (if needed)
If using PostgreSQL instead of MySQL, update `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"  // Change from "mysql"
  url      = env("DATABASE_URL")
}
```

### 2. Push Database Schema
After deployment, run:
```bash
npx prisma db push
```

Or in your deployment platform's console/terminal.

## 🔍 Platform Comparison

| Platform | Database | Free Tier | Best For |
|----------|----------|-----------|----------|
| **Vercel** | External required | 100GB bandwidth | Next.js apps |
| **Railway** | Included | $5 credit | Full-stack apps |
| **Render** | PostgreSQL included | 750 hours | Web services |
| **Netlify** | External required | 100GB bandwidth | Static sites |
| **Heroku** | Add-ons available | 550-1000 hours | Traditional apps |

## 🚨 Troubleshooting

### Build Issues
If you encounter build errors:

1. **Font loading errors**: Fonts are configured to use system fonts as fallbacks
2. **Prisma client issues**: Make sure `npx prisma generate` runs in build process
3. **Environment variables**: Ensure all required variables are set

### Database Connection Issues
1. Check your `DATABASE_URL` format
2. Ensure database is accessible from your deployment platform
3. Verify SSL settings for production databases

### Authentication Issues
1. Make sure `NEXTAUTH_URL` matches your deployed domain
2. Ensure `JWT_SECRET` is at least 32 characters
3. Check that cookies are working (HTTPS required for production)

## 📝 Post-Deployment Checklist

- [ ] App loads successfully
- [ ] Database connection works
- [ ] User registration works
- [ ] User login works
- [ ] JWT authentication works
- [ ] Protected routes are secure
- [ ] Environment variables are set correctly

## 🔄 Updating Your App

Most platforms support automatic deployments:
1. Push changes to your main branch
2. Platform automatically rebuilds and deploys
3. Database migrations run if configured

## 💡 Performance Tips

1. **Use a CDN**: All recommended platforms include CDN
2. **Enable compression**: Automatically handled by platforms
3. **Optimize images**: Use Next.js Image component
4. **Database indexing**: Add indexes for frequently queried fields
5. **Caching**: Implement appropriate caching strategies

## 🆘 Getting Help

If you encounter issues:
1. Check the platform's documentation
2. Review build logs for errors
3. Verify environment variables
4. Test locally first with production environment variables

---

## Quick Start Commands

```bash
# Clone and setup
git clone https://github.com/KarthikMohan7639/my-app.git
cd my-app
npm install

# Set up environment
cp .env.example .env.local
# Edit .env.local with your values

# Generate Prisma client and push schema
npm run db:generate
npm run db:push

# Run locally
npm run dev
```

Choose your preferred platform above and follow the setup steps! 🚀