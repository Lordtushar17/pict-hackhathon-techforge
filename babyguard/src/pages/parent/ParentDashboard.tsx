// src/pages/parent/ParentDashboard.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/common/Card';

const ParentDashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <div className="space-y-6">
      {/* Header row with title + logout */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Baby Dashboard</h1>
          <p className="text-sm text-slate-400">
            Real-time health overview for your baby (prototype – 1 baby only).
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="text-xs rounded-lg bg-red-500 px-3 py-1.5 font-medium text-white hover:bg-red-400 transition"
        >
          Logout
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card title="Heart Rate" subtitle="Current">
          <p className="text-3xl font-semibold">128 bpm</p>
          <p className="text-xs text-emerald-400 mt-1">Stable · Normal range</p>
        </Card>

        <Card title="SpO₂" subtitle="Oxygen Saturation">
          <p className="text-3xl font-semibold">98%</p>
          <p className="text-xs text-emerald-400 mt-1">Healthy</p>
        </Card>

        <Card title="Movement" subtitle="Last 5 min">
          <p className="text-3xl font-semibold">Low</p>
          <p className="text-xs text-slate-400 mt-1">
            Baby is likely sleeping.
          </p>
        </Card>
      </div>

      <Card title="AI Risk Assessment" subtitle="Prototype model output">
        <p className="text-sm text-slate-300">
          No immediate risk detected. Monitoring continues in real-time.{' '}
          <span className="text-emerald-400">Overall risk score: 0.12</span>
        </p>
      </Card>
    </div>
  );
};

export default ParentDashboard;
