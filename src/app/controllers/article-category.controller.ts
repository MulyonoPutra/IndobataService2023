import { NextFunction, Request, Response } from 'express';
import { ArticleCategory } from '../domain/article-category';
import articlesCategorySchema from '../models/article-category.schema';
import AppError from '../utils/app-error';
import { sendResponse } from '../utils/send-response';

export const findAll = async (req: Request, res: Response, next: NextFunction) => {
	try {
		// Get the page number from query parameters, default to 1 if not provided
		const page = parseInt(req.query.page as string) || 1;

		// Get the limit (number of items per page) from query parameters, default to 10 if not provided
		const limit = parseInt(req.query.limit as string) || 10;

		// Count the total number of documents / items
		const count = await articlesCategorySchema.countDocuments({});

		// Calculate the total number of pages
		const totalPages = Math.ceil(count / limit);

		const skip = (page - 1) * limit;

		const data = await articlesCategorySchema
			.find({})
			.select('-__v')
			.sort({ createdAt: -1 })
			.skip(skip)
			.limit(limit)
			.exec();

		return res.status(200).json({
			message: 'Successfully retrieved!',
			data,
			paging: {
				// size: limit,
				total: count,
				totalPages: totalPages,
				current: page,
			},
		});
	} catch (e) {
		return next(new AppError('Internal Server Error!', 500));
	}
};

export const findById = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params;
		const data = (await articlesCategorySchema.findOne({ _id: id }).select('-__v')) as unknown as ArticleCategory;

		return sendResponse(res, 200, 'Data successfully retrieved!', data);
	} catch (e) {
		return next(new AppError('Internal Server Error!', 500));
	}
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { name, description } = req.body;
		const data = await articlesCategorySchema.create({
			name,
			description,
		});
		return sendResponse(res, 200, 'New Category Created!', data);
	} catch (e) {
		return next(new AppError('Internal Server Error!', 500));
	}
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params;
		await articlesCategorySchema.findByIdAndRemove(id);
		return sendResponse(res, 200, 'Data successfully removed');
	} catch (e) {
		return next(new AppError('Internal Server Error!', 500));
	}
};
