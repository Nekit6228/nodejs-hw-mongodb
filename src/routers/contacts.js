import { createContactController, deleteContactController, getAllContactsContaroler,getContatctByIdContaroler, patchContactController, upsertContactController } from "../controllers/contacts.js";
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { Router } from 'express';


const router = Router();

router.get('/', ctrlWrapper(getAllContactsContaroler));
router.get('/:contactId', ctrlWrapper(getContatctByIdContaroler));
router.post('/', ctrlWrapper(createContactController));
router.delete('/:contactId', ctrlWrapper(deleteContactController));
router.put('/:contactId', ctrlWrapper(upsertContactController));
router.patch('/:contactId', ctrlWrapper(patchContactController));



export default router;


