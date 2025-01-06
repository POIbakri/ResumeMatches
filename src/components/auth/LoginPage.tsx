import { LoginForm } from './LoginForm';

export function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <div className="max-w-md w-full bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100">
        <h1 className="text-2xl sm:text-3xl font-bold mb-3 text-center text-gray-800">Welcome Back</h1>
        <p className="text-gray-600 text-center mb-8 text-sm sm:text-base">
          Sign in to continue to Top Match Talent
        </p>
        <LoginForm />
      </div>
    </div>
  );
}