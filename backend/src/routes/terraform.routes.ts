import { Router } from 'express';
import * as terraformController from '../controllers/terraform.controller';

const router = Router();

router.get('/environments', terraformController.getEnvironments);
router.get('/environments/:env/status', terraformController.getEnvironmentStatus);
router.post('/environments/:env/validate', terraformController.validate);
router.post('/environments/:env/plan', terraformController.plan);
router.post('/environments/:env/apply', terraformController.apply);
router.post('/environments/:env/test', terraformController.test);

export default router;
