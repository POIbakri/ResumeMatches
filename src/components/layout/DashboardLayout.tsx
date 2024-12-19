import { Routes, Route } from 'react-router-dom';
import { Header } from './Header';
import { Dashboard } from '../dashboard/Dashboard';
import { ErrorBoundary } from '../error/ErrorBoundary';

export function DashboardLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              {/* Add more dashboard routes here */}
            </Routes>
          </ErrorBoundary>
        </div>
      </main>
    </div>
  );
}