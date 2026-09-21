import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Badge, EventCard, LoadingState, ErrorState } from '../components';
import { getArtist, getArtistEvents } from '../services/api';
import { Camera, Video, MessageCircle } from 'lucide-react';
import type { Artist, Event } from '../types';

export default function ArtistDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [artist, setArtist] = useState<Artist | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const a = await getArtist(id || '1');
        const e = await getArtistEvents(id || '1');
        setArtist(a);
        setEvents(e);
      } catch (err) {
        setArtist({ id: '1', name: 'The Midnight', genre: 'Electronic', bio: 'The Midnight is an American synthwave band formed by Tyler Lyle and Tim McEwan.', image: '', socialLinks: { instagram: '#', youtube: '#' }, eventIds: ['1'] });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <LoadingState fullPage />;
  if (!artist) return <ErrorState is404 />;

  return (
    <div>
      <div className="relative h-[50vh] min-h-[300px] bg-gradient-to-r from-purple-900 to-indigo-900 flex items-end">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <Badge variant="genre" className="mb-4">{artist.genre}</Badge>
          <h1 className="text-5xl md:text-7xl font-heading font-black text-white mb-6">{artist.name}</h1>
          <div className="flex space-x-4">
            {artist.socialLinks?.instagram && <a href={artist.socialLinks.instagram} className="text-white hover:text-[var(--color-orange)] transition-colors"><Camera /></a>}
            {artist.socialLinks?.youtube && <a href={artist.socialLinks.youtube} className="text-white hover:text-[var(--color-orange)] transition-colors"><Video /></a>}
            {artist.socialLinks?.spotify && <a href={artist.socialLinks.spotify} className="text-white hover:text-[var(--color-orange)] transition-colors"><MessageCircle /></a>}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1">
          <h2 className="text-2xl font-heading font-bold mb-4">Biography</h2>
          <p className="text-lg text-[var(--color-charcoal-light)]">{artist.bio || 'No biography available.'}</p>
        </div>
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-heading font-bold mb-6">Upcoming Events</h2>
          {events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {events.map(event => <EventCard key={event.id} event={event} />)}
            </div>
          ) : (
            <div className="bg-[var(--color-cream-dark)] p-8 text-center rounded-lg border border-[var(--color-charcoal)]">
              <p className="text-[var(--color-charcoal-light)]">No upcoming events found for this artist.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
