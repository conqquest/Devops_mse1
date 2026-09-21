import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar } from 'lucide-react';
import type { Event } from '../types';
import { Badge } from './Badge';

export const EventCard: React.FC<{ event: Event }> = ({ event }) => {
  const genreGradients: Record<string, string> = {
    Rock: 'bg-gradient-to-br from-red-600 to-orange-500',
    Electronic: 'bg-gradient-to-br from-purple-600 to-blue-500',
    Indie: 'bg-gradient-to-br from-emerald-500 to-teal-700',
    'Hip-Hop': 'bg-gradient-to-br from-gray-800 to-black',
    Reggae: 'bg-gradient-to-br from-green-500 to-yellow-500',
    Techno: 'bg-gradient-to-br from-indigo-900 to-purple-900',
    Pop: 'bg-gradient-to-br from-pink-500 to-rose-400',
  };

  const defaultGradient = 'bg-gradient-to-br from-gray-700 to-gray-900';
  const mainGenre = event.genre[0] || 'Pop';
  const bgGradient = genreGradients[mainGenre] || defaultGradient;

  const minPrice = event.ticketTypes?.length > 0 
    ? Math.min(...event.ticketTypes.map(t => t.price)) 
    : 0;

  return (
    <Link to={`/events/${event.id}`} className="group block h-full">
      <div className="h-full flex flex-col bg-[var(--color-cream)] border border-[var(--color-charcoal)] rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[8px_8px_0_0_#1A1A1A]">
        <div className={`relative h-48 w-full ${bgGradient}`}>
          {event.image ? (
             <img src={event.image} alt={event.name} className="w-full h-full object-cover mix-blend-overlay opacity-80" />
          ) : (
             <div className="w-full h-full opacity-50 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8cGF0aCBkPSJNMCAwTDggOFpNOCAwTDAgOFoiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIvPjwvc3ZnPg==')]"></div>
          )}
          <div className="absolute top-4 left-4">
            <Badge variant="genre">{mainGenre}</Badge>
          </div>
          <div className="absolute top-4 right-4">
            <Badge variant={event.status === 'on-sale' ? 'status-on-sale' : event.status === 'upcoming' ? 'status-upcoming' : 'status-sold-out'}>
              {event.status.replace('-', ' ')}
            </Badge>
          </div>
        </div>
        <div className="p-5 flex-1 flex flex-col">
          <h3 className="text-xl font-heading font-bold mb-2 group-hover:text-[var(--color-orange)] transition-colors">{event.name}</h3>
          <div className="space-y-2 mb-4 flex-1">
            <div className="flex items-center text-sm text-[var(--color-charcoal-light)]">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{new Date(event.dates.start).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(event.dates.end).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <div className="flex items-center text-sm text-[var(--color-charcoal-light)]">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{event.city}</span>
            </div>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-[var(--color-charcoal)]/10">
            <span className="font-bold">
              {minPrice > 0 ? `From ${event.ticketTypes[0]?.currency || '₹'}${minPrice.toLocaleString()}` : 'Free / TBD'}
            </span>
            <span className="text-[var(--color-orange)] font-bold text-sm uppercase tracking-wide flex items-center">
              View Event <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
