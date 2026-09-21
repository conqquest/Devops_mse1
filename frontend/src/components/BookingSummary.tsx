import React from 'react';
import type { Booking } from '../types';

export const BookingSummary: React.FC<{ booking: Booking }> = ({ booking }) => {
  return (
    <div className="bg-white border-2 border-[var(--color-charcoal)] rounded-xl overflow-hidden shadow-[8px_8px_0_0_#1A1A1A]">
      <div className="bg-[var(--color-charcoal)] text-white p-6 text-center border-b-[4px] border-[var(--color-orange)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--color-orange)_0%,_transparent_70%)]"></div>
        <h2 className="relative z-10 text-2xl font-heading font-black tracking-widest">VIBEPASS TICKET</h2>
        <p className="relative z-10 text-sm text-white/60 font-mono mt-2">ID: {booking.id}</p>
      </div>
      
      <div className="p-8">
        <div className="mb-8">
          <h3 className="text-3xl font-heading font-bold mb-2 text-[var(--color-orange)]">{booking.eventName}</h3>
          <p className="text-lg font-medium text-[var(--color-charcoal-light)] mb-1">{booking.venue}, {booking.city}</p>
          <p className="text-sm font-bold bg-black/5 inline-block px-3 py-1 rounded">{new Date(booking.eventDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>

        <div className="border-y-2 border-dashed border-[var(--color-charcoal)]/20 py-6 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-[var(--color-charcoal-light)] font-bold uppercase tracking-wider mb-1">Ticket Type</p>
              <p className="font-bold">{booking.ticketName}</p>
            </div>
            <div>
              <p className="text-xs text-[var(--color-charcoal-light)] font-bold uppercase tracking-wider mb-1">Quantity</p>
              <p className="font-bold">{booking.quantity}</p>
            </div>
            <div>
              <p className="text-xs text-[var(--color-charcoal-light)] font-bold uppercase tracking-wider mb-1">Guest Name</p>
              <p className="font-bold">{booking.customer.name}</p>
            </div>
            <div>
              <p className="text-xs text-[var(--color-charcoal-light)] font-bold uppercase tracking-wider mb-1">Total Paid</p>
              <p className="font-bold text-[var(--color-orange)]">{booking.currency}{booking.totalPrice.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-[var(--color-charcoal-light)]">
            Status: <span className="font-bold text-[var(--color-green)]">{booking.status.toUpperCase()}</span>
          </div>
          <div className="w-24 h-24 bg-black/5 rounded-lg flex items-center justify-center border-2 border-[var(--color-charcoal)]">
            {/* Simple QR placeholder */}
            <div className="w-16 h-16 grid grid-cols-4 grid-rows-4 gap-1">
              {[...Array(16)].map((_, i) => (
                <div key={i} className={`bg-[var(--color-charcoal)] ${Math.random() > 0.5 ? 'opacity-100' : 'opacity-0'}`}></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
