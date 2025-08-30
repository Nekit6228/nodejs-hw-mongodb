import { createContactControler, deleteContactControler, getAllContactsControler,getContatctByIdControler, patchContactController, upsertContactControler } from "../controllers/contacts.js";
import { validateBody } from "../middlewares/validateBody.js";
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { Router } from 'express';
import { createContactSchema, updateContactSchema } from "../validation/contacts.js";
import { isValidId } from "../middlewares/isValidId.js";
import { authenticate } from "../middlewares/authenticate.js";
import { upload } from "../middlewares/multer.js";


const router = Router();


router.use(authenticate);

router.get('/', ctrlWrapper(getAllContactsControler));

router.get('/:contactId',isValidId, ctrlWrapper(getContatctByIdControler));

router.post('/',upload.single('photo'),validateBody(createContactSchema), ctrlWrapper(createContactControler));

router.delete('/:contactId',isValidId, ctrlWrapper(deleteContactControler));

router.put('/:contactId',upload.single('photo'),isValidId,validateBody(createContactSchema), ctrlWrapper(upsertContactControler));

router.patch('/:contactId',upload.single('photo'),isValidId, validateBody(updateContactSchema), ctrlWrapper(patchContactController));




export default router;



