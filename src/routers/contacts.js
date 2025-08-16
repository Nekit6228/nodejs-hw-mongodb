import { createContactControler, deleteContactControler, getAllContactsControler,getContatctByIdControler, patchContactControler, upsertContactControler } from "../controllers/contacts.js";
import { validateBody } from "../middlewares/validateBody.js";
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { Router } from 'express';
import { createContactSchema, updateContactSchema } from "../validation/contacts.js";
import { isValidId } from "../middlewares/isValidId.js";


const router = Router();

router.get('/contacts', ctrlWrapper(getAllContactsControler));

router.get('/contacts/:contactId',isValidId, ctrlWrapper(getContatctByIdControler));

router.post('/contacts',validateBody(createContactSchema), ctrlWrapper(createContactControler));

router.delete('/contacts/:contactId',isValidId, ctrlWrapper(deleteContactControler));

router.put('/contacts/:contactId',isValidId,validateBody(createContactSchema), ctrlWrapper(upsertContactControler));

router.patch('/contacts/:contactId',isValidId, validateBody(updateContactSchema), ctrlWrapper(patchContactControler));



export default router;



