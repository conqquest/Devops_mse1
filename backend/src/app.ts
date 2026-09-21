import express from 'express';
import cors from 'cors';
import { requestLogger } from './middleware/requestLogger';
import { errorHandler } from './middleware/errorHandler';

import eventRoutes from './routes/event.routes';
import artistRoutes from './routes/artist.routes';
import bookingRoutes from './routes/booking.routes';
import newsletterRoutes from './routes/newsletter.routes';
import healthRoutes from './routes/health.routes';
import terraformRoutes from './routes/terraform.routes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// Routes
app.use('/api/health', healthRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/artists', artistRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/terraform', terraformRoutes);

// Error Handler
app.use(errorHandler);

export default app;
