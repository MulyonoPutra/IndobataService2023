import { Schema, model } from 'mongoose';
import { User } from '../domain/user';

const userSchema = new Schema<User>(
	{
		username: {
			type: String,
			required: [true, 'Please add your name'],
			trim: true,
			maxLength: [20, 'Your name is up to 20 chars long.'],
		},
		email: {
			type: String,
			required: [true, 'Please add your email or phone'],
			trim: true,
			unique: true,
		},
		password: {
			type: String,
			required: [true, 'Please add your password'],
		},
		role: {
			type: String,
			enum: ['user', 'admin', 'super-admin'],
			default: 'user',
		},
		refreshToken: { type: String },
		phone: {
			type: Number,
			required: false,
			default: null,
		},
		dob: {
			type: String,
			required: false,
			default: '',
		},
		description: {
			type: String,
			required: false,
			default: '',
		},
		avatar: {
			type: String,
			required: false,
		},
		address: {
			street: { type: String, required: false, default: '' },
			provinces: { type: String, required: false, default: '' },
			regencies: { type: String, required: false, default: '' },
			districts: { type: String, required: false, default: '' },
			villages: { type: String, required: false, default: '' },
		},
	},
	{ timestamps: true }
);

export default model<User>('User', userSchema);
