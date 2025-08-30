'use client';

import { message } from 'antd';
import { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react';

interface User {
  id: string;
  username: string;
  email: string;
  isVerified: boolean;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);


  // Track session expiry timer
  const sessionTimer = useRef<NodeJS.Timeout | null>(null);

  const clearSessionTimer = () => {
    if (sessionTimer.current) {
      clearTimeout(sessionTimer.current);
      sessionTimer.current = null;
    }
  };

  const login = (userData: User) => {
    setUser(userData);
    clearSessionTimer();
    // Set auto-logout for 5 minutes (300,000 ms)
    sessionTimer.current = setTimeout(() => {
      setUser(null);
      message.warning('Session expired');
    }, 5 * 60 * 1000);
  };

  const logout = () => {
    setUser(null);
    clearSessionTimer();
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/auth/me');
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
          clearSessionTimer();
          // Set auto-logout for 5 minutes (300,000 ms)
          sessionTimer.current = setTimeout(() => {
            setUser(null);
            message.warning('Session expired');
          }, 5 * 60 * 1000);
        } else {
          setUser(null);
          clearSessionTimer();
        }
      } catch (error) {
        setUser(null);
        clearSessionTimer();
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
    // Clean up timer on unmount
    return () => clearSessionTimer();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
