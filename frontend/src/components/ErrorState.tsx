import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from './Button';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
  is404?: boolean;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ message = 'Something went wrong', onRetry, is404 = false }) => {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-20 h-20 bg-red-100 text-[var(--color-red)] rounded-full flex items-center justify-center mb-6">
        <AlertCircle className="w-10 h-10" />
      </div>
      <h2 className="text-3xl font-heading font-bold mb-2">{is404 ? '404 - Not Found' : 'Oops!'}</h2>
      <p className="text-[var(--color-charcoal-light)] mb-8 max-w-md">{message}</p>
      {onRetry && <Button onClick={onRetry} variant="outline">Try Again</Button>}
      {is404 && <Button onClick={() => window.location.href = '/'} variant="primary">Back to Home</Button>}
    </div>
  );
};
