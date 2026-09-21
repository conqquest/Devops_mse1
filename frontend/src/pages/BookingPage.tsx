import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BookingSummary, LoadingState, Button } from '../components';
import { getBooking } from '../services/api';
import type { Booking } from '../types';

export default function BookingPage() {
  const { id } = useParams<{ id: string }>();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const b = await getBooking(id || '');
        setBooking(b);
      } catch (err) {
        // Mock data
        setBooking({
          id: id || 'DEMO-1234',
          eventId: '1',
          eventName: 'Summer Fest 2026',
          ticketType: 't1',
          ticketName: 'General Admission',
          quantity: 2,
          unitPrice: 4999,
          totalPrice: 9998,
          currency: '₹',
          customer: { name: 'Jane Doe', email: 'jane@example.com', phone: '1234567890' },
          status: 'confirmed',
          createdAt: new Date().toISOString(),
          venue: 'Central Park',
          city: 'Mumbai',
          eventDate: '2026-11-15T12:00:00Z'
        });
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
  }, [id]);

  if (loading) return <LoadingState fullPage />;
  if (!booking) return <div>Booking not found</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="text-center mb-12 animate-fade-in-up">
        <div className="inline-block bg-[var(--color-green)] text-white text-xl font-bold px-6 py-2 rounded-full mb-6">
          🎉 BOOKING CONFIRMED
        </div>
        <h1 className="text-4xl font-heading font-black mb-4">See you there!</h1>
        <p className="text-[var(--color-charcoal-light)]">Your tickets have been sent to {booking.customer.email}</p>
      </div>

      <div className="mb-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <BookingSummary booking={booking} />
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4 text-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
        <Button onClick={() => window.print()} variant="primary">DOWNLOAD TICKET</Button>
        <Button asChild variant="outline"><Link to="/events">Browse More Events</Link></Button>
      </div>
    </div>
  );
}
