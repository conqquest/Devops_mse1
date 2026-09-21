import React from 'react';
import { X, Filter } from 'lucide-react';

interface FilterBarProps {
  filters: { genre: string; city: string; date: string; sort: string };
  setFilters: React.Dispatch<React.SetStateAction<{ genre: string; city: string; date: string; sort: string }>>;
}

export const FilterBar: React.FC<FilterBarProps> = ({ filters, setFilters }) => {
  const genres = ['Rock', 'Hip-Hop', 'Electronic', 'Indie', 'Pop', 'Reggae', 'Alternative'];
  const cities = ['Delhi', 'Mumbai', 'Bengaluru', 'Hyderabad', 'Pune'];
  const dates = ['This Week', 'This Month', 'Upcoming'];
  const sorts = ['Date', 'Price', 'Popularity'];

  const handleClear = () => setFilters({ genre: '', city: '', date: '', sort: '' });

  const activeCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="bg-[var(--color-cream)] border border-[var(--color-charcoal)] rounded-lg p-4 mb-8 shadow-sm">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="flex items-center text-[var(--color-charcoal)] font-bold mr-4">
          <Filter className="w-5 h-5 mr-2" />
          Filters
        </div>
        
        <div className="flex-1 flex flex-wrap gap-3 w-full">
          <select 
            value={filters.genre} 
            onChange={(e) => setFilters({ ...filters, genre: e.target.value })}
            className="px-4 py-2 border border-[var(--color-charcoal)] rounded-full bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[var(--color-orange)]"
          >
            <option value="">All Genres</option>
            {genres.map(g => <option key={g} value={g}>{g}</option>)}
          </select>

          <select 
            value={filters.city} 
            onChange={(e) => setFilters({ ...filters, city: e.target.value })}
            className="px-4 py-2 border border-[var(--color-charcoal)] rounded-full bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[var(--color-orange)]"
          >
            <option value="">All Cities</option>
            {cities.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          <select 
            value={filters.date} 
            onChange={(e) => setFilters({ ...filters, date: e.target.value })}
            className="px-4 py-2 border border-[var(--color-charcoal)] rounded-full bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[var(--color-orange)]"
          >
            <option value="">Any Date</option>
            {dates.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          
          <select 
            value={filters.sort} 
            onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
            className="px-4 py-2 border border-[var(--color-charcoal)] rounded-full bg-[var(--color-charcoal)] text-white text-sm font-medium ml-auto focus:outline-none"
          >
            <option value="">Sort By</option>
            {sorts.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {activeCount > 0 && (
          <button 
            onClick={handleClear}
            className="text-sm font-bold text-[var(--color-red)] hover:underline flex items-center whitespace-nowrap"
          >
            <X className="w-4 h-4 mr-1" /> Clear All
          </button>
        )}
      </div>

      {activeCount > 0 && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-[var(--color-charcoal)]/10">
          {Object.entries(filters).map(([k, v]) => v && (
            <div key={k} className="flex items-center bg-[var(--color-orange)] text-white px-3 py-1 rounded-full text-xs font-bold">
              <span className="capitalize mr-1 opacity-80">{k}:</span> {v}
              <button onClick={() => setFilters({ ...filters, [k]: '' })} className="ml-2 hover:text-[var(--color-charcoal)]"><X className="w-3 h-3" /></button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
