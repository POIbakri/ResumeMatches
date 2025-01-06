import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Button } from '../form/Button';
import { Input } from '../form/Input';
import { Link } from 'react-router-dom';

export function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!email || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      console.log('Attempting signup with:', { email, redirectTo: `${window.location.origin}/auth/callback` });
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      console.log('Signup response:', { data, error });

      if (error) throw error;

      if (data?.user) {
        setSuccessMessage('Please check your emails for confirmation (Check your junk folder)');
      }
    } catch (err) {
      console.error('Signup error:', err);
      
      if (err instanceof Error) {
        const errorMessage = err.message.toLowerCase();
        if (errorMessage.includes('rate limit')) {
          setError('Too many signup attempts. Please try again later.');
        } else if (errorMessage.includes('already registered') || errorMessage.includes('already exists')) {
          setError('This email is already registered. Please sign in instead.');
        } else if (errorMessage.includes('invalid email')) {
          setError('Please enter a valid email address.');
        } else if (errorMessage.includes('weak password')) {
          setError('Please choose a stronger password.');
        } else {
          setError(`Signup failed: ${err.message}`);
        }
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
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
            type={showPasswords ? "text" : "password"}
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="shadow-sm"
          />
          <button
            type="button"
            className="absolute right-3 top-9 text-gray-500 hover:text-gray-700 p-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded"
            onClick={() => setShowPasswords(!showPasswords)}
          >
            {showPasswords ? "Hide" : "Show"}
          </button>
        </div>

        <div className="relative">
          <Input
            id="confirmPassword"
            type={showPasswords ? "text" : "password"}
            label="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="shadow-sm"
          />
          <button
            type="button"
            className="absolute right-3 top-9 text-gray-500 hover:text-gray-700 p-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded"
            onClick={() => setShowPasswords(!showPasswords)}
          >
            {showPasswords ? "Hide" : "Show"}
          </button>
        </div>

        {error && (
          <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-100">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="text-green-600 text-sm bg-green-50 p-3 rounded-lg border border-green-100">
            {successMessage}
          </div>
        )}

        <Button 
          type="submit" 
          isLoading={isLoading}
          className="w-full py-2.5 text-base font-medium shadow-sm"
        >
          Sign Up
        </Button>
      </form>

      <div className="text-center pt-2">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}