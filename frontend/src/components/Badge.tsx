import React from 'react';

interface BadgeProps {
  variant: 'genre' | 'status-on-sale' | 'status-upcoming' | 'status-sold-out' | 'info';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ variant, children, className = '' }) => {
  const styles = {
    genre: 'bg-[var(--color-orange)] text-white text-xs font-bold uppercase tracking-wider',
    'status-on-sale': 'bg-[var(--color-green)] text-white text-xs font-bold uppercase tracking-wider',
    'status-upcoming': 'bg-[var(--color-gold)] text-black text-xs font-bold uppercase tracking-wider',
    'status-sold-out': 'bg-[var(--color-red)] text-white text-xs font-bold uppercase tracking-wider',
    info: 'bg-[var(--color-charcoal)] text-[var(--color-cream)] text-xs font-bold uppercase tracking-wider',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full ${styles[variant]} ${className}`}>
      {children}
    </span>
  );
};
