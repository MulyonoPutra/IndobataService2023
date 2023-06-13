import { NextFunction, Request, Response } from 'express';
import { Product } from '../domain/product';
import productCategorySchema from '../models/product-category.schema';
import productSchema from '../models/product.schema';
import AppError from '../utils/app-error';
import { multiple } from '../utils/upload-cloudinary';

export const findAll = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const data = (await productSchema
			.find({})
			.select('-__v')
			.populate('category')
			.sort({ createdAt: -1 })
			.exec()) as unknown as Product[];

			console.log(data);

		if (data.length === 0) {
			return res
				.status(400)
				.json({ message: 'Data is empty, please create new data.' });
		}

		return res.status(200).json({
			message: 'Successfully retrieved!',
			data,
		});
	} catch (e) {
		return next(new AppError('Internal Server Error!', 500));
	}
};

export const create = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		if (!req.files || req.files.length === 0) {
			return res.status(400).json({ message: 'No files uploaded!' });
		}

		const multerFiles = req.files as Express.Multer.File[];
		const filePath: string[] = multerFiles.map(
			(file: Express.Multer.File) => file.path
		);

		const uploaded = await multiple(filePath, 'indobata/product');

		const urls: string[] = uploaded.map((result) => result.secure_url);

		const {
			name,
			description,
			category: { id },
			ingredients,
			features,
			applications,
			technicalSpecifications,
			stock,
		} = req.body;

		const category = await productCategorySchema.findById(id);

		const newProduct = {
			name,
			description,
			category: {
				_id: category?._id,
				name: category?.name,
				description: category?.description
			},
			ingredients,
			features,
			applications,
			technicalSpecifications,
			images: urls,
			stock,
		};

		

		const product: Product = await productSchema.create(newProduct);

		return res.status(201).json({
			message: 'Created!',
			data: product,
		});
	} catch (error) {
		return next(new AppError('Internal Server Error!', 500));
	}
};
