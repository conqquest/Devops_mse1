import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  fullPage?: boolean;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ fullPage = false }) => {
  if (fullPage) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-[var(--color-orange)] animate-spin mb-4" />
        <h2 className="text-2xl font-heading font-bold animate-pulse">Loading Vibes...</h2>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center py-8">
      <Loader2 className="w-8 h-8 text-[var(--color-orange)] animate-spin" />
    </div>
  );
};
