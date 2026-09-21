import { artists } from '../data/artists';
import { events } from '../data/events';
import { Artist, Event } from '../types';

export const getAllArtists = (): Artist[] => {
  return artists;
};

export const getArtistById = (id: string): Artist | undefined => {
  return artists.find(a => a.id === id);
};

export const getArtistEvents = (id: string): Event[] => {
  const artist = getArtistById(id);
  if (!artist) return [];
  return events.filter(e => artist.eventIds.includes(e.id));
};
