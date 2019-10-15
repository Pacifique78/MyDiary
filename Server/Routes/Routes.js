import newclass from '../Controllers/UserControllers';
import express from 'express';
import {checkNewUser} from '../middleware/checkNewUser';
import {checkLoginUser} from '../middleware/checkLoginUser';
import { checkToken } from '../middleware/checkToken';
import { checkNewEntry } from '../middleware/checkNewEntry';

const router = express.Router();
router.post('/api/v1/auth/signup', checkNewUser, newclass.createUser);
router.post('/api/v1/auth/signin', checkLoginUser, newclass.login);
router.post('/api/v1/entries', checkToken, checkNewEntry, newclass.createEntry);
export default router;
