// src/components/common/Navbar.tsx
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-sm font-bold text-emerald-300">
            BG
          </div>
          <span className="text-lg font-semibold tracking-tight">
            BabyGuard
          </span>
          
        </div>
      </div>
    </header>
  );
};

export default Navbar;
