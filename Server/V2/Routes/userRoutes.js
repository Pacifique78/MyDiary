import express from 'express';
import UserClass from '../Controllers/UserControllers';
import { checkNewUser } from '../../middleware/checkNewUser';
import { checkLoginUser } from '../../middleware/checkLoginUser';
import { checkToken } from '../../middleware/checkToken';

const router = express.Router();
const newclass = new UserClass();
router.post('/api/v2/auth/signup', checkNewUser, newclass.createUser);
router.post('/api/v2/auth/signin', checkLoginUser, newclass.login);
router.patch('/api/v2/auth/reminder', checkToken, newclass.setNotification);
export default router;
