import newclass from '../Controllers/UserControllers';
import express from 'express';
import {checkNewUser} from '../middleware/checkNewUser';

const router = express.Router();
router.post('/api/v1/auth/signup', checkNewUser, newclass.createUser);
export default router;
