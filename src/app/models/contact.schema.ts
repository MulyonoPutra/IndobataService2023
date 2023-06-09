import { Schema, model } from 'mongoose';
import { Contact } from '../domain/contact';

const contactSchema = new Schema<Contact>({
	fullname: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	message: {
		type: String,
		required: true,
	},
});

export default model<Contact>('Contact', contactSchema);
