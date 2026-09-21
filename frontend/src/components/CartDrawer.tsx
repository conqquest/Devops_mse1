import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, X, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from './Button';

export const CartDrawer: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { items, updateQuantity, removeItem, totalPrice } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="absolute inset-y-0 right-0 w-full max-w-md bg-[var(--color-cream)] shadow-2xl flex flex-col animate-slide-in-right border-l border-[var(--color-charcoal)]">
        <div className="flex justify-between items-center p-6 border-b border-[var(--color-charcoal)]/10">
          <h2 className="text-2xl font-heading font-black">YOUR CART</h2>
          <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 mb-6 opacity-20">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
              </div>
              <h3 className="text-xl font-heading font-bold mb-2">Your cart is empty</h3>
              <p className="text-[var(--color-charcoal-light)] mb-8">Looks like you haven't added any tickets yet.</p>
              <Button asChild onClick={onClose}>
                <Link to="/events">BROWSE EVENTS</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.ticketId} className="flex gap-4 p-4 border border-[var(--color-charcoal)]/20 rounded-lg bg-white">
                  <div className="flex-1">
                    <h4 className="font-heading font-bold text-lg mb-1 leading-tight">{item.eventName}</h4>
                    <p className="text-sm text-[var(--color-charcoal-light)] mb-3">{item.ticketName}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-[var(--color-charcoal)]/30 rounded h-8">
                        <button 
                          className="px-2 hover:bg-black/5 h-full transition-colors"
                          onClick={() => updateQuantity(item.ticketId, item.quantity - 1)}
                        ><Minus className="w-3 h-3" /></button>
                        <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                        <button 
                          className="px-2 hover:bg-black/5 h-full transition-colors"
                          onClick={() => updateQuantity(item.ticketId, item.quantity + 1)}
                        ><Plus className="w-3 h-3" /></button>
                      </div>
                      <span className="font-bold text-[var(--color-orange)]">
                        {item.currency}{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeItem(item.ticketId)}
                    className="self-start p-2 text-red-500 hover:bg-red-50 rounded transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-[var(--color-charcoal)]/10 bg-white">
            <div className="flex justify-between items-center mb-6">
              <span className="font-bold text-[var(--color-charcoal-light)]">Subtotal</span>
              <span className="text-2xl font-heading font-black">
                {items[0]?.currency || '₹'}{totalPrice.toLocaleString()}
              </span>
            </div>
            <Link to="/checkout" onClick={onClose} className="block">
              <Button fullWidth icon={ArrowRight}>
                PROCEED TO CHECKOUT
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
