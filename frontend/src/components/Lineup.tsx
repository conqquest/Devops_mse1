import React, { useState } from 'react';
import type { LineupDay } from '../types';

export const Lineup: React.FC<{ lineup: LineupDay[] }> = ({ lineup }) => {
  const [activeDay, setActiveDay] = useState(0);

  if (!lineup || lineup.length === 0) return <div>Lineup coming soon...</div>;

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {lineup.map((day, idx) => (
          <button
            key={idx}
            onClick={() => setActiveDay(idx)}
            className={`px-6 py-3 rounded-full font-heading font-bold text-lg transition-all ${
              activeDay === idx 
                ? 'bg-[var(--color-orange)] text-white shadow-[0_4px_14px_0_rgba(232,101,43,0.39)]' 
                : 'bg-white border border-[var(--color-charcoal)] text-[var(--color-charcoal)] hover:bg-black/5'
            }`}
          >
            {day.day} <span className="opacity-60 text-sm ml-2">{new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
        {lineup[activeDay].artists.map((artist, idx) => (
          <div key={idx} className={`p-6 bg-[var(--color-cream)] border border-[var(--color-charcoal)] rounded-lg ${artist.isHeadliner ? 'border-l-4 border-[var(--color-orange)] md:col-span-2 lg:col-span-3 lg:w-2/3 mx-auto' : ''}`}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-[var(--color-orange)] font-bold text-sm uppercase">{artist.time}</span>
              <span className="bg-black/5 px-2 py-1 rounded text-xs font-bold uppercase">{artist.stage} Stage</span>
            </div>
            <h4 className={`font-heading font-black ${artist.isHeadliner ? 'text-4xl md:text-5xl mb-2' : 'text-2xl'}`}>
              {artist.name} {artist.isHeadliner && '⭐'}
            </h4>
          </div>
        ))}
      </div>
    </div>
  );
};
