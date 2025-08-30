
'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface User {
  id: string;
  username: string;
  email: string;
  isVerified: boolean;
  isAdmin: boolean;
}

interface UserProfileProps {
  user: User;
}

export default function UserProfile({ user }: UserProfileProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });
      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      // handle error if needed
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="user-profile" style={{ maxWidth: 400, margin: '0 auto', background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', padding: 24 }}>
      <div className="user-info" style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
        <div className="avatar-placeholder" style={{ width: 64, height: 64, borderRadius: '50%', background: '#52c41a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, fontWeight: 700, marginRight: 16 }}>
          {user.username[0].toUpperCase()}
        </div>
        <div>
          <h3 style={{ margin: 0 }}>{user.username}</h3>
          <div style={{ color: '#888', fontSize: 14 }}>{user.email}</div>
          <div style={{ marginTop: 4 }}>
            {user.isAdmin && <span style={{ background: '#ffd700', color: '#333', borderRadius: 4, padding: '2px 8px', fontSize: 12, marginRight: 8 }}>Admin</span>}
            {user.isVerified && <span style={{ background: '#52c41a', color: '#fff', borderRadius: 4, padding: '2px 8px', fontSize: 12 }}>Verified</span>}
          </div>
        </div>
      </div>
      <button
        style={{
          width: '100%',
          background: '#f5222d',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          padding: '12px 0',
          fontWeight: 600,
          fontSize: 16,
          cursor: isLoading ? 'not-allowed' : 'pointer',
          opacity: isLoading ? 0.7 : 1,
          marginTop: 16
        }}
        onClick={handleLogout}
        disabled={isLoading}
      >
        {isLoading ? 'Logging out...' : 'Logout'}
      </button>
    </div>
  );
}
