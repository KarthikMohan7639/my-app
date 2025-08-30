
// User model type definition
export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  isVerified: boolean;
  isAdmin: boolean;
  forgotPasswordToken?: string | null;
  forgotPasswordTokenExpiry?: Date | null;
  verifyToken?: string | null;
  verifyTokenExpiry?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

// Re-export the User type for convenience
export type { User as default };

