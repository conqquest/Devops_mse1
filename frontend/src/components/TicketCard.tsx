import React, { useState } from 'react';
import { Check, Plus, Minus } from 'lucide-react';
import { Button } from './Button';
import type { TicketType } from '../types';
import { useCart } from '../context/CartContext';

interface TicketCardProps {
  ticket: TicketType;
  eventId: string;
  eventName: string;
}

export const TicketCard: React.FC<TicketCardProps> = ({ ticket, eventId, eventName }) => {
  const [quantity, setQuantity] = useState(1);
  const { addItem, getCartItem, updateQuantity } = useCart();
  
  const cartItem = getCartItem(ticket.id);
  const isSoldOut = ticket.available <= 0;

  const handleAdd = () => {
    if (cartItem) {
      updateQuantity(ticket.id, cartItem.quantity + quantity);
    } else {
      addItem({
        ticketId: ticket.id,
        eventId,
        eventName,
        ticketName: ticket.name,
        price: ticket.price,
        currency: ticket.currency,
        maxPerOrder: ticket.maxPerOrder,
      });
    }
  };

  return (
    <div className={`flex flex-col bg-[var(--color-cream)] border border-[var(--color-charcoal)] rounded-lg overflow-hidden border-l-[6px] ${isSoldOut ? 'border-l-[var(--color-charcoal)] opacity-75' : 'border-l-[var(--color-orange)]'}`}>
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-heading font-bold">{ticket.name}</h3>
          <span className="text-2xl font-heading font-black text-[var(--color-orange)]">
            {ticket.currency}{ticket.price.toLocaleString()}
          </span>
        </div>
        <p className="text-[var(--color-charcoal-light)] mb-6 flex-1">{ticket.description}</p>
        
        <ul className="space-y-2 mb-6">
          {ticket.features.map((feature, i) => (
            <li key={i} className="flex items-start">
              <Check className="w-5 h-5 text-[var(--color-green)] mr-2 shrink-0" />
              <span className="text-sm font-medium">{feature}</span>
            </li>
          ))}
        </ul>

        {isSoldOut ? (
          <div className="bg-red-100 text-[var(--color-red)] text-center py-3 rounded-lg font-bold">SOLD OUT</div>
        ) : (
          <div className="space-y-4 pt-4 border-t border-[var(--color-charcoal)]/10">
            <div className="flex justify-between items-center text-sm font-medium">
              <span>Available: {ticket.available}</span>
              <span>Max: {ticket.maxPerOrder}</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center border border-[var(--color-charcoal)] rounded-lg overflow-hidden h-12">
                <button 
                  className="px-3 hover:bg-black/5 h-full transition-colors"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                ><Minus className="w-4 h-4" /></button>
                <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                <button 
                  className="px-3 hover:bg-black/5 h-full transition-colors"
                  onClick={() => setQuantity(Math.min(ticket.maxPerOrder, quantity + 1))}
                ><Plus className="w-4 h-4" /></button>
              </div>
              <Button fullWidth onClick={handleAdd} className="h-12">ADD TO CART</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
