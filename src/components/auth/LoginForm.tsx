import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Button } from '../form/Button';
import { Input } from '../form/Input';
import { Link } from 'react-router-dom';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Basic validation
    if (!email.trim() || !password.trim()) {
      setError('Email and password are required');
      setIsLoading(false);
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    try {
      // Debug logging
      console.log('Auth attempt with:', {
        emailLength: email.length,
        passwordLength: password.length,
        emailValid: emailRegex.test(email)
      });

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim(),
      });

      if (error) {
        console.error('Supabase auth error:', {
          status: error.status,
          message: error.message,
          name: error.name
        });
        
        // More user-friendly error messages
        if (error.message.includes('Invalid login credentials')) {
          throw new Error('Invalid email or password');
        }
        throw error;
      }

      console.log('Login successful', { userId: data.user?.id });

    } catch (err) {
      console.error('Login error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          id="email"
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="shadow-sm"
        />

        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="shadow-sm"
          />
          <button
            type="button"
            className="absolute right-3 top-9 text-gray-500 hover:text-gray-700 p-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {error && (
          <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-100">
            {error}
          </div>
        )}

        <Button 
          type="submit" 
          isLoading={isLoading}
          className="w-full py-2.5 text-base font-medium shadow-sm"
        >
          Sign In
        </Button>
      </form>

      <div className="text-center pt-2">
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}