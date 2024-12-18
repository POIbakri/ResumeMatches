import React from 'react';
import { LoginForm } from './LoginForm';

export function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Welcome Back</h1>
        <p className="text-gray-600 text-center mb-8">
          Sign in to continue to CV Analyzer
        </p>
        <LoginForm />
      </div>
    </div>
  );
}