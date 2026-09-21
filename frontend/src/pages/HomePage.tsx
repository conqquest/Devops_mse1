import { useState } from 'react';
import { Link } from 'react-router-dom';
import { EventCard, ArtistCard, Countdown, Modal, Newsletter, Button } from '../components';
import { Play } from 'lucide-react';
import type { Event, Artist } from '../types';

export default function HomePage() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Mock data
  const mockEvents: Event[] = [
    {
      id: '1', name: 'Summer Fest 2026', slug: 'summer-fest-2026', tagline: 'The hottest festival of the year', description: '',
      dates: { start: '2026-11-15', end: '2026-11-17' }, venue: 'Central Park', city: 'Mumbai', genre: ['Electronic', 'Pop'],
      featured: true, image: '', heroImage: '', ticketTypes: [{ id: 't1', eventId: '1', name: 'GA', price: 4999, currency: '₹', description: '', features: [], available: 100, maxPerOrder: 4 }], lineup: [], gallery: [], totalCapacity: 10000, soldCount: 5000, status: 'on-sale'
    },
    {
      id: '2', name: 'Indie Vibes', slug: 'indie-vibes', tagline: 'Chill out with the best indie artists', description: '',
      dates: { start: '2026-12-05', end: '2026-12-05' }, venue: 'O2 Arena', city: 'Delhi', genre: ['Indie'],
      featured: false, image: '', heroImage: '', ticketTypes: [{ id: 't2', eventId: '2', name: 'GA', price: 2999, currency: '₹', description: '', features: [], available: 100, maxPerOrder: 4 }], lineup: [], gallery: [], totalCapacity: 5000, soldCount: 4000, status: 'on-sale'
    },
    {
      id: '3', name: 'Rock the City', slug: 'rock-the-city', tagline: 'A night of headbanging', description: '',
      dates: { start: '2027-01-20', end: '2027-01-20' }, venue: 'JLN Stadium', city: 'Bengaluru', genre: ['Rock'],
      featured: false, image: '', heroImage: '', ticketTypes: [{ id: 't3', eventId: '3', name: 'GA', price: 1999, currency: '₹', description: '', features: [], available: 0, maxPerOrder: 4 }], lineup: [], gallery: [], totalCapacity: 20000, soldCount: 20000, status: 'sold-out'
    }
  ];

  const mockArtists: Artist[] = [
    { id: '1', name: 'The Midnight', genre: 'Electronic', bio: '', image: '', socialLinks: {}, eventIds: ['1'] },
    { id: '2', name: 'Aurora', genre: 'Pop', bio: '', image: '', socialLinks: {}, eventIds: ['1'] },
    { id: '3', name: 'Local Natives', genre: 'Indie', bio: '', image: '', socialLinks: {}, eventIds: ['2'] },
    { id: '4', name: 'Foo Fighters', genre: 'Rock', bio: '', image: '', socialLinks: {}, eventIds: ['3'] },
    { id: '5', name: 'Odesza', genre: 'Electronic', bio: '', image: '', socialLinks: {}, eventIds: ['1'] },
    { id: '6', name: 'Tame Impala', genre: 'Indie', bio: '', image: '', socialLinks: {}, eventIds: ['2'] }
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-gradient-to-br from-orange-400 via-red-500 to-purple-600 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8cGF0aCBkPSJNMCAwTDggOFpNOCAwTDAgOFoiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIvPjwvc3ZnPg==')] opacity-30" />
        
        <div className="relative z-10 max-w-5xl mx-auto animate-fade-in-up">
          <h1 className="text-6xl md:text-8xl font-heading font-black tracking-tighter mb-4 leading-none">
            VIBEPASS<br/>SUMMER FEST
          </h1>
          <p className="text-xl md:text-3xl font-medium mb-8 text-white/90">The ultimate music experience of 2026</p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 text-lg font-bold bg-black/30 backdrop-blur-md p-4 rounded-xl border border-white/20 inline-flex mx-auto">
            <span>Nov 15-17, 2026</span>
            <span className="hidden sm:inline text-[var(--color-orange-light)]">•</span>
            <span>Mumbai, India</span>
            <span className="hidden sm:inline text-[var(--color-orange-light)]">•</span>
            <span>Tickets from ₹4,999</span>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Button asChild size="lg" className="text-lg">
              <Link to="/events/1">GET TICKETS</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg text-white border-white hover:bg-white hover:text-black" onClick={() => setIsVideoModalOpen(true)}>
              EXPLORE EVENT
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-4xl md:text-5xl font-heading font-black">UPCOMING EVENTS</h2>
          <Link to="/events" className="hidden md:flex items-center text-[var(--color-orange)] font-bold hover:underline">
            View All Events →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockEvents.map(event => <EventCard key={event.id} event={event} />)}
        </div>
        <Link to="/events" className="md:hidden mt-8 block text-center text-[var(--color-orange)] font-bold py-3 border-2 border-[var(--color-orange)] rounded-lg">
          View All Events
        </Link>
      </section>

      {/* Countdown */}
      <Countdown targetDate="2026-11-15T12:00:00" />

      {/* Lineup Preview */}
      <section className="py-24 bg-[var(--color-cream-dark)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-black mb-12">SUMMER FEST LINEUP</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {mockArtists.map(artist => <ArtistCard key={artist.id} artist={artist} />)}
          </div>
          <div className="mt-12">
            <Button asChild variant="outline">
              <Link to="/events/1">SEE FULL LINEUP</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-heading font-black mb-12 text-center">FEEL THE EXPERIENCE</h2>
        <div 
          className="relative rounded-2xl overflow-hidden aspect-video cursor-pointer group bg-gradient-to-br from-gray-800 to-black border border-[var(--color-charcoal)]"
          onClick={() => setIsVideoModalOpen(true)}
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540039155732-684735009ffc?q=80&w=2574&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 bg-[var(--color-orange)] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-[0_0_40px_rgba(232,101,43,0.6)]">
              <Play className="w-10 h-10 text-white ml-2" />
            </div>
          </div>
        </div>
      </section>

      <Newsletter />

      <Modal isOpen={isVideoModalOpen} onClose={() => setIsVideoModalOpen(false)} title="Experience Preview">
        <div className="p-4 text-center">
          <div className="aspect-video bg-black rounded-lg flex items-center justify-center mb-4">
            <p className="text-white">Demo video coming soon for the Summer Festival experience.</p>
          </div>
          <Button onClick={() => setIsVideoModalOpen(false)}>Close</Button>
        </div>
      </Modal>
    </div>
  );
}
