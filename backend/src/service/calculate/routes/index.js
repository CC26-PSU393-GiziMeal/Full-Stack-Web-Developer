import { Router } from 'express';
import { calculate } from '../controller/calculate-controller.js';

const router = Router();

router.post('/', calculate);

export default router;