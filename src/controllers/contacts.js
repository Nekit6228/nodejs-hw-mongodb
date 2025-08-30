import { getContactById, getAllContacts, createContact, deleteContact, updateContact } from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { getEnvVar } from '../utils/getEnvVar.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';


export const getAllContactsControler = async (req,res,next)=>{
   const { page, perPage } = parsePaginationParams(req.query);
   const { sortBy, sortOrder } = parseSortParams(req.query);
   const filter = parseFilterParams(req.query);
   filter.userId = req.user._id;


try {
const  contacts = await getAllContacts({
  userId: req.user._id,
  page,
  perPage,
  sortBy,
  sortOrder,
  filter,
});

    res.json({
        status:200,
        massage:'Successfully found contacts!',
        data: contacts,
    });
} catch (err) {
 next(err);
}


};

export const getContatctByIdControler = async (req,res,next
) =>{
    const {contactId} = req.params;
      const userId = req.user._id;
    const contact = await getContactById(contactId,userId);



 if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }


    res.json({
        status:200,
        massage:`Successfully found contact with id ${contactId}`,
        data:contact,
    });
};

export const createContactControler = async (req, res) => {
    const contact = await createContact({
        userId: req.user._id,
        ...req.body,
    });

    res.status(201).json({
        status: 201,
        massage: 'Successfully created a contact!',
        data: contact,
    });
};

export const deleteContactControler = async (req, res,next) => {
    const { contactId } = req.params;
     const userId = req.user._id;
    const contact = await deleteContact(contactId,userId);

    if (!contact) {
        next(createHttpError(404,"Contact not found"));
        return;
    }

    res.status(204).send();
};


export const upsertContactControler = async (req, res,next) => {
  const { contactId } = req.params;
   const userId = req.user._id;
  const result = await updateContact(contactId, userId,req.body,{
    upsert:true,
  });

   if (!result) {
    next(createHttpError(404, 'Student not found'));
    return;
  }

   const status = result.isNew ? 201 : 200;

    res.status(status).json({
    status,
    message: `Successfully upserted a contact!`,
    data: result.contact,
  });
};


export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const photo = req.file;

  let photoUrl;

  if (photo) {
    if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const result = await updateContact(
    contactId,
    { ...req.body, photo: photoUrl },
    req.user._id,
  );

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result.contact,
  });
};

