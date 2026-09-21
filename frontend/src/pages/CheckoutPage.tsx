import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Button } from '../components';
import { createBooking } from '../services/api';

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [error, setError] = useState('');

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Process first item as a demo booking
      const item = items[0];
      let bookingId = 'DEMO-' + Math.random().toString(36).substr(2, 9).toUpperCase();

      try {
        const result = await createBooking({
          eventId: item.eventId,
          ticketType: item.ticketId,
          quantity: item.quantity,
          customer: formData
        });
        bookingId = result.id;
      } catch (err) {
        console.log("Mock booking created");
      }

      clearCart();
      navigate(`/booking/${bookingId}`);
    } catch (err) {
      setError('Failed to process booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-5xl font-heading font-black mb-12">CHECKOUT</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <div className="bg-white border border-[var(--color-charcoal)] rounded-lg p-8">
            <h2 className="text-2xl font-heading font-bold mb-6 border-b border-[var(--color-charcoal)]/10 pb-4">Guest Details</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold mb-2">Full Name</label>
                <input 
                  type="text" 
                  required 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 border border-[var(--color-charcoal)] rounded focus:outline-none focus:border-[var(--color-orange)]"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Email Address</label>
                <input 
                  type="email" 
                  required 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 border border-[var(--color-charcoal)] rounded focus:outline-none focus:border-[var(--color-orange)]"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  required 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-4 py-3 border border-[var(--color-charcoal)] rounded focus:outline-none focus:border-[var(--color-orange)]"
                />
              </div>

              {error && <div className="text-[var(--color-red)] text-sm font-bold">{error}</div>}

              <div className="bg-[var(--color-cream-dark)] p-4 rounded text-sm text-[var(--color-charcoal-light)]">
                <span className="font-bold text-[var(--color-charcoal)]">Note:</span> This is a prototype. No real payment will be processed.
              </div>

              <Button type="submit" fullWidth size="lg" isLoading={loading}>
                CONFIRM DEMO BOOKING
              </Button>
            </form>
          </div>
        </div>

        <div>
          <div className="bg-[var(--color-charcoal)] text-white p-8 rounded-lg sticky top-24">
            <h2 className="text-2xl font-heading font-bold mb-6">ORDER SUMMARY</h2>
            <div className="space-y-6 mb-8 border-b border-white/20 pb-8">
              {items.map(item => (
                <div key={item.ticketId}>
                  <div className="flex justify-between font-bold mb-1">
                    <span>{item.eventName}</span>
                    <span>{item.currency}{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                  <div className="text-white/60 text-sm">{item.quantity}x {item.ticketName}</div>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center text-xl">
              <span className="font-bold">TOTAL DUE</span>
              <span className="font-heading font-black text-3xl text-[var(--color-orange)]">
                {items[0]?.currency || '₹'}{totalPrice.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
