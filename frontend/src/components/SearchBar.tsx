import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, placeholder = 'Search...' }) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localValue !== value) {
        onChange(localValue);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [localValue, onChange, value]);

  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-[var(--color-charcoal-light)]" />
      </div>
      <input
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        className="block w-full pl-11 pr-10 py-3 bg-[var(--color-cream)] border border-[var(--color-charcoal)] rounded-lg font-medium text-[var(--color-charcoal)] placeholder:text-[var(--color-charcoal-light)]/60 focus:outline-none focus:ring-2 focus:ring-[var(--color-orange)] focus:border-transparent transition-all shadow-sm"
        placeholder={placeholder}
      />
      {localValue && (
        <button
          onClick={() => setLocalValue('')}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
        >
          <X className="h-5 w-5 text-[var(--color-charcoal-light)] hover:text-[var(--color-orange)] transition-colors" />
        </button>
      )}
    </div>
  );
};
