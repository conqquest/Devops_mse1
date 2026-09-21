import { Router } from 'express';
import * as eventController from '../controllers/event.controller';

const router = Router();

router.get('/', eventController.getEvents);
router.get('/:id', eventController.getEvent);
router.get('/:id/lineup', eventController.getEventLineup);
router.get('/:id/tickets', eventController.getEventTickets);
router.get('/:id/gallery', eventController.getEventGallery);

export default router;
