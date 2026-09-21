import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Header, Footer } from './components';

// Lazy load pages for better performance
const HomePage = React.lazy(() => import('./pages/HomePage'));
const EventsPage = React.lazy(() => import('./pages/EventsPage'));
const EventDetailPage = React.lazy(() => import('./pages/EventDetailPage'));
const ArtistsPage = React.lazy(() => import('./pages/ArtistsPage'));
const ArtistDetailPage = React.lazy(() => import('./pages/ArtistDetailPage'));
const TicketsPage = React.lazy(() => import('./pages/TicketsPage'));
const CartPage = React.lazy(() => import('./pages/CartPage'));
const CheckoutPage = React.lazy(() => import('./pages/CheckoutPage'));
const BookingPage = React.lazy(() => import('./pages/BookingPage'));
const GalleryPage = React.lazy(() => import('./pages/GalleryPage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const InfrastructurePage = React.lazy(() => import('./pages/InfrastructurePage'));

import { LoadingState } from './components';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <React.Suspense fallback={<LoadingState fullPage />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/events" element={<EventsPage />} />
                <Route path="/events/:id" element={<EventDetailPage />} />
                <Route path="/artists" element={<ArtistsPage />} />
                <Route path="/artists/:id" element={<ArtistDetailPage />} />
                <Route path="/tickets" element={<TicketsPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/booking/:id" element={<BookingPage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/admin/infrastructure" element={<InfrastructurePage />} />
              </Routes>
            </React.Suspense>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
