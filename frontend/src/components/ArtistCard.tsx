import React from 'react';
import { Link } from 'react-router-dom';
import type { Artist } from '../types';
import { Badge } from './Badge';

export const ArtistCard: React.FC<{ artist: Artist }> = ({ artist }) => {
  const genreGradients: Record<string, string> = {
    Rock: 'from-red-600 to-orange-500',
    Electronic: 'from-purple-600 to-blue-500',
    Indie: 'from-emerald-500 to-teal-700',
    'Hip-Hop': 'from-gray-800 to-black',
    Reggae: 'from-green-500 to-yellow-500',
    Pop: 'from-pink-500 to-rose-400',
  };
  const bg = genreGradients[artist.genre] || 'from-gray-700 to-gray-900';

  return (
    <Link to={`/artists/${artist.id}`} className="group relative block aspect-square overflow-hidden rounded-lg border border-[var(--color-charcoal)]">
      <div className={`absolute inset-0 bg-gradient-to-br ${bg}`}>
        {artist.image ? (
           <img src={artist.image} alt={artist.name} className="w-full h-full object-cover mix-blend-overlay opacity-70 group-hover:scale-105 transition-transform duration-500" />
        ) : (
           <div className="w-full h-full opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8cGF0aCBkPSJNMCAwTDggOFpNOCAwTDAgOFoiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIvPjwvc3ZnPg==')] group-hover:scale-105 transition-transform duration-500"></div>
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-5 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform">
        <Badge variant="genre" className="mb-2 bg-[var(--color-orange)]/90 backdrop-blur-sm border-none">{artist.genre}</Badge>
        <h3 className="text-2xl font-heading font-bold text-white mb-1">{artist.name}</h3>
      </div>
    </Link>
  );
};
