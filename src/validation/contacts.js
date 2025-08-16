import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  phoneNumber: Joi.string().min(1).max(16).required(),
  email: Joi.string().email().optional(),
  isFavorite: Joi.boolean().default(false),
  contactType: Joi.string().valid('work', 'home', 'personal').required(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  phoneNumber: Joi.string().min(1).max(16),
  email: Joi.string().email(),
  isFavorite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal'),
});
