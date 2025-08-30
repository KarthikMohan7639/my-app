'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface RegisterFormProps {
  onSuccess?: () => void;
  onSwitchToLogin?: () => void;
}

export default function RegisterForm({ onSuccess, onSwitchToLogin }: RegisterFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match!');
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccessMsg('Registration successful! Welcome!');
        onSuccess?.();
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        // Optionally redirect or refresh
        // router.refresh();
      } else {
        setErrorMsg(data.error || 'Registration failed');
      }
    } catch (error) {
      setErrorMsg('An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)', borderRadius: 20, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', padding: 32, marginTop: 48 }}>
      <div className="text-center mb-6">
        <div style={{ fontSize: 40, color: '#52c41a', marginBottom: 12, fontWeight: 700 }}>📝</div>
        <h2 style={{ color: '#52c41a', margin: 0 }}>Join Us Today!</h2>
        <div style={{ color: '#888', fontSize: 16 }}>Create your account to get started</div>
      </div>
      {errorMsg && <div style={{ color: '#f5222d', marginBottom: 12, textAlign: 'center' }}>{errorMsg}</div>}
      {successMsg && <div style={{ color: '#52c41a', marginBottom: 12, textAlign: 'center' }}>{successMsg}</div>}
  <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group" style={{ marginBottom: 16 }}>
          <label htmlFor="username" style={{ display: 'block', marginBottom: 4 }}>Username</label>
          <input
            type="text"
            id="username"
            name="username"
            required
            minLength={3}
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 16 }}
          />
        </div>
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
            minLength={6}
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 16 }}
          />
        </div>
        <div className="form-group" style={{ marginBottom: 16 }}>
          <label htmlFor="confirmPassword" style={{ display: 'block', marginBottom: 4 }}>Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            required
            minLength={6}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 16 }}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isLoading}
          style={{ width: '100%', background: '#52c41a', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 0', fontWeight: 600, fontSize: 16, cursor: isLoading ? 'not-allowed' : 'pointer', opacity: isLoading ? 0.7 : 1 }}
        >
          {isLoading ? 'Registering...' : 'Register'}
        </button>
        {onSwitchToLogin && (
          <div className="text-center" style={{ marginTop: 16 }}>
            <span>Already have an account?{' '}</span>
            <button type="button" className="btn btn-link" onClick={onSwitchToLogin} style={{ color: '#52c41a', background: 'none', border: 'none', textDecoration: 'underline', cursor: 'pointer', padding: 0 }}>
              Login here
            </button>
          </div>
        )}
        <div className="text-center" style={{ marginTop: 16 }}>
          <button
            type="button"
            className="btn btn-secondary"
            style={{ background: '#f5222d', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}
            onClick={() => router.push('/login')}
          >
            Logout
          </button>
        </div>
      </form>
    </div>
  );
}
