import { useState, useEffect } from 'react';
import { ArtistCard, SearchBar, LoadingState, ErrorState } from '../components';
import { getArtists } from '../services/api';
import type { Artist } from '../types';

export default function ArtistsPage() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const data = await getArtists();
        setArtists(data);
      } catch (err) {
        // Mock data
        setArtists([
          { id: '1', name: 'The Midnight', genre: 'Electronic', bio: '', image: '', socialLinks: {}, eventIds: ['1'] },
          { id: '2', name: 'Aurora', genre: 'Pop', bio: '', image: '', socialLinks: {}, eventIds: ['1'] },
          { id: '3', name: 'Local Natives', genre: 'Indie', bio: '', image: '', socialLinks: {}, eventIds: ['2'] },
          { id: '4', name: 'Foo Fighters', genre: 'Rock', bio: '', image: '', socialLinks: {}, eventIds: ['3'] },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchArtists();
  }, []);

  const filteredArtists = artists.filter(a => a.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-5xl md:text-6xl font-heading font-black mb-8">ARTISTS</h1>
        <div className="max-w-2xl">
          <SearchBar value={search} onChange={setSearch} placeholder="Search artists..." />
        </div>
      </div>

      {loading ? <LoadingState /> : error ? <ErrorState /> : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredArtists.map(artist => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      )}
    </div>
  );
}
