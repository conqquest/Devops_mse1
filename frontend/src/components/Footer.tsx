import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Video, MessageCircle } from 'lucide-react';
import { Newsletter } from './Newsletter';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[var(--color-charcoal)] text-[var(--color-cream)] pt-20 pb-8 border-b-8 border-[var(--color-orange)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <Link to="/" className="text-3xl font-heading font-black tracking-tighter mb-6 block">
              Vibe<span className="text-[var(--color-orange)]">Pass</span>
            </Link>
            <p className="text-[var(--color-cream)]/70 mb-6 max-w-sm">
              The premier destination for discovering and booking the most vibrant music festivals and exclusive concerts worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-[var(--color-orange)] transition-colors"><Camera className="w-5 h-5" /></a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-[var(--color-orange)] transition-colors"><Video className="w-5 h-5" /></a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-[var(--color-orange)] transition-colors"><MessageCircle className="w-5 h-5" /></a>
            </div>
          </div>
          
          <div>
            <h4 className="font-heading font-bold text-lg mb-4 uppercase tracking-widest">Explore</h4>
            <ul className="space-y-3 text-[var(--color-cream)]/70">
              <li><Link to="/events" className="hover:text-[var(--color-orange)] transition-colors">All Events</Link></li>
              <li><Link to="/artists" className="hover:text-[var(--color-orange)] transition-colors">Artists Directory</Link></li>
              <li><Link to="/gallery" className="hover:text-[var(--color-orange)] transition-colors">Experience Gallery</Link></li>
              <li><Link to="/about" className="hover:text-[var(--color-orange)] transition-colors">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-lg mb-4 uppercase tracking-widest">Company</h4>
            <ul className="space-y-3 text-[var(--color-cream)]/70">
              <li><a href="#" className="hover:text-[var(--color-orange)] transition-colors">Contact Support</a></li>
              <li><a href="#" className="hover:text-[var(--color-orange)] transition-colors">Partner With Us</a></li>
              <li><a href="#" className="hover:text-[var(--color-orange)] transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-[var(--color-orange)] transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-lg mb-4 uppercase tracking-widest">Newsletter</h4>
            <Newsletter inline />
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-white/50">
          <p>© 2026 VibePass. All rights reserved. | PROTOTYPE</p>
          <Link to="/admin/infrastructure" className="mt-4 md:mt-0 hover:text-[var(--color-orange)]">Admin Dashboard</Link>
        </div>
      </div>
    </footer>
  );
};
