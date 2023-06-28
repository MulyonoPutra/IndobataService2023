import { Request } from 'express';
import { Document } from 'mongoose';

export interface User extends Document {
	id?: string;
	username: string;
	email: string;
	password: string;
	role: string;
	refreshToken: string;
	phone: number;
	dob: string;
	description: string;
	avatar: string;
	_doc: object;
}

export interface UserRequest extends Request {
	user?: User;
}
