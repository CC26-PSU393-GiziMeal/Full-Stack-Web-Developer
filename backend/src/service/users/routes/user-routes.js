import { Router } from 'express';
import { register, login, simpanKalkulator, getKalkulator, getProfileData, changePassword, updateAccount, updateBiometrikData } from '../controller/user-controller.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/kalkulator', simpanKalkulator);
router.get('/kalkulator/:userId', getKalkulator);
router.get('/profile/:userId', getProfileData);
router.post('/changePassword', changePassword);
router.put('/account/:userId', updateAccount);
router.put('/biometrik/:userId', updateBiometrikData);
export default router;