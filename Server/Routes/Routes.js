import express from 'express';
import newclass from '../Controllers/UserControllers';
import { checkNewUser } from '../middleware/checkNewUser';
import { checkLoginUser } from '../middleware/checkLoginUser';
import { checkToken } from '../middleware/checkToken';
import { checkNewEntry } from '../middleware/checkNewEntry';
import { validateEntryParams } from '../middleware/checkParams';

const router = express.Router();
router.post('/api/v1/auth/signup', checkNewUser, newclass.createUser);
router.post('/api/v1/auth/signin', checkLoginUser, newclass.login);
router.post('/api/v1/entries', [checkToken, checkNewEntry], newclass.createEntry);
router.patch('/api/v1/entries/:entryId', [checkToken, checkNewEntry, validateEntryParams], newclass.modifyEntry);
router.delete('/api/v1/entries/:entryId', [checkToken, validateEntryParams], newclass.deleteEntry);
router.get('/api/v1/entries', checkToken, newclass.getEntries);
router.get('/api/v1/entries/:entryId', [checkToken, validateEntryParams], newclass.getSpecificEntry);
export default router;
