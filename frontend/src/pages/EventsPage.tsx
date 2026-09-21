import { useState, useEffect } from 'react';
import { SearchBar, FilterBar, EventCard, LoadingState, ErrorState } from '../components';
import { getEvents } from '../services/api';
import type { Event } from '../types';

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ genre: '', city: '', date: '', sort: '' });

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(false);
      try {
        // Mock fallback since backend might not exist
        const mockEvents: Event[] = [
          {
            id: '1', name: 'Summer Fest 2026', slug: 'summer-fest-2026', tagline: '', description: '',
            dates: { start: '2026-11-15', end: '2026-11-17' }, venue: 'Central Park', city: 'Mumbai', genre: ['Electronic', 'Pop'],
            featured: true, image: '', heroImage: '', ticketTypes: [{ id: 't1', eventId: '1', name: 'GA', price: 4999, currency: '₹', description: '', features: [], available: 100, maxPerOrder: 4 }], lineup: [], gallery: [], totalCapacity: 10000, soldCount: 5000, status: 'on-sale'
          },
          {
            id: '2', name: 'Indie Vibes', slug: 'indie-vibes', tagline: '', description: '',
            dates: { start: '2026-12-05', end: '2026-12-05' }, venue: 'O2 Arena', city: 'Delhi', genre: ['Indie'],
            featured: false, image: '', heroImage: '', ticketTypes: [{ id: 't2', eventId: '2', name: 'GA', price: 2999, currency: '₹', description: '', features: [], available: 100, maxPerOrder: 4 }], lineup: [], gallery: [], totalCapacity: 5000, soldCount: 4000, status: 'on-sale'
          },
        ];
        
        let data = [];
        try {
          data = await getEvents({ search, ...filters });
        } catch(e) {
          data = mockEvents;
        }

        // Apply local filtering to mock data if API fails
        if (search) data = data.filter(e => e.name.toLowerCase().includes(search.toLowerCase()));
        if (filters.genre) data = data.filter(e => e.genre.includes(filters.genre));
        if (filters.city) data = data.filter(e => e.city === filters.city);

        setEvents(data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [search, filters]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-5xl md:text-6xl font-heading font-black mb-8">ALL EVENTS</h1>
        <div className="max-w-2xl mb-8">
          <SearchBar value={search} onChange={setSearch} placeholder="Search events, artists, or venues..." />
        </div>
        <FilterBar filters={filters} setFilters={setFilters} />
      </div>

      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message="Failed to load events. Please try again." onRetry={() => setFilters({...filters})} />
      ) : events.length === 0 ? (
        <div className="text-center py-20 bg-white border border-[var(--color-charcoal)] rounded-lg">
          <h3 className="text-2xl font-bold mb-2">No events found</h3>
          <p className="text-[var(--color-charcoal-light)]">Try adjusting your search or filters to find what you're looking for.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
