import express from 'express';
import UserClass from '../Controllers/UserControllers';
import { checkNewUser } from '../../middleware/checkNewUser';
import { checkLoginUser } from '../../middleware/checkLoginUser';

const router = express.Router();
const newclass = new UserClass();
router.post('/api/v2/auth/signup', checkNewUser, newclass.createUser);
router.post('/api/v2/auth/signin', checkLoginUser, newclass.login);
export default router;
