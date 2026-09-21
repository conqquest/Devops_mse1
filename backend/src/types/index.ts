export interface Event {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  dates: { start: string; end: string }; // ISO date strings
  venue: string;
  city: string;
  genre: string[];
  featured: boolean;
  image: string; // path like '/images/events/evt-001.jpg'
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
  currency: string; // '₹'
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
  day: string; // 'FRIDAY', 'SATURDAY', 'SUNDAY'
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
  category: 'crowd' | 'performance' | 'stage' | 'atmosphere' | 'backstage';
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
  status: 'CONFIRMED' | 'PENDING' | 'CANCELLED';
  createdAt: string;
  venue: string;
  city: string;
  eventDate: string;
}

export interface BookingRequest {
  eventId: string;
  ticketType: string;
  quantity: number;
  customer: { name: string; email: string; phone: string };
}

export interface NewsletterSubscription {
  email: string;
  subscribedAt: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
}

export interface TerraformEnvironment {
  name: string;
  workspace: string;
  region: string;
  config: Record<string, any>;
}
