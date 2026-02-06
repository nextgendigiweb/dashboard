
import React, { useState } from 'react';
import Login from './auth/Login';
import Signup from './auth/Signup';

interface AuthProps {
  onLogin: () => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-3 sm:p-4 md:p-6 relative overflow-hidden font-inter text-white">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,246,255,0.05),transparent)] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {mode === 'login' ? (
        <Login
          onLogin={onLogin}
          onSwitchToSignup={() => setMode('signup')}
        />
      ) : (
        <Signup
          onSignup={onLogin}
          onSwitchToLogin={() => setMode('login')}
        />
      )}

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default Auth;
