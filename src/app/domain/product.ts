import { Document } from 'mongoose';
import { ProductCategory } from './category';

export interface Product extends Document {
	id?: string;
	name: string;
	description: string;
	category: ProductCategory;
	ingredients: string[];
	features: string[];
	applications: string[];
	technicalSpecifications: TechnicalSpecifications;
	images: string[];
	stock: number;
}

export interface TechnicalSpecifications {
	compressiveStrength: string;
	settingTime: string;
	waterCementRatio: string;
	density: string;
	maximumAggregateSize: string;
}
