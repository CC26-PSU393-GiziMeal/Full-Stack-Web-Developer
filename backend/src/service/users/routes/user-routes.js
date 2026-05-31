import { Router } from 'express';
import { register, login, simpanKalkulator, getKalkulator, getProfileData, changePassword } from '../controller/user-controller.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/kalkulator', simpanKalkulator);
router.get('/kalkulator/:userId', getKalkulator);
router.get('/profile/:userId', getProfileData);
router.post('/changePassword', changePassword);
export default router;