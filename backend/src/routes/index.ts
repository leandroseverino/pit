import { Router } from 'express';
import controller from '../controllers/links';

const router = Router();

router.post('/links', controller.post);
router.get('/links/:code', controller.get);
router.get('/links/:code/stats', controller.hit);

export default router;