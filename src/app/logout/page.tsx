
"use client";
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <div className="w-full max-w-md mx-auto" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)', borderRadius: 20, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', padding: 32, marginTop: 48 }}>
      <div className="text-center mb-6">
        <div style={{ fontSize: 40, color: '#f5222d', marginBottom: 12, fontWeight: 700 }}>🚪</div>
        <h2 style={{ color: '#f5222d', margin: 0 }}>Logout</h2>
        <div style={{ color: '#888', fontSize: 16 }}>You are logged in. Click below to logout.</div>
      </div>
      <div className="text-center">
        <button
          type="button"
          className="btn btn-secondary"
          style={{ background: '#f5222d', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 32px', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
