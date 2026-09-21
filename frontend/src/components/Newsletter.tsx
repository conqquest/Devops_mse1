import React, { useState } from 'react';
import { Button } from './Button';
import { Send, CheckCircle } from 'lucide-react';

export const Newsletter: React.FC<{ inline?: boolean }> = ({ inline = false }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      // Mock API call or real if backend is up
      await new Promise(r => setTimeout(r, 1000)); 
      setStatus('success');
      setMessage('Welcome to the VibePass community!');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setMessage('Failed to subscribe. Please try again.');
    }
  };

  if (inline) {
    return (
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
        <input 
          type="email" 
          required 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address" 
          className="bg-white/5 border border-white/10 rounded px-4 py-2 text-[var(--color-cream)] placeholder:text-white/30 focus:outline-none focus:border-[var(--color-orange)] transition-colors"
        />
        <Button type="submit" variant="primary" size="sm" isLoading={status === 'loading'} className="w-full">
          {status === 'success' ? 'Subscribed!' : 'Subscribe'}
        </Button>
        {message && <p className={`text-xs ${status === 'success' ? 'text-[var(--color-green)]' : 'text-[var(--color-red)]'}`}>{message}</p>}
      </form>
    );
  }

  return (
    <div className="bg-[var(--color-charcoal)] text-[var(--color-cream)] py-20 px-4 border-y border-[var(--color-charcoal-light)]">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-heading font-black mb-4">Don't miss the next show.</h2>
        <p className="text-xl text-[var(--color-cream)]/70 mb-8 font-medium">Join our community for exclusive pre-sales and lineup drops.</p>
        
        {status === 'success' ? (
          <div className="flex flex-col items-center justify-center p-6 bg-[var(--color-green)]/20 rounded-lg border border-[var(--color-green)] animate-fade-in-up">
            <CheckCircle className="w-12 h-12 text-[var(--color-green)] mb-4" />
            <h3 className="text-2xl font-bold font-heading">{message}</h3>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row max-w-xl mx-auto gap-4">
            <input 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email" 
              className="flex-1 bg-white/5 border-2 border-white/10 rounded-lg px-6 py-4 text-lg text-[var(--color-cream)] placeholder:text-white/30 focus:outline-none focus:border-[var(--color-orange)] transition-colors"
            />
            <Button type="submit" variant="primary" size="lg" isLoading={status === 'loading'} icon={Send}>
              JOIN VIBEPASS
            </Button>
          </form>
        )}
        {status === 'error' && <p className="text-[var(--color-red)] mt-4">{message}</p>}
      </div>
    </div>
  );
};
