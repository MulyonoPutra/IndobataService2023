import { Schema, model } from 'mongoose';
import { Product } from '../domain/product';

const productSchema = new Schema<Product>(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		ingredients: [
			{
				type: String,
				required: true,
			},
		],
		features: [
			{
				type: String,
				required: true,
			},
		],
		applications: [
			{
				type: String,
				required: true,
			},
		],
		images: [
			{
				type: String,
				required: true,
			},
		],
		category: {
			type: Schema.Types.ObjectId,
			ref: 'ProductByCategory',
			required: true,
		},

		technicalSpecifications: {
			compressiveStrength: {
				type: String,
				required: false,
			},
			settingTime: {
				type: String,
				required: false,
			},
			waterCementRatio: {
				type: String,
				required: false,
			},
			density: {
				type: String,
				required: false,
			},
			maximumAggregateSize: {
				type: String,
				required: false,
			},
		},
		stock: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
);

export default model<Product>('Product', productSchema);
