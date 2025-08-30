import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';

export interface TokenPayload {
  userId: string;
  email: string;
  username: string;
}

export function generateToken(payload: TokenPayload): string {
  // Set token to expire in 5 minutes
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '5m' });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (error) {
    return null;
  }
}
