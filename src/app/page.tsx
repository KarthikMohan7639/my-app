'use client';

import LoginForm from '@/components/LoginForm';
import RegisterForm from '@/components/RegisterForm';
import UserProfile from '@/components/UserProfile';
import { useAuth } from '@/contexts/AuthContext';
// import GlitterBackground from '@/components/GlitterBackground';
import { Spin, Typography } from 'antd';
import { motion } from 'framer-motion';
import { useState } from 'react';

const { Title, Text } = Typography;

export default function Home() {
  const { user, loading } = useAuth();
  const [showRegister, setShowRegister] = useState(false);

  if (loading) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
          backgroundSize: '400% 400%',
          animation: 'gradientShift 15s ease infinite',
        }}
      >
  {/* Solid background color instead of GlitterBackground */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center z-10"
        >
          <Spin size="large" />
          <Title level={3} style={{ color: 'white', marginTop: '16px' }}>
            Loading...
          </Title>
        </motion.div>
        <style jsx>{`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>
      </div>
    );
  }

  if (user) {
    return (
      <div 
        className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
          backgroundSize: '400% 400%',
          animation: 'gradientShift 15s ease infinite',
        }}
      >
  {/* Solid background color instead of GlitterBackground */}
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <Title level={1} style={{ color: 'white', fontSize: '3rem', marginBottom: '8px' }}>
              🎉 Welcome to My App! 🎉
            </Title>
            <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: '18px' }}>
              You are successfully logged in!
            </Text>
          </motion.div>
          <UserProfile user={user} />
        </div>
        <style jsx>{`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
        backgroundSize: '400% 400%',
        animation: 'gradientShift 15s ease infinite',
      }}
    >
  {/* Removed GlitterBackground */}
      <div className="max-w-md mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <Title level={1} style={{ color: 'white', fontSize: '2.5rem', marginBottom: '8px' }}>
            {showRegister ? '🌟 Join Us Today! 🌟' : '✨ Welcome Back! ✨'}
          </Title>
          <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: '18px' }}>
            {showRegister 
              ? 'Sign up to get started with our amazing app' 
              : 'Sign in to your account to continue your journey'
            }
          </Text>
        </motion.div>

        {showRegister ? (
          <RegisterForm 
            onSuccess={() => setShowRegister(false)}
            onSwitchToLogin={() => setShowRegister(false)}
          />
        ) : (
          <LoginForm 
            onSuccess={() => {}}
            onSwitchToRegister={() => setShowRegister(true)}
          />
        )}
      </div>
      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}
