import { events } from '../data/events';
import { gallery } from '../data/gallery';
import { Event, GalleryItem, LineupDay, TicketType } from '../types';

export const getAllEvents = (filters?: { search?: string; genre?: string; city?: string; sort?: string }): Event[] => {
  let filtered = [...events];
  
  if (filters?.search) {
    const s = filters.search.toLowerCase();
    filtered = filtered.filter(e => e.name.toLowerCase().includes(s) || e.venue.toLowerCase().includes(s) || e.city.toLowerCase().includes(s));
  }
  
  if (filters?.genre) {
    const g = filters.genre.toLowerCase();
    filtered = filtered.filter(e => e.genre.some(gen => gen.toLowerCase() === g));
  }
  
  if (filters?.city) {
    const c = filters.city.toLowerCase();
    filtered = filtered.filter(e => e.city.toLowerCase() === c);
  }
  
  if (filters?.sort) {
    if (filters.sort === 'date') {
      filtered.sort((a, b) => new Date(a.dates.start).getTime() - new Date(b.dates.start).getTime());
    } else if (filters.sort === 'price') {
      // Assuming minimum price for sorting
      filtered.sort((a, b) => {
        const minA = Math.min(...a.ticketTypes.map(t => t.price));
        const minB = Math.min(...b.ticketTypes.map(t => t.price));
        return minA - minB;
      });
    }
  }
  
  return filtered;
};

export const getEventById = (id: string): Event | undefined => {
  return events.find(e => e.id === id);
};

export const getEventLineup = (id: string): LineupDay[] | undefined => {
  return events.find(e => e.id === id)?.lineup;
};

export const getEventTickets = (id: string): TicketType[] | undefined => {
  return events.find(e => e.id === id)?.ticketTypes;
};

export const getEventGallery = (id: string): GalleryItem[] => {
  return gallery.filter(g => g.eventId === id);
};
