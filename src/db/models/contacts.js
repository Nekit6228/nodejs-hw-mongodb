import mongoose, { Types } from 'mongoose';

const contactSchema = new mongoose.Schema({
   userId: {type: Types.ObjectId,ref: 'users',},
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: String,
  isFavourite: { type: Boolean, default: false },
  contactType: { type: String, enum: ['work', 'home', 'personal'], default: 'personal', required: true },
  photo: { type: String },
}, { timestamps: true,  versionKey: false });

export const Contact = mongoose.model('Contact', contactSchema);
