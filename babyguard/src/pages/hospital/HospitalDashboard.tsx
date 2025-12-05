// src/pages/hospital/HospitalDashboard.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/common/Card';

const HospitalDashboard: React.FC = () => {
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
          <h1 className="text-2xl font-semibold">NICU Console</h1>
          <p className="text-sm text-slate-400">
            Overview of the monitored infant for this prototype.
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="text-xs rounded-lg bg-red-500 px-3 py-1.5 font-medium text-white hover:bg-red-400 transition"
        >
          Logout
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card title="Live Alerts" subtitle="Last 24 hours">
          <ul className="space-y-2 text-sm text-slate-300">
            <li>• 02:15 – Mild movement anomaly detected (resolved)</li>
            <li>• 10:40 – SpO₂ dip below 94% (resolved)</li>
            <li>• 15:20 – Stable, no active alerts</li>
          </ul>
        </Card>

        <Card title="Care Notes" subtitle="From nursing staff">
          <p className="text-sm text-slate-300">
            Infant feeding well, vitals stable, no signs of respiratory distress.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default HospitalDashboard;
