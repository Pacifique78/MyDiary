import express from 'express';
import newclass from '../Controllers/UserControllers';
import { checkNewUser } from '../middleware/checkNewUser';

const router = express.Router();
router.post('/api/v2/auth/signup', checkNewUser, newclass.createUser);
export default router;
