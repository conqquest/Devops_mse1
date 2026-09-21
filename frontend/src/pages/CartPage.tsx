
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Button } from '../components';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-5xl font-heading font-black mb-12">YOUR CART</h1>

      {items.length === 0 ? (
        <div className="text-center py-20 bg-white border border-[var(--color-charcoal)] rounded-lg">
          <h3 className="text-2xl font-bold mb-4">Your cart is empty</h3>
          <Button asChild><Link to="/events">BROWSE EVENTS</Link></Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            {items.map(item => (
              <div key={item.ticketId} className="flex flex-col sm:flex-row gap-6 p-6 bg-white border border-[var(--color-charcoal)] rounded-lg">
                <div className="flex-1">
                  <h4 className="text-xl font-heading font-bold mb-1">{item.eventName}</h4>
                  <p className="text-[var(--color-charcoal-light)] mb-4">{item.ticketName}</p>
                  <div className="text-[var(--color-orange)] font-bold">{item.currency}{item.price.toLocaleString()}</div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex items-center border border-[var(--color-charcoal)] rounded-lg overflow-hidden h-10">
                    <button className="px-3 hover:bg-black/5 h-full transition-colors" onClick={() => updateQuantity(item.ticketId, item.quantity - 1)}><Minus className="w-4 h-4" /></button>
                    <span className="w-10 text-center font-bold">{item.quantity}</span>
                    <button className="px-3 hover:bg-black/5 h-full transition-colors" onClick={() => updateQuantity(item.ticketId, item.quantity + 1)}><Plus className="w-4 h-4" /></button>
                  </div>
                  <div className="font-bold w-24 text-right">{item.currency}{(item.price * item.quantity).toLocaleString()}</div>
                  <button onClick={() => removeItem(item.ticketId)} className="p-2 text-red-500 hover:bg-red-50 rounded"><Trash2 className="w-5 h-5" /></button>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-[var(--color-charcoal)] text-white p-6 rounded-lg sticky top-24">
              <h3 className="text-xl font-heading font-bold mb-6">ORDER SUMMARY</h3>
              <div className="space-y-4 mb-6 border-b border-white/20 pb-6">
                {items.map(item => (
                  <div key={item.ticketId} className="flex justify-between text-sm">
                    <span className="text-white/70">{item.quantity}x {item.ticketName}</span>
                    <span>{item.currency}{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center mb-8">
                <span className="font-bold">TOTAL</span>
                <span className="text-2xl font-heading font-black text-[var(--color-orange)]">
                  {items[0]?.currency || '₹'}{totalPrice.toLocaleString()}
                </span>
              </div>
              <Button asChild fullWidth icon={ArrowRight}>
                <Link to="/checkout">PROCEED TO CHECKOUT</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
