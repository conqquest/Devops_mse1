import React, { useState } from 'react';
import type { GalleryItem as GalleryItemType } from '../types';
import { GalleryModal } from './GalleryModal';

export const Gallery: React.FC<{ items: GalleryItemType[] }> = ({ items }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  if (!items || items.length === 0) return <div>No images available yet.</div>;

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {items.map((item, index) => (
          <div 
            key={item.id} 
            className="relative group cursor-pointer overflow-hidden rounded-lg break-inside-avoid"
            onClick={() => setSelectedImageIndex(index)}
          >
            <div className="w-full bg-gradient-to-br from-gray-700 to-gray-900 aspect-[4/3]">
              {item.image ? (
                <img src={item.image} alt={item.caption} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              ) : (
                <div className="w-full h-full opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8cGF0aCBkPSJNMCAwTDggOFpNOCAwTDAgOFoiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIvPjwvc3ZnPg==')]"></div>
              )}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <div>
                <span className="text-[var(--color-orange)] text-xs font-bold uppercase mb-1 block">{item.category}</span>
                <p className="text-white font-medium">{item.caption}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <GalleryModal 
        isOpen={selectedImageIndex !== null} 
        onClose={() => setSelectedImageIndex(null)}
        items={items}
        currentIndex={selectedImageIndex ?? 0}
        onNavigate={(newIndex) => setSelectedImageIndex(newIndex)}
      />
    </>
  );
};
