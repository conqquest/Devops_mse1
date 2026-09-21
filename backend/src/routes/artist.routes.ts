import { Router } from 'express';
import * as artistController from '../controllers/artist.controller';

const router = Router();

router.get('/', artistController.getArtists);
router.get('/:id', artistController.getArtist);
router.get('/:id/events', artistController.getArtistEvents);

export default router;
