import { Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './components/landing/LandingPage';
import { LoginPage } from './components/auth/LoginPage';
import { SignUpPage } from './components/auth/SignUpPage';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { PricingPage } from './components/pricing/PricingPage';
import { useAuth } from './hooks/useAuth';
import { LoadingSpinner } from './components/feedback/LoadingSpinner';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CheckoutSuccess } from './components/checkout/CheckoutSuccess';

export default function App() {
  const { session, loading } = useAuth();
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise}>
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
      <Route
        path="/checkout/success"
        element = {<CheckoutSuccess/>}
      />

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </Elements>
  );
}