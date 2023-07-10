import { ArticleCategory } from './article-category';
import { User } from './user';
import { Document } from 'mongoose';

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
	category: ArticleCategory;
	_doc: object;
}

export interface Comments {
	_id?: string;
	content: string;
}
