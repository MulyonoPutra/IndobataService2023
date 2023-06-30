import { Request } from 'express';
import { Document } from 'mongoose';

export interface User extends Document {
	_id?: string;
	username: string;
	email: string;
	password: string;
	role: string;
	refreshToken: string;
	phone: number;
	dob: string;
	description: string;
	avatar: {
		id: string;
		url: string;
	};
	cover: {
		id: string;
		url: string;
	};
	address: Address;
	_doc: object;
}

export interface Address {
	street: string;
	provinces: string;
	regencies: string;
	districts: string;
	villages: string;
}

export interface UserRequest extends Request {
	user?: User;
}

export interface UserDTO {
	_id?: string;
	username: string;
	email?: string;
	role?: string;
	phone: number;
	dob: string;
	description: string;
	avatar: {
		id: string;
		url: string;
	};
	cover: {
		id: string;
		url: string;
	};
	address: Address;
}
