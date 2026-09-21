import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="relative bg-[var(--color-cream)] w-full max-w-lg rounded-xl shadow-2xl p-6 border border-[var(--color-charcoal)] animate-fade-in-up">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-black/5 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        {title && <h3 className="text-2xl font-heading font-bold mb-4 pr-8">{title}</h3>}
        <div>{children}</div>
      </div>
    </div>
  );
};
