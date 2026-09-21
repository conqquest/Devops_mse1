import { Request, Response } from 'express';

export const healthCheck = (req: Request, res: Response) => {
  res.json({
    success: true,
    status: 'ok',
    service: 'vibepass-api',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
};
