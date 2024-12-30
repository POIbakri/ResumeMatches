import { SignUpForm } from './SignUpForm';

export function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Create Account</h1>
        <p className="text-gray-600 text-center mb-8">
          Join Top Match Talent to start analyzing candidates
        </p>
        <SignUpForm />
      </div>
    </div>
  );
}