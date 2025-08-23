import { createContactControler, deleteContactControler, getAllContactsControler,getContatctByIdControler, patchContactController, upsertContactControler } from "../controllers/contacts.js";
import { validateBody } from "../middlewares/validateBody.js";
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { Router } from 'express';
import { createContactSchema, updateContactSchema } from "../validation/contacts.js";
import { isValidId } from "../middlewares/isValidId.js";
import { authenticate } from "../middlewares/authenticate.js";


const router = Router();


router.use(authenticate);
router.get('/', ctrlWrapper(getAllContactsControler));

router.get('/:contactId',isValidId, ctrlWrapper(getContatctByIdControler));

router.post('/contacts',validateBody(createContactSchema), ctrlWrapper(createContactControler));

router.delete('/:contactId',isValidId, ctrlWrapper(deleteContactControler));

router.put('/:contactId',isValidId,validateBody(createContactSchema), ctrlWrapper(upsertContactControler));

router.patch('/:contactId',isValidId, validateBody(updateContactSchema), ctrlWrapper(patchContactController));




export default router;



