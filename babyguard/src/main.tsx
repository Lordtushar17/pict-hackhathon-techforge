// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import LoginPage from './pages/auth/LoginPage';
import ParentDashboard from './pages/parent/ParentDashboard';
import HospitalDashboard from './pages/hospital/HospitalDashboard';
import ProtectedRoute from './pages/auth/ProtectedRoute';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Everything inside layout */}
        <Route element={<AppLayout />}>
          {/* Default -> login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Login page */}
          <Route path="/login" element={<LoginPage />} />

          {/* Parent routes */}
          <Route
            path="/parent"
            element={
              <ProtectedRoute allowedRole="parent">
                <ParentDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/parent/dashboard"
            element={
              <ProtectedRoute allowedRole="parent">
                <ParentDashboard />
              </ProtectedRoute>
            }
          />

          {/* Hospital routes */}
          <Route
            path="/hospital"
            element={
              <ProtectedRoute allowedRole="hospital">
                <HospitalDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/hospital/dashboard"
            element={
              <ProtectedRoute allowedRole="hospital">
                <HospitalDashboard />
              </ProtectedRoute>
            }
          />

          {/* Anything else → login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
