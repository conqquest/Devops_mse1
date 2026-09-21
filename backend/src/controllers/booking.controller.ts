import { Request, Response } from 'express';
import * as bookingService from '../services/booking.service';
import { BookingRequest } from '../types';

export const createBooking = (req: Request, res: Response) => {
  try {
    const bookingRequest: BookingRequest = req.body;
    const booking = bookingService.createBooking(bookingRequest);
    res.status(201).json({ success: true, data: booking });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getBooking = (req: Request, res: Response) => {
  try {
    const booking = bookingService.getBookingById(req.params.id);
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
    res.json({ success: true, data: booking });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
