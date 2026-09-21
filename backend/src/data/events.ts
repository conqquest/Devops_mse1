import { Event } from '../types';

export const events: Event[] = [
  {
    id: 'evt-001',
    name: 'VibePass Summer Festival',
    slug: 'vibepass-summer-festival',
    tagline: 'Music. People. One unforgettable weekend.',
    description: 'The flagship summer festival bringing together the best acts in rock, alternative, and indie music. Experience three days of non-stop energy, art installations, and culinary delights in the heart of Delhi.',
    dates: { start: '2026-11-15T12:00:00Z', end: '2026-11-17T23:59:59Z' },
    venue: 'JLN Stadium Grounds',
    city: 'Delhi',
    genre: ['Rock', 'Alternative', 'Indie'],
    featured: true,
    image: '/images/events/evt-001.jpg',
    heroImage: '/images/events/evt-001.jpg',
    ticketTypes: [
      { id: 'tkt-001-1', eventId: 'evt-001', name: 'General Admission', price: 2499, currency: '₹', description: 'Access to all stages and public areas', features: ['All stages', 'Food court access'], available: 5000, maxPerOrder: 10 },
      { id: 'tkt-001-2', eventId: 'evt-001', name: 'VIP Pass', price: 5999, currency: '₹', description: 'Premium viewing and exclusive bar', features: ['VIP viewing area', 'Exclusive bar', 'Fast-track entry'], available: 1000, maxPerOrder: 6 },
      { id: 'tkt-001-3', eventId: 'evt-001', name: '3-Day Pass', price: 6999, currency: '₹', description: 'Full weekend access', features: ['All days GA access'], available: 2000, maxPerOrder: 10 },
      { id: 'tkt-001-4', eventId: 'evt-001', name: 'Premium Pass', price: 9999, currency: '₹', description: 'All inclusive luxury experience', features: ['Backstage lounge', 'Complimentary drinks'], available: 200, maxPerOrder: 4 },
    ],
    lineup: [
      {
        day: 'FRIDAY', date: '2026-11-15', artists: [
          { artistId: 'art-002', name: 'The Cosmic Drift', stage: 'Main Stage', time: '20:00', isHeadliner: true },
          { artistId: 'art-005', name: 'The Frequency Band', stage: 'Main Stage', time: '18:00', isHeadliner: false },
          { artistId: 'art-013', name: 'The Paper Kites', stage: 'Indie Stage', time: '19:30', isHeadliner: true },
          { artistId: 'art-017', name: 'Kabir Café', stage: 'Indie Stage', time: '17:00', isHeadliner: false },
        ]
      },
      {
        day: 'SATURDAY', date: '2026-11-16', artists: [
          { artistId: 'art-011', name: 'Echo Chamber', stage: 'Main Stage', time: '21:00', isHeadliner: true },
          { artistId: 'art-010', name: 'Midnight Ragas', stage: 'Main Stage', time: '19:00', isHeadliner: false },
          { artistId: 'art-016', name: 'The Lightyears', stage: 'Indie Stage', time: '20:30', isHeadliner: true },
          { artistId: 'art-001', name: 'Priya Sharma', stage: 'Indie Stage', time: '18:30', isHeadliner: false },
        ]
      },
      {
        day: 'SUNDAY', date: '2026-11-17', artists: [
          { artistId: 'art-006', name: 'Zara Khan', stage: 'Main Stage', time: '20:00', isHeadliner: true },
          { artistId: 'art-014', name: 'Ananya Birla', stage: 'Main Stage', time: '18:00', isHeadliner: false },
          { artistId: 'art-009', name: 'Soulfire Collective', stage: 'Indie Stage', time: '19:00', isHeadliner: true },
        ]
      }
    ],
    gallery: [
      { id: 'gal-001', eventId: 'evt-001', image: '/images/gallery/gallery-001.jpg', caption: 'Crowd going wild', category: 'crowd' },
      { id: 'gal-002', eventId: 'evt-001', image: '/images/gallery/gallery-002.jpg', caption: 'Main stage lights', category: 'stage' }
    ],
    totalCapacity: 15000,
    soldCount: 8200,
    status: 'on-sale'
  },
  {
    id: 'evt-002',
    name: 'Neon Nights',
    slug: 'neon-nights',
    tagline: 'Ring in the new year under neon lights.',
    description: 'The ultimate New Year’s Eve electronic dance music event.',
    dates: { start: '2026-12-31T18:00:00Z', end: '2027-01-01T03:00:00Z' },
    venue: 'Jio World Garden',
    city: 'Mumbai',
    genre: ['Electronic', 'EDM'],
    featured: true,
    image: '/images/events/evt-002.jpg',
    heroImage: '/images/events/evt-002.jpg',
    ticketTypes: [
      { id: 'tkt-002-1', eventId: 'evt-002', name: 'General Admission', price: 1999, currency: '₹', description: 'NYE party access', features: ['Main floor access'], available: 3000, maxPerOrder: 10 },
      { id: 'tkt-002-2', eventId: 'evt-002', name: 'VIP', price: 4999, currency: '₹', description: 'VIP tables and drinks', features: ['VIP section', '2 Drink coupons'], available: 500, maxPerOrder: 6 },
      { id: 'tkt-002-3', eventId: 'evt-002', name: 'Premium', price: 7999, currency: '₹', description: 'All inclusive luxury', features: ['Unlimited drinks', 'Buffet'], available: 100, maxPerOrder: 4 }
    ],
    lineup: [
      {
        day: 'THURSDAY', date: '2026-12-31', artists: [
          { artistId: 'art-003', name: 'DJ Nebula', stage: 'Neon Stage', time: '23:30', isHeadliner: true },
          { artistId: 'art-007', name: 'Bass Karma', stage: 'Neon Stage', time: '22:00', isHeadliner: false },
        ]
      }
    ],
    gallery: [],
    totalCapacity: 5000,
    soldCount: 4500,
    status: 'on-sale'
  },
  {
    id: 'evt-003',
    name: 'Indie Valley Live',
    slug: 'indie-valley-live',
    tagline: 'Where indie hearts come alive.',
    description: 'A serene evening of folk and indie music.',
    dates: { start: '2027-01-25T16:00:00Z', end: '2027-01-25T23:00:00Z' },
    venue: 'Jayamahal Palace Grounds',
    city: 'Bengaluru',
    genre: ['Indie', 'Folk', 'Alternative'],
    featured: false,
    image: '/images/events/evt-003.jpg',
    heroImage: '/images/events/evt-003.jpg',
    ticketTypes: [
      { id: 'tkt-003-1', eventId: 'evt-003', name: 'General Admission', price: 1499, currency: '₹', description: 'Lawn access', features: ['Lawn access'], available: 2000, maxPerOrder: 10 },
      { id: 'tkt-003-2', eventId: 'evt-003', name: 'VIP', price: 3999, currency: '₹', description: 'Seated viewing', features: ['Reserved seating'], available: 300, maxPerOrder: 6 },
      { id: 'tkt-003-3', eventId: 'evt-003', name: 'Premium', price: 5999, currency: '₹', description: 'Meet & Greet', features: ['Meet & Greet', 'Dinner'], available: 50, maxPerOrder: 2 }
    ],
    lineup: [
      {
        day: 'MONDAY', date: '2027-01-25', artists: [
          { artistId: 'art-010', name: 'Midnight Ragas', stage: 'Valley Stage', time: '20:00', isHeadliner: true },
          { artistId: 'art-001', name: 'Priya Sharma', stage: 'Valley Stage', time: '18:00', isHeadliner: false },
        ]
      }
    ],
    gallery: [],
    totalCapacity: 3000,
    soldCount: 1200,
    status: 'on-sale'
  },
  {
    id: 'evt-004',
    name: 'Echoes Music Festival',
    slug: 'echoes-music-festival',
    tagline: 'Feel the bass. Feel the echo.',
    description: 'A massive 2-day hip-hop and electronic showcase.',
    dates: { start: '2027-02-14T14:00:00Z', end: '2027-02-15T23:59:59Z' },
    venue: 'Shilpakala Vedika',
    city: 'Hyderabad',
    genre: ['Hip-Hop', 'Electronic'],
    featured: true,
    image: '/images/events/evt-004.jpg',
    heroImage: '/images/events/evt-004.jpg',
    ticketTypes: [
      { id: 'tkt-004-1', eventId: 'evt-004', name: 'General Admission', price: 1999, currency: '₹', description: '1 Day access', features: ['GA access'], available: 4000, maxPerOrder: 10 },
      { id: 'tkt-004-2', eventId: 'evt-004', name: 'VIP', price: 4499, currency: '₹', description: '1 Day VIP', features: ['VIP Lounge'], available: 500, maxPerOrder: 6 },
      { id: 'tkt-004-3', eventId: 'evt-004', name: '3-Day Pass', price: 5999, currency: '₹', description: 'Full access (Actually 2-day pass)', features: ['Both days GA'], available: 1000, maxPerOrder: 10 },
      { id: 'tkt-004-4', eventId: 'evt-004', name: 'Premium Pass', price: 8499, currency: '₹', description: 'Both days VIP', features: ['Both days VIP'], available: 200, maxPerOrder: 4 }
    ],
    lineup: [
      {
        day: 'SUNDAY', date: '2027-02-14', artists: [
          { artistId: 'art-004', name: 'Arjun Malik', stage: 'Bass Stage', time: '21:00', isHeadliner: true }
        ]
      }
    ],
    gallery: [],
    totalCapacity: 8000,
    soldCount: 3500,
    status: 'on-sale'
  },
  {
    id: 'evt-005',
    name: 'Sunset Sessions',
    slug: 'sunset-sessions',
    tagline: 'Chase the sunset. Catch the vibe.',
    description: 'Relaxed vibes and world music by the sunset.',
    dates: { start: '2027-03-08T15:00:00Z', end: '2027-03-08T22:00:00Z' },
    venue: 'Amanora Park Town',
    city: 'Pune',
    genre: ['Reggae', 'Pop', 'World'],
    featured: false,
    image: '/images/events/evt-005.jpg',
    heroImage: '/images/events/evt-005.jpg',
    ticketTypes: [
      { id: 'tkt-005-1', eventId: 'evt-005', name: 'General Admission', price: 1299, currency: '₹', description: 'Entry', features: ['Entry'], available: 2000, maxPerOrder: 10 },
      { id: 'tkt-005-2', eventId: 'evt-005', name: 'VIP', price: 3499, currency: '₹', description: 'VIP', features: ['VIP seating'], available: 300, maxPerOrder: 6 },
      { id: 'tkt-005-3', eventId: 'evt-005', name: 'Premium', price: 4999, currency: '₹', description: 'Premium', features: ['Cabana'], available: 50, maxPerOrder: 4 }
    ],
    lineup: [
      {
        day: 'MONDAY', date: '2027-03-08', artists: [
          { artistId: 'art-009', name: 'Soulfire Collective', stage: 'Sunset Stage', time: '18:00', isHeadliner: true }
        ]
      }
    ],
    gallery: [],
    totalCapacity: 4000,
    soldCount: 1500,
    status: 'on-sale'
  },
  {
    id: 'evt-006',
    name: 'Underground Frequencies',
    slug: 'underground-frequencies',
    tagline: 'Go deeper. Go underground.',
    description: 'An intimate techno and experimental night.',
    dates: { start: '2027-04-12T22:00:00Z', end: '2027-04-13T04:00:00Z' },
    venue: 'Hauz Khas Social',
    city: 'Delhi',
    genre: ['Techno', 'Electronic', 'Experimental'],
    featured: false,
    image: '/images/events/evt-006.jpg',
    heroImage: '/images/events/evt-006.jpg',
    ticketTypes: [
      { id: 'tkt-006-1', eventId: 'evt-006', name: 'General Admission', price: 999, currency: '₹', description: 'Entry', features: ['Entry'], available: 500, maxPerOrder: 6 },
      { id: 'tkt-006-2', eventId: 'evt-006', name: 'VIP', price: 2999, currency: '₹', description: 'VIP', features: ['Table service'], available: 50, maxPerOrder: 4 },
      { id: 'tkt-006-3', eventId: 'evt-006', name: 'Premium', price: 4499, currency: '₹', description: 'Premium', features: ['Booth'], available: 10, maxPerOrder: 2 }
    ],
    lineup: [
      {
        day: 'MONDAY', date: '2027-04-12', artists: [
          { artistId: 'art-012', name: 'Vikram Soundsystem', stage: 'Basement', time: '01:00', isHeadliner: true },
          { artistId: 'art-018', name: 'Neon Prophet', stage: 'Basement', time: '23:00', isHeadliner: false }
        ]
      }
    ],
    gallery: [],
    totalCapacity: 600,
    soldCount: 50,
    status: 'upcoming'
  }
];
