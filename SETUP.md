# Authentication Setup Guide

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="mysql://username:password@localhost:3306/myapp"

# JWT Secret (change this to a secure random string in production)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Next.js
NODE_ENV=development
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Set up MySQL database:
   - Install MySQL on your system
   - Create a database named `myapp`
   - Update the `DATABASE_URL` in `.env.local` with your MySQL credentials

3. Generate Prisma client and push schema to database:
```bash
npm run db:generate
npm run db:push
```

4. Start the development server:
```bash
npm run dev
```

## Database Commands

- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema changes to database
- `npm run db:migrate` - Create and apply migrations
- `npm run db:studio` - Open Prisma Studio (database GUI)

## Features

- User registration with email and username
- User login with email and password
- Password hashing with bcrypt
- JWT token-based authentication
- Protected routes with middleware
- Session management with HTTP-only cookies
- User profile display
- Logout functionality
- MySQL database with Prisma ORM

## API Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user info

## Usage

1. Visit the homepage to see the login/register interface
2. Create an account or login with existing credentials
3. Once logged in, you'll see your profile information
4. Use the logout button to sign out

## Security Features

- Passwords are hashed using bcrypt
- JWT tokens are stored in HTTP-only cookies
- Middleware protects routes
- Input validation on all forms
- CSRF protection through same-site cookies
- Type-safe database operations with Prisma
