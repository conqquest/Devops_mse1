import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { totalItems } = useCart();

  const navLinks = [
    { name: 'Events', path: '/events' },
    { name: 'Artists', path: '/artists' },
    { name: 'Experience', path: '/#experience' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'About', path: '/about' },
  ];

  const isActive = (path: string) => location.pathname === path || (path.includes('#') && location.hash === path.split('#')[1]);

  return (
    <header className="sticky top-0 z-40 bg-[var(--color-cream)] border-b border-[var(--color-charcoal)]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center text-3xl font-heading font-black tracking-tighter">
            Vibe<span className="text-[var(--color-orange)]">Pass</span>
          </Link>

          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-semibold tracking-wide uppercase transition-colors hover:text-[var(--color-orange)] relative group ${isActive(link.path) ? 'text-[var(--color-orange)]' : 'text-[var(--color-charcoal)]'}`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-[var(--color-orange)] transition-all ${isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-black/5 rounded-full transition-colors hidden md:block">
              <Search className="w-5 h-5" />
            </button>
            <Link to="/cart" className="p-2 hover:bg-black/5 rounded-full transition-colors relative">
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-[var(--color-orange)] rounded-full -translate-y-1 translate-x-1">
                  {totalItems}
                </span>
              )}
            </Link>
            <button className="md:hidden p-2 hover:bg-black/5 rounded-full" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[var(--color-cream)] flex flex-col pt-20 px-6">
          <button className="absolute top-6 right-6 p-2" onClick={() => setIsMobileMenuOpen(false)}>
            <X className="w-8 h-8" />
          </button>
          <nav className="flex flex-col space-y-6 mt-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-4xl font-heading font-bold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
