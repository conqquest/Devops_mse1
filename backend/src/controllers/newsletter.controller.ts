import { Request, Response } from 'express';
import * as newsletterService from '../services/newsletter.service';

export const subscribe = (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: 'Email is required' });
    
    newsletterService.subscribe(email);
    res.json({ success: true, message: 'Successfully subscribed to newsletter' });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};
