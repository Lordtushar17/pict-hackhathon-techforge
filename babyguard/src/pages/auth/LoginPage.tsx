// src/pages/auth/LoginPage.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleTabs from '../../components/common/RoleTabs';

type Role = 'parent' | 'hospital';

type Mode = 'login' | 'register';

// TODO: set this in .env as VITE_API_BASE_URL and read from there
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'https://your-api-gateway-url.com';

const LoginPage: React.FC = () => {
  const [role, setRole] = useState<Role>('parent');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<Mode>('login');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  // If already logged in, redirect automatically
  useEffect(() => {
    const existingRole = localStorage.getItem('role') as Role | null;
    const userId = localStorage.getItem('userId');

    if (existingRole && userId) {
      if (existingRole === 'parent') {
        navigate('/parent/dashboard');
      } else if (existingRole === 'hospital') {
        navigate('/hospital/dashboard');
      }
    }
  }, [navigate]);

  const resetFormAndError = () => {
    setError(null);
    setPassword('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const endpoint =
        mode === 'register'
          ? `${API_BASE_URL}/register`
          : `${API_BASE_URL}/login`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          role,
          username,
          password, // 🔥 plain text, WILL be hashed in Lambda
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || 'Request failed');
      }

      // Expecting: { message, userId, role, babyId? }
      const userId = data.userId as string | undefined;
      const returnedRole = data.role as Role | undefined;
      const babyId = data.babyId as string | undefined;

      if (!userId || !returnedRole) {
        throw new Error('Invalid response from server');
      }

      // Save session
      localStorage.setItem('role', returnedRole);
      localStorage.setItem('userId', userId);
      if (babyId) {
        localStorage.setItem('babyId', babyId);
      } else {
        localStorage.removeItem('babyId');
      }

      // Navigate
      if (returnedRole === 'parent') {
        navigate('/parent/dashboard');
      } else {
        navigate('/hospital/dashboard');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleMode = () => {
    setMode((prev) => (prev === 'login' ? 'register' : 'login'));
    resetFormAndError();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-md border border-slate-800 rounded-xl p-6 bg-slate-900/80">
        {/* Header */}
        <div className="mb-4 text-center">
          <p className="text-xs text-emerald-400 font-medium tracking-[0.25em] uppercase">
            BabyGuard
          </p>
          <h1 className="mt-1 text-xl font-semibold">
            {mode === 'login' ? 'Login' : 'Create new account'}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Role-based access for parents and hospitals.
          </p>
        </div>

        {/* Role tabs */}
        <div className="flex justify-center mb-4">
          <RoleTabs role={role} onChange={setRole} />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs mb-1">Username / Email</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 rounded border border-slate-700 bg-slate-900 text-sm"
              placeholder="example@babyguard.com"
              required
            />
          </div>

          <div>
            <label className="block text-xs mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded border border-slate-700 bg-slate-900 text-sm"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <p className="text-xs text-red-400 mt-1">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 py-2 rounded bg-emerald-500 text-slate-950 text-sm font-medium disabled:opacity-60"
          >
            {isSubmitting
              ? mode === 'login'
                ? 'Logging in...'
                : 'Creating account...'
              : mode === 'login'
              ? 'Login'
              : 'Create account'}
          </button>
        </form>

        {/* Mode switch ("Create new" button) */}
        <div className="mt-4 text-center text-[11px] text-slate-400">
          {mode === 'login' ? (
            <>
              <span>New here? </span>
              <button
                type="button"
                onClick={toggleMode}
                className="text-emerald-400 hover:underline font-medium"
              >
                Create new account
              </button>
            </>
          ) : (
            <>
              <span>Already registered? </span>
              <button
                type="button"
                onClick={toggleMode}
                className="text-emerald-400 hover:underline font-medium"
              >
                Login instead
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
