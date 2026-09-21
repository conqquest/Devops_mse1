export interface Event {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  dates: { start: string; end: string };
  venue: string;
  city: string;
  genre: string[];
  featured: boolean;
  image: string;
  heroImage: string;
  ticketTypes: TicketType[];
  lineup: LineupDay[];
  gallery: GalleryItem[];
  totalCapacity: number;
  soldCount: number;
  status: 'upcoming' | 'on-sale' | 'sold-out';
}

export interface TicketType {
  id: string;
  eventId: string;
  name: string;
  price: number;
  currency: string;
  description: string;
  features: string[];
  available: number;
  maxPerOrder: number;
}

export interface Artist {
  id: string;
  name: string;
  genre: string;
  bio: string;
  image: string;
  socialLinks: { instagram?: string; spotify?: string; youtube?: string };
  eventIds: string[];
}

export interface LineupDay {
  day: string;
  date: string;
  artists: LineupArtist[];
}

export interface LineupArtist {
  artistId: string;
  name: string;
  stage: string;
  time: string;
  isHeadliner: boolean;
}

export interface GalleryItem {
  id: string;
  eventId: string;
  image: string;
  caption: string;
  category: string;
}

export interface Booking {
  id: string;
  eventId: string;
  eventName: string;
  ticketType: string;
  ticketName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  currency: string;
  customer: { name: string; email: string; phone: string };
  status: string;
  createdAt: string;
  venue: string;
  city: string;
  eventDate: string;
}

export interface CartItem {
  ticketId: string;
  eventId: string;
  eventName: string;
  ticketName: string;
  price: number;
  currency: string;
  quantity: number;
  maxPerOrder: number;
}

export interface BookingRequest {
  eventId: string;
  ticketType: string;
  quantity: number;
  customer: { name: string; email: string; phone: string };
}
