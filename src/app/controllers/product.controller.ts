import { NextFunction, Request, Response } from 'express';
import { Product } from '../domain/product';
import productCategorySchema from '../models/product-category.schema';
import productSchema from '../models/product.schema';
import AppError from '../utils/app-error';
import { multiple } from '../utils/upload-cloudinary';
import { sendResponse } from '../utils/send-response';

export const findAll = async (req: Request, res: Response, next: NextFunction) => {
	try {
		// Get the page number from query parameters, default to 1 if not provided
		const page = parseInt(req.query.page as string) || 1;

		// Get the limit (number of items per page) from query parameters, default to 10 if not provided
		const limit = parseInt(req.query.limit as string) || 10;

		// Count the total number of documents
		const count = await productSchema.countDocuments({});

		// Calculate the total number of pages
		const totalPages = Math.ceil(count / limit);

		const skip = (page - 1) * limit;

		const data = (await productSchema
			.find({})
			.select('-__v')
			.populate('category')
			.sort({ createdAt: -1 })
			.skip(skip)
			.limit(limit)
			.exec()) as unknown as Product[];

		if (data.length === 0) {
			return sendResponse(res, 400, 'Data is empty, please create new data.');
		}

		return res.status(200).json({
			message: 'Successfully retrieved!',
			data,
			page,
			totalPages,
			totalItems: count,
		});
	} catch (e) {
		return next(new AppError('Internal Server Error!', 500));
	}
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
	try {
		if (!req.files || req.files.length === 0) {
			return res.status(400).json({ message: 'No files uploaded!' });
		}

		const multerFiles = req.files as Express.Multer.File[];
		const filePath: string[] = multerFiles.map((file: Express.Multer.File) => file.path);

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
			price,
		} = req.body;

		const category = await productCategorySchema.findById(id);

		const newProduct = {
			name,
			description,
			category: {
				_id: category?._id,
				name: category?.name,
				description: category?.description,
			},
			ingredients,
			features,
			applications,
			technicalSpecifications,
			images: urls,
			stock,
			price,
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

export const findById = async (req: Request, res: Response, next: NextFunction) => {
	const { id } = req.params;
	const data = (await productSchema.findById(id).select('-__v').populate('category').exec()) as unknown as Product;

	try {
		return res.status(200).json({
			message: 'Data successfully retrieved',
			data,
		});
	} catch (error) {
		return next(new AppError('Internal Server Error!', 500));
	}
};

export const search = async (req: Request, res: Response, next: NextFunction) => {
	const { name } = req.query;

	const query: any = {};

	if (name) {
		query.name = { $regex: name.toString(), $options: 'i' };
	}

	try {
		const products: Product[] = await productSchema.find(query);

		if (products.length === 0) {
			return res.status(400).json({ message: `Product with ${name} name is not found!` });
		}

		return res.status(200).json({
			message: 'Data successfully retrieved',
			data: products,
		});
	} catch (err) {
		return next(new AppError('Internal Server Error!', 500));
	}
};

export const findByCategoryId = async (req: Request, res: Response, next: NextFunction) => {
	const { id } = req.params;
	const page = parseInt(req.query.page as string) || 1;
	const limit = parseInt(req.query.limit as string) || 10;
	try {
		const count = await productSchema.countDocuments({ category: id });
		const totalPages = Math.ceil(count / limit);

		const products: Product[] = await productSchema
			.find({
				category: id,
			})
			.skip((page - 1) * limit) // Skip the appropriate number of documents based on the page number and limit
			.limit(limit);

		if (products.length === 0) {
			return res.status(400).json({
				message: `Product with category id ${id} is not found!`,
			});
		}

		return res.status(200).json({
			message: 'Data successfully retrieved',
			data: products,
			page,
			totalPages,
			totalItems: count,
		});
	} catch (error) {
		return next(new AppError('Internal Server Error!', 500));
	}
};

/**
	TODO: 
	- Sort by newest
	- Sort by oldest
	- Sort by Price: low to high
	- Sort by Price: high to low

*/
