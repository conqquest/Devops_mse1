import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { GalleryItem } from '../types';

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: GalleryItem[];
  currentIndex: number;
  onNavigate: (index: number) => void;
}

export const GalleryModal: React.FC<GalleryModalProps> = ({ isOpen, onClose, items, currentIndex, onNavigate }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate(Math.max(0, currentIndex - 1));
      if (e.key === 'ArrowRight') onNavigate(Math.min(items.length - 1, currentIndex + 1));
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, currentIndex, items.length, onClose, onNavigate]);

  if (!isOpen || items.length === 0) return null;

  const currentItem = items[currentIndex];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95">
      <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white p-2 z-10 transition-colors">
        <X className="w-8 h-8" />
      </button>

      {currentIndex > 0 && (
        <button onClick={() => onNavigate(currentIndex - 1)} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-2 z-10 transition-colors">
          <ChevronLeft className="w-12 h-12" />
        </button>
      )}

      {currentIndex < items.length - 1 && (
        <button onClick={() => onNavigate(currentIndex + 1)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-2 z-10 transition-colors">
          <ChevronRight className="w-12 h-12" />
        </button>
      )}

      <div className="w-full max-w-5xl px-16 h-[80vh] flex flex-col items-center justify-center">
        <div className="relative w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden border border-white/10 shadow-2xl">
          {currentItem.image ? (
            <img src={currentItem.image} alt={currentItem.caption} className="w-full h-full object-contain" />
          ) : (
            <div className="w-full h-full opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8cGF0aCBkPSJNMCAwTDggOFpNOCAwTDAgOFoiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIvPjwvc3ZnPg==')]"></div>
          )}
        </div>
        <div className="mt-6 text-center">
          <span className="text-[var(--color-orange)] text-sm font-bold uppercase tracking-widest">{currentItem.category}</span>
          <p className="text-white text-lg mt-2">{currentItem.caption}</p>
          <p className="text-white/40 text-sm mt-2">{currentIndex + 1} / {items.length}</p>
        </div>
      </div>
    </div>
  );
};
