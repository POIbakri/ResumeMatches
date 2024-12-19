import { Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './components/landing/LandingPage';
import { LoginPage } from './components/auth/LoginPage';
import { SignUpPage } from './components/auth/SignUpPage';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { PricingPage } from './components/pricing/PricingPage';
import { useAuth } from './hooks/useAuth';
import { LoadingSpinner } from './components/feedback/LoadingSpinner';

export default function App() {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={!session ? <LandingPage /> : <Navigate to="/dashboard" />} />
      <Route path="/login" element={!session ? <LoginPage /> : <Navigate to="/dashboard" />} />
      <Route path="/signup" element={!session ? <SignUpPage /> : <Navigate to="/dashboard" />} />
      <Route path="/pricing" element={<PricingPage />} />

      {/* Protected routes */}
      <Route
        path="/dashboard/*"
        element={session ? <DashboardLayout /> : <Navigate to="/login" />}
      />

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}