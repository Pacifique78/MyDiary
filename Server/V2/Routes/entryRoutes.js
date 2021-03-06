import express from 'express';
import EntryClass from '../Controllers/entryController';
import { checkToken } from '../../middleware/checkToken';
import { checkNewEntry } from '../../middleware/checkNewEntry';
import { validateEntryParams } from '../../middleware/checkParams';

const eClass = new EntryClass();
const router = express.Router();
router.post('/api/v2/entries', [checkToken, checkNewEntry], eClass.createEntry);
router.patch('/api/v2/entries/:entryId', [checkToken, checkNewEntry, validateEntryParams], eClass.modifyEntry);
router.delete('/api/v2/entries/:entryId', [checkToken, validateEntryParams], eClass.deleteEntry);
router.get('/api/v2/entries', checkToken, eClass.getEntries);
router.get('/api/v2/entries/:entryId', [checkToken, validateEntryParams], eClass.getSpecificEntry);
export default router;
