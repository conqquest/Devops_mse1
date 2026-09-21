import { Booking, BookingRequest } from '../types';
import { getEventById } from './event.service';
import { generateBookingId } from '../utils/helpers';
import { validateEmail } from '../middleware/validateInput';

const bookings: Booking[] = [];

export const createBooking = (request: BookingRequest): Booking => {
  const event = getEventById(request.eventId);
  if (!event) throw new Error('Event not found');
  
  const ticket = event.ticketTypes.find(t => t.id === request.ticketType || t.name === request.ticketType);
  if (!ticket) throw new Error('Ticket type not found for this event');
  
  if (request.quantity <= 0 || request.quantity > ticket.maxPerOrder) {
    throw new Error(`Quantity must be between 1 and ${ticket.maxPerOrder}`);
  }
  
  if (!request.customer || !request.customer.name || !request.customer.email || !request.customer.phone) {
    throw new Error('Customer name, email, and phone are required');
  }
  
  if (!validateEmail(request.customer.email)) {
    throw new Error('Invalid email format');
  }

  const booking: Booking = {
    id: generateBookingId(),
    eventId: event.id,
    eventName: event.name,
    ticketType: ticket.id,
    ticketName: ticket.name,
    quantity: request.quantity,
    unitPrice: ticket.price,
    totalPrice: ticket.price * request.quantity,
    currency: ticket.currency,
    customer: request.customer,
    status: 'CONFIRMED',
    createdAt: new Date().toISOString(),
    venue: event.venue,
    city: event.city,
    eventDate: event.dates.start
  };
  
  bookings.push(booking);
  return booking;
};

export const getBookingById = (id: string): Booking | undefined => {
  return bookings.find(b => b.id === id);
};
