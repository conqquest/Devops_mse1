import { useState } from 'react';
import { Gallery } from '../components';

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  
  const categories = ['All', 'Crowd', 'Performance', 'Stage', 'Atmosphere', 'Backstage'];
  
  const mockItems = [
    { id: '1', eventId: '1', image: '', caption: 'Main stage lights up', category: 'Stage' },
    { id: '2', eventId: '1', image: '', caption: 'The crowd goes wild', category: 'Crowd' },
    { id: '3', eventId: '2', image: '', caption: 'Intimate performance', category: 'Performance' },
    { id: '4', eventId: '1', image: '', caption: 'Sunset vibes', category: 'Atmosphere' },
    { id: '5', eventId: '3', image: '', caption: 'Getting ready', category: 'Backstage' },
    { id: '6', eventId: '1', image: '', caption: 'Laser show', category: 'Stage' },
  ];

  const filtered = activeCategory === 'All' ? mockItems : mockItems.filter(i => i.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-5xl font-heading font-black mb-12 text-center">EXPERIENCE GALLERY</h1>
      
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full font-bold text-sm transition-colors ${
              activeCategory === cat 
                ? 'bg-[var(--color-charcoal)] text-[var(--color-cream)]' 
                : 'bg-white border border-[var(--color-charcoal)] text-[var(--color-charcoal)] hover:bg-black/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <Gallery items={filtered} />
    </div>
  );
}
