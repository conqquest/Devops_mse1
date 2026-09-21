

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-5xl md:text-6xl font-heading font-black mb-8 text-center text-[var(--color-orange)]">ABOUT VIBEPASS</h1>
      
      <div className="prose prose-lg mx-auto text-[var(--color-charcoal)]">
        <p className="text-2xl font-medium leading-relaxed text-center mb-16">
          VibePass is not just a ticketing platform; it's a gateway to unforgettable experiences. We curate the most vibrant music festivals and exclusive concerts worldwide.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 text-center border-y-2 border-[var(--color-charcoal)]/10 py-12">
          <div>
            <div className="text-4xl font-heading font-black text-[var(--color-orange)] mb-2">6</div>
            <div className="text-sm font-bold uppercase tracking-widest text-[var(--color-charcoal-light)]">Events</div>
          </div>
          <div>
            <div className="text-4xl font-heading font-black text-[var(--color-orange)] mb-2">18+</div>
            <div className="text-sm font-bold uppercase tracking-widest text-[var(--color-charcoal-light)]">Artists</div>
          </div>
          <div>
            <div className="text-4xl font-heading font-black text-[var(--color-orange)] mb-2">50k+</div>
            <div className="text-sm font-bold uppercase tracking-widest text-[var(--color-charcoal-light)]">Fans</div>
          </div>
          <div>
            <div className="text-4xl font-heading font-black text-[var(--color-orange)] mb-2">5</div>
            <div className="text-sm font-bold uppercase tracking-widest text-[var(--color-charcoal-light)]">Cities</div>
          </div>
        </div>

        <h2 className="text-3xl font-heading font-bold mb-6">Our Mission</h2>
        <p className="mb-8">
          We believe that live music has the power to connect people in ways nothing else can. Our mission is to make accessing these experiences as seamless and joyful as the events themselves.
        </p>

        <div className="bg-[var(--color-charcoal)] text-[var(--color-cream)] p-8 rounded-lg mt-12">
          <h2 className="text-2xl font-heading font-bold mb-4 text-[var(--color-orange)]">Contact Us</h2>
          <p>Have questions or want to partner with us? Reach out at:</p>
          <p className="font-mono mt-4 text-lg">hello@vibepass.demo</p>
        </div>
      </div>
    </div>
  );
}
