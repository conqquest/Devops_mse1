import { Request, Response } from 'express';
import * as artistService from '../services/artist.service';

export const getArtists = (req: Request, res: Response) => {
  try {
    const artists = artistService.getAllArtists();
    res.json({ success: true, data: artists });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getArtist = (req: Request, res: Response) => {
  try {
    const artist = artistService.getArtistById(req.params.id);
    if (!artist) return res.status(404).json({ success: false, message: 'Artist not found' });
    res.json({ success: true, data: artist });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getArtistEvents = (req: Request, res: Response) => {
  try {
    const artist = artistService.getArtistById(req.params.id);
    if (!artist) return res.status(404).json({ success: false, message: 'Artist not found' });
    
    const events = artistService.getArtistEvents(req.params.id);
    res.json({ success: true, data: events });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
