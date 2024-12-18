import React from 'react';
import { Container } from './Container';
import { Header } from './Header';
import { ErrorBoundary } from '../error/ErrorBoundary';
import { Toast } from '../feedback/Toast';
import { useToast } from '../../hooks/useToast';

interface PageProps {
  children: React.ReactNode;
}

export function Page({ children }: PageProps) {
  const { toasts, removeToast } = useToast();

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="py-8">
          <Container>
            {children}
          </Container>
        </main>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ErrorBoundary>
  );
}