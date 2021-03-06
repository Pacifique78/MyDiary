import express from 'express';
import EntryClass from '../Controllers/entryController';
import { checkToken } from '../../middleware/checkTokenV1';
import { checkNewEntry } from '../../middleware/checkNewEntry';
import { validateEntryParams } from '../../middleware/checkParams';

const router = express.Router();
const eClass = new EntryClass();
router.post('/api/v1/entries', [checkToken, checkNewEntry], eClass.createEntry);
router.patch('/api/v1/entries/:entryId', [checkToken, checkNewEntry, validateEntryParams], eClass.modifyEntry);
router.delete('/api/v1/entries/:entryId', [checkToken, validateEntryParams], eClass.deleteEntry);
router.get('/api/v1/entries', checkToken, eClass.getEntries);
router.get('/api/v1/entries/:entryId', [checkToken, validateEntryParams], eClass.getSpecificEntry);
export default router;
