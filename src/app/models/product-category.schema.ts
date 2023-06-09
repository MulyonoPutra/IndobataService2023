import { Schema, model } from 'mongoose';
import { ProductCategory } from '../domain/category';

const productCategorySchema = new Schema<ProductCategory>({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
});

export default model<ProductCategory>(
	'ProductByCategory',
	productCategorySchema
);
