import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Calendar, Users, Info } from 'lucide-react';
import { Badge, Button, Lineup, TicketCard, Gallery, Countdown, LoadingState, ErrorState } from '../components';
import { getEvent, getEventLineup, getEventTickets, getEventGallery } from '../services/api';
import type { Event, LineupDay, TicketType, GalleryItem } from '../types';

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [lineup, setLineup] = useState<LineupDay[]>([]);
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'lineup' | 'tickets' | 'gallery'>('tickets');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Mock data
        const mockEvent: Event = {
          id: id || '1', name: 'Summer Fest 2026', slug: 'summer-fest-2026', tagline: 'The hottest festival of the year', 
          description: 'Join us for an unforgettable weekend of music, art, and community. Summer Fest brings together the biggest names in electronic and pop music across three stages.',
          dates: { start: '2026-11-15T12:00:00Z', end: '2026-11-17T23:59:59Z' }, venue: 'Central Park', city: 'Mumbai', genre: ['Electronic', 'Pop'],
          featured: true, image: '', heroImage: '', ticketTypes: [], lineup: [], gallery: [], totalCapacity: 10000, soldCount: 5000, status: 'on-sale'
        };
        const mockTickets: TicketType[] = [
          { id: 't1', eventId: id || '1', name: 'General Admission', price: 4999, currency: '₹', description: 'Access to all GA areas and stages.', features: ['3-Day Access', 'Food Village Access'], available: 100, maxPerOrder: 4 },
          { id: 't2', eventId: id || '1', name: 'VIP Experience', price: 12999, currency: '₹', description: 'Premium viewing areas and exclusive perks.', features: ['Dedicated Entrance', 'VIP Lounges', 'Premium Restrooms'], available: 20, maxPerOrder: 2 }
        ];

        try {
          const fetchedEvent = await getEvent(id || '1');
          setEvent(fetchedEvent);
          setTickets(await getEventTickets(id || '1'));
          setLineup(await getEventLineup(id || '1'));
          setGallery(await getEventGallery(id || '1'));
        } catch {
          setEvent(mockEvent);
          setTickets(mockTickets);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchData();
  }, [id]);

  if (loading) return <LoadingState fullPage />;
  if (error || !event) return <ErrorState is404 />;

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'lineup', label: 'Lineup' },
    { id: 'tickets', label: 'Tickets' },
    { id: 'gallery', label: 'Gallery' },
  ] as const;

  return (
    <div className="pb-24">
      {/* Hero */}
      <div className="relative h-[60vh] min-h-[400px] bg-gradient-to-br from-purple-900 to-orange-800 flex items-end">
        <div className="absolute inset-0 bg-black/40" />
        {event.heroImage && <img src={event.heroImage} alt={event.name} className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60" />}
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="flex flex-wrap gap-2 mb-4">
            {event.genre.map(g => <Badge key={g} variant="genre">{g}</Badge>)}
            <Badge variant={event.status === 'on-sale' ? 'status-on-sale' : 'status-sold-out'}>{event.status}</Badge>
          </div>
          <h1 className="text-5xl md:text-7xl font-heading font-black text-white mb-2">{event.name}</h1>
          <p className="text-xl md:text-2xl text-white/90 font-medium mb-6">{event.tagline}</p>
          
          <div className="flex flex-wrap gap-6 text-white">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-[var(--color-orange)]" />
              <span className="font-bold">{new Date(event.dates.start).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-[var(--color-orange)]" />
              <span className="font-bold">{event.venue}, {event.city}</span>
            </div>
          </div>
        </div>
      </div>

      <Countdown targetDate={event.dates.start} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Navigation Tabs */}
        <div className="flex space-x-8 border-b border-[var(--color-charcoal)]/20 mb-12 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 text-lg font-heading font-bold uppercase tracking-wider whitespace-nowrap transition-colors relative ${
                activeTab === tab.id ? 'text-[var(--color-orange)]' : 'text-[var(--color-charcoal-light)] hover:text-[var(--color-charcoal)]'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && <span className="absolute bottom-0 left-0 w-full h-1 bg-[var(--color-orange)]" />}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px]">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-heading font-bold mb-6">About the Event</h2>
                <div className="prose prose-lg text-[var(--color-charcoal)]">
                  <p>{event.description}</p>
                </div>
              </div>
              <div>
                <div className="bg-[var(--color-cream-dark)] p-6 rounded-lg border border-[var(--color-charcoal)]">
                  <h3 className="font-heading font-bold text-xl mb-4 flex items-center"><Info className="mr-2" /> Key Info</h3>
                  <ul className="space-y-4">
                    <li>
                      <span className="block text-sm text-[var(--color-charcoal-light)]">Venue Capacity</span>
                      <span className="font-bold flex items-center"><Users className="w-4 h-4 mr-2" /> {event.totalCapacity.toLocaleString()}</span>
                    </li>
                    <li>
                      <span className="block text-sm text-[var(--color-charcoal-light)]">Age Restriction</span>
                      <span className="font-bold">18+</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'lineup' && <Lineup lineup={lineup} />}

          {activeTab === 'tickets' && (
            <div className="max-w-3xl mx-auto space-y-6">
              {tickets.map(ticket => (
                <TicketCard key={ticket.id} ticket={ticket} eventId={event.id} eventName={event.name} />
              ))}
            </div>
          )}

          {activeTab === 'gallery' && <Gallery items={gallery} />}
        </div>
      </div>

      {/* Mobile Sticky Buy Button */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-[var(--color-cream)] border-t border-[var(--color-charcoal)]/10 z-30">
        <Button fullWidth onClick={() => setActiveTab('tickets')}>BUY TICKETS</Button>
      </div>
    </div>
  );
}
