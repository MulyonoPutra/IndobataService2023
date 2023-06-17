import { NextFunction, Request, Response } from 'express';
import { ProductCategory } from '../domain/category';
import productCategorySchema from '../models/product-category.schema';
import AppError from '../utils/app-error';

export const findAll = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		// Get the page number from query parameters, default to 1 if not provided
		const page = parseInt(req.query.page as string) || 1;

		// Get the limit (number of items per page) from query parameters, default to 10 if not provided
		const limit = parseInt(req.query.limit as string) || 10;

		// Count the total number of documents / items
		const count = await productCategorySchema.countDocuments({});

		// Calculate the total number of pages
		const totalPages = Math.ceil(count / limit);

		const skip = (page - 1) * limit;

		const data = await productCategorySchema
			.find({})
			.select('-__v')
			.sort({ createdAt: -1 })
			.skip(skip)
			.limit(limit);

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

export const findById = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { id } = req.params;
		const data = (await productCategorySchema
			.findOne({ _id: id })
			.select('-__v')) as unknown as ProductCategory;

		return res.status(200).json({
			message: 'Data successfully retrieved',
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
		const { name, description } = req.body;
		const newCategory = await productCategorySchema.create({
			name,
			description,
		});

		return res.status(201).json({
			message: 'New Category Created!',
			data: newCategory,
		});
	} catch (e) {
		return next(new AppError('Internal Server Error!', 500));
	}
};

export const remove = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { id } = req.params;

		await productCategorySchema.findByIdAndRemove(id);
		return res.status(200).json({
			message: 'Data successfully removed',
		});
	} catch (e) {
		return next(new AppError('Internal Server Error!', 500));
	}
};

export const update = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { id } = req.params;
		const { name, description } = req.body;
		await productCategorySchema.findByIdAndUpdate(id, {
			name,
			description,
		});

		return res.status(200).json({
			message: 'Data successfully updated',
		});
	} catch (e) {
		return next(new AppError('Internal Server Error!', 500));
	}
};
