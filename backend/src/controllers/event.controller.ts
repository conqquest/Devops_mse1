import { Request, Response } from 'express';
import * as eventService from '../services/event.service';

export const getEvents = (req: Request, res: Response) => {
  try {
    const { search, genre, city, sort } = req.query;
    const events = eventService.getAllEvents({
      search: search as string,
      genre: genre as string,
      city: city as string,
      sort: sort as string
    });
    res.json({ success: true, data: events });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getEvent = (req: Request, res: Response) => {
  try {
    const event = eventService.getEventById(req.params.id);
    if (!event) return res.status(404).json({ success: false, message: 'Event not found' });
    res.json({ success: true, data: event });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getEventLineup = (req: Request, res: Response) => {
  try {
    const lineup = eventService.getEventLineup(req.params.id);
    if (!lineup) return res.status(404).json({ success: false, message: 'Event not found' });
    res.json({ success: true, data: lineup });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getEventTickets = (req: Request, res: Response) => {
  try {
    const tickets = eventService.getEventTickets(req.params.id);
    if (!tickets) return res.status(404).json({ success: false, message: 'Event not found' });
    res.json({ success: true, data: tickets });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getEventGallery = (req: Request, res: Response) => {
  try {
    const event = eventService.getEventById(req.params.id);
    if (!event) return res.status(404).json({ success: false, message: 'Event not found' });
    
    const gallery = eventService.getEventGallery(req.params.id);
    res.json({ success: true, data: gallery });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
