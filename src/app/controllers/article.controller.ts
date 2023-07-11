import { NextFunction, Request, Response } from 'express';

import AppError from '../utils/app-error';
import { Article } from '../domain/article';
import { UserRequest } from '../domain/user';
import articleCategorySchema from '../models/article-category.schema';
import articleSchema from '../models/article.schema';
import { v2 as cloudinary } from 'cloudinary';
import { hideUserProperties } from '../utils/hide-properties';
import { sendResponse } from '../utils/send-response';
import { single } from '../utils/upload-cloudinary';

export const findAll = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const page = parseInt(req.query.page as string) || 1;
		const limit = parseInt(req.query.limit as string) || 10;
		const count = await articleSchema.countDocuments({});
		const totalPages = Math.ceil(count / limit);
		const skip = (page - 1) * limit;
		const data = (await articleSchema
			.find({})
			.populate('category')
			.populate({
				path: 'author',
				select: hideUserProperties,
			})
			.select('-__v')
			.sort({ createdAt: -1 })
			.skip(skip)
			.limit(limit)
			.exec()) as unknown as Article[];

		return res.status(200).json({
			message: 'Successfully retrieved!',
			data,
			paging: {
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
		const data = (await articleSchema.findOne({ _id: id }).select('-__v').populate('category').populate({
			path: 'author',
			select: hideUserProperties,
		})) as unknown as Article;

		return sendResponse(res, 200, 'Data successfully retrieved', data);
	} catch (e) {
		return next(new AppError('Internal Server Error!', 500));
	}
};

export const create = async (req: UserRequest, res: Response, next: NextFunction) => {
	try {
		if (!req.file) {
			return res.status(400).json({ message: 'No files uploaded!' });
		}

		const filePath: string = req.file.path;

		const uploaded = await single(filePath!, 'indobata/articles');
		const url: string = uploaded.secure_url;
		const imagesId: string = uploaded.public_id;

		const {
			category: { id },
		} = req.body;

		const category = await articleCategorySchema.findById(id);

		const article: Partial<Article> = {
			title: req.body.title,
			subtitle: req.body.subtitle,
			content: req.body.content,
			author: req.user?.id,
			tags: req.body.tags,
			images: {
				id: imagesId,
				url: url,
			},
			category: {
				_id: category?._id,
			},
		};

		const data: Article = await articleSchema.create(article);

		return res.status(201).json({
			message: 'Created!',
			data,
		});
	} catch (error) {
		return next(new AppError('Internal Server Error!', 500));
	}
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params;

		const article = await articleSchema.findById(id);

		const publicId = article?.images.id;

		if (publicId) {
			await cloudinary.uploader.destroy(publicId);
		}

		await articleSchema.findByIdAndRemove(id);
		return res.status(200).json({
			message: 'Data successfully removed',
		});
	} catch (e) {
		return next(new AppError('Internal Server Error!', 500));
	}
};
