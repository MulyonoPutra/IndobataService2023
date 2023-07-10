import { Schema, model } from 'mongoose';
import { ArticleCategory } from '../domain/article-category';

const articleCategorySchema = new Schema<ArticleCategory>({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: false,
	},
});

export default model<ArticleCategory>('ArticleByCategory', articleCategorySchema);
