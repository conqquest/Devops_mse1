import { events } from './events';
import { TicketType } from '../types';

export const tickets: TicketType[] = events.flatMap(event => event.ticketTypes);
