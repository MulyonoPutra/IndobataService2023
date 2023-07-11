import { Schema, model } from 'mongoose';

import { Article } from '../domain/article';

const articleSchema = new Schema<Article>(
	{
		title: { type: String, required: true },
		subtitle: { type: String, required: true },
		content: { type: String, required: true },
		author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		tags: [{ type: String }],
		images: {
			id: {
				type: String,
				required: false,
			},
			url: {
				type: String,
				required: false,
			},
		},
		category: { type: Schema.Types.ObjectId, ref: 'ArticleByCategory', required: true },
	},
	{ timestamps: true }
);

export default model<Article>('Article', articleSchema);
