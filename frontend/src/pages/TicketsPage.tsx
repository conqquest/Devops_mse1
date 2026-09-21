import { useState, useEffect } from 'react';
import { TicketCard, LoadingState } from '../components';
import { getEvents } from '../services/api';
import type { Event } from '../types';

export default function TicketsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data.filter(e => e.ticketTypes && e.ticketTypes.length > 0));
      } catch (err) {
        setEvents([
           {
            id: '1', name: 'Summer Fest 2026', slug: 'summer-fest-2026', tagline: '', description: '',
            dates: { start: '2026-11-15', end: '2026-11-17' }, venue: 'Central Park', city: 'Mumbai', genre: ['Electronic', 'Pop'],
            featured: true, image: '', heroImage: '', ticketTypes: [{ id: 't1', eventId: '1', name: 'GA', price: 4999, currency: '₹', description: 'General Access', features: [], available: 100, maxPerOrder: 4 }], lineup: [], gallery: [], totalCapacity: 10000, soldCount: 5000, status: 'on-sale'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-5xl font-heading font-black mb-12">TICKETS</h1>
      
      {loading ? <LoadingState /> : (
        <div className="space-y-16">
          {events.map(event => (
            <div key={event.id}>
              <h2 className="text-3xl font-heading font-bold mb-6 text-[var(--color-orange)] border-b-2 border-[var(--color-charcoal)]/10 pb-4">{event.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {event.ticketTypes.map(ticket => (
                  <TicketCard key={ticket.id} ticket={ticket} eventId={event.id} eventName={event.name} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
