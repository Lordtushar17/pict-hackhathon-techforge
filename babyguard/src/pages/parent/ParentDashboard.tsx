// src/pages/parent/ParentDashboard.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/common/Card";

type Reading = {
  distance_id: string;
  movement_score: number;
  movement_level: string;
  window_sec: number;
  samples: number;
  timestamp: number;
  topic: string;
  heart_rate_bpm?: number;
  spo2_pct?: number;
  temp_c?: number;
};

const ParentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [latest, setLatest] = useState<Reading | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastApiUpdate, setLastApiUpdate] = useState<string>("-");

  const API_BASE =
    import.meta.env.VITE_API_BASE_URL_VITALS ||
    "https://your-vitals-api-url.com";

  const fetchVitals = async () => {
    try {
      setError(null);

      const res = await fetch(`${API_BASE}/vitals`);
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();
      const rawItems: any[] = data.items || [];

      // Normalize types coming from API (strings -> numbers)
      const items: Reading[] = rawItems.map((item) => ({
        distance_id: item.distance_id,
        movement_score: Number(item.movement_score),
        movement_level: item.movement_level,
        window_sec: Number(item.window_sec),
        samples: Number(item.samples),
        timestamp: Number(item.timestamp),
        topic: item.topic,
        heart_rate_bpm:
          item.heart_rate_bpm !== undefined
            ? Number(item.heart_rate_bpm)
            : undefined,
        spo2_pct:
          item.spo2_pct !== undefined ? Number(item.spo2_pct) : undefined,
        temp_c: item.temp_c !== undefined ? Number(item.temp_c) : undefined,
      }));

      if (items.length > 0) {
        setLatest(items[0]); // newest reading
      } else {
        setLatest(null);
      }

      // update local API timestamp on every successful fetch
      setLastApiUpdate(new Date().toLocaleTimeString());
    } catch (err: any) {
      console.error("Vitals fetch error:", err);
      setError("Unable to load movement data");
      setLatest(null);
      setLastApiUpdate("-"); // optional: reset if error
    }
  };

  useEffect(() => {
    fetchVitals();

    // Auto-refresh every 5 seconds
    const interval = setInterval(fetchVitals, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("role");
    navigate("/login");
  };

  const movementText =
    latest?.movement_level === "still"
      ? "Low"
      : latest?.movement_level === "light"
      ? "Moderate"
      : latest?.movement_level === "active"
      ? "High"
      : latest?.movement_level === "sensor_error"
      ? "Sensor error"
      : "Unknown";

  const movementColor =
    latest?.movement_level === "still"
      ? "text-emerald-400"
      : latest?.movement_level === "light"
      ? "text-amber-400"
      : latest?.movement_level === "active"
      ? "text-rose-400"
      : latest?.movement_level === "sensor_error"
      ? "text-red-400"
      : "text-slate-400";

  const formatValue = (v?: number, decimals: number = 0) => {
    if (v === undefined || v === null || v < 0 || Number.isNaN(v)) return "-";
    return v.toFixed(decimals);
  };

  const hrDisplay = formatValue(latest?.heart_rate_bpm, 0);
  const spo2Display = formatValue(latest?.spo2_pct, 0);
  const tempDisplay = formatValue(latest?.temp_c, 1);

  return (
    <div className="space-y-6">
      {/* Header row with title + logout */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Baby Dashboard</h1>
          <p className="text-sm text-slate-400">
            Real-time health overview for your baby (prototype – 1 baby only).
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Last API Call:{" "}
            <span className="font-medium text-slate-300">
              {lastApiUpdate}
            </span>
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="text-xs rounded-lg bg-red-500 px-3 py-1.5 font-medium text-white hover:bg-red-400 transition"
        >
          Logout
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card title="Heart Rate" subtitle="Current">
          <p className="text-3xl font-semibold">
            {hrDisplay === "-" ? "-" : `${hrDisplay} bpm`}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            {hrDisplay === "-" ? "Sensor error or no contact" : "Stable"}
          </p>
        </Card>

        <Card title="SpO₂" subtitle="Oxygen Saturation">
          <p className="text-3xl font-semibold">
            {spo2Display === "-" ? "-" : `${spo2Display}%`}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            {spo2Display === "-" ? "Sensor error or not available" : "Healthy"}
          </p>
        </Card>

        <Card title="Movement" subtitle="Last 5 sec window">
          {error ? (
            <p className="text-xs text-red-400 mt-1">{error}</p>
          ) : latest ? (
            <>
              <p className={`text-3xl font-semibold ${movementColor}`}>
                {movementText}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Score: {latest.movement_score.toFixed(4)} <br />
                Samples: {latest.samples} <br />
                Window: {latest.window_sec}s <br />
                Updated (ESP32):{" "}
                {isNaN(latest.timestamp)
                  ? "—"
                  : new Date(latest.timestamp).toLocaleTimeString()}
              </p>
            </>
          ) : (
            <p className="text-xs text-slate-400">Waiting for data...</p>
          )}
        </Card>
      </div>

      <Card title="AI Risk Assessment" subtitle="Prototype model output">
        <p className="text-sm text-slate-300">
          No immediate risk detected. Monitoring continues in real-time.{" "}
          <span className="text-emerald-400">Overall risk score: 0.12</span>
        </p>
        <p className="text-xs text-slate-400 mt-2">
          Temp:{" "}
          <span className="font-medium">
            {tempDisplay === "-" ? "-" : `${tempDisplay} °C`}
          </span>
        </p>
      </Card>
    </div>
  );
};

export default ParentDashboard;
