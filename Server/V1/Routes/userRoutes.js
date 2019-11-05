import express from 'express';
import UsersClass from '../Controllers/UserControllers';
import { checkNewUser } from '../middleware/checkNewUser';
import { checkLoginUser } from '../middleware/checkLoginUser';

const router = express.Router();
const newclass = new UsersClass();
router.post('/api/v1/auth/signup', checkNewUser, newclass.createUser);
router.post('/api/v1/auth/signin', checkLoginUser, newclass.login);
export default router;
