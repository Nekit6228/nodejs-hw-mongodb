import { createContactController, deleteContactController, getAllContactsContaroler,getContatctByIdContaroler, patchContactController, upsertContactController } from "../controllers/contacts.js";
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { Router } from 'express';


const router = Router();

router.get('/contacts', ctrlWrapper(getAllContactsContaroler));
router.get('/contacts/:contactId', ctrlWrapper(getContatctByIdContaroler));
router.post('/contacts', ctrlWrapper(createContactController));
router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));
router.put('/contacts/:contactId', ctrlWrapper(upsertContactController));
router.patch('/contacts/:contactId', ctrlWrapper(patchContactController));



export default router;


