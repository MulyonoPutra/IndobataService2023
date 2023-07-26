import { Document } from 'mongoose';
import { User } from './user';

export interface Article extends Document {
	_id?: string;
	title: string;
	subtitle: string;
	content: string;
	author: User;
	tags: string[];
	images: {
		id?: string;
		url?: string;
	};
	category: {
		_id?: string;
		name?: string;
		description?: string;
	};
	_doc: object;
}

export interface Comments {
	_id?: string;
	content: string;
}
