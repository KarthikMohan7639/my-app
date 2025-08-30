
'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface LoginFormProps {
  onSuccess?: () => void;
  onSwitchToRegister?: () => void;
}

export default function LoginForm({ onSuccess, onSwitchToRegister }: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        onSuccess?.();
        router.push('/logout');
      } else {
        setErrorMsg(data.error || 'Login failed');
      }
    } catch (error) {
      setErrorMsg('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)', borderRadius: 20, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', padding: 32, marginTop: 48 }}>
      <div className="text-center mb-6">
        <div style={{ fontSize: 40, color: '#1890ff', marginBottom: 12, fontWeight: 700 }}>🔒</div>
        <h2 style={{ color: '#1890ff', margin: 0 }}>Welcome Back!</h2>
        <div style={{ color: '#888', fontSize: 16 }}>Sign in to your account</div>
      </div>
      {errorMsg && <div style={{ color: '#f5222d', marginBottom: 12, textAlign: 'center' }}>{errorMsg}</div>}
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group" style={{ marginBottom: 16 }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: 4 }}>Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 16 }}
          />
        </div>
        <div className="form-group" style={{ marginBottom: 16 }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: 4 }}>Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 16 }}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isLoading}
          style={{ width: '100%', background: '#1890ff', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 0', fontWeight: 600, fontSize: 16, cursor: isLoading ? 'not-allowed' : 'pointer', opacity: isLoading ? 0.7 : 1 }}
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </button>
        {onSwitchToRegister && (
          <div className="text-center" style={{ marginTop: 16 }}>
            <span>Don't have an account?{' '}</span>
            <button type="button" className="btn btn-link" onClick={onSwitchToRegister} style={{ color: '#1890ff', background: 'none', border: 'none', textDecoration: 'underline', cursor: 'pointer', padding: 0 }}>
              Register here
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
