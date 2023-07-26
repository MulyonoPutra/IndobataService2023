import { NextFunction, Request, Response } from 'express';

import AppError from '../utils/app-error';
import { Article } from '../domain/article';
import { ArticleCategory } from '../domain/article-category';
import { ArticlesResponseType } from '../type/article.type';
import { Images } from '../domain/images';
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

		await articleSchema.create(article);

		return res.status(201).json({
			message: 'Created!',
		});
	} catch (error) {
		return next(new AppError('Internal Server Error!', 500));
	}
};

export const remove = async (req: Request, res: ArticlesResponseType, next: NextFunction) => {
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

export const removeArticleByUserId = async (req: UserRequest, res: ArticlesResponseType, next: NextFunction) => {
	try {
		const { id } = req.params;

		const article = await articleSchema.findById(id);

		const publicId = article?.images.id;

		if (publicId) {
			await cloudinary.uploader.destroy(publicId);
		}

		await articleSchema.findByIdAndRemove({ _id: id, author: req.user?.id });
		return res.status(200).json({
			message: 'Data successfully removed',
		});
	} catch (e) {
		return next(new AppError('Internal Server Error!', 500));
	}
};

export const findArticleByUserId = async (req: Request, res: ArticlesResponseType, next: NextFunction) => {
	try {
		const userId = req.params.id;
		const data = (await articleSchema
			.find({ author: userId })
			.populate('category')
			.populate({
				path: 'author',
				select: hideUserProperties,
			})
			.select('-__v')
			.exec()) as unknown as Article[];
		return res.status(200).json({ message: 'Successfully!', data });
	} catch (error) {
		return next(new AppError('Internal Server Error!', 500));
	}
};

export const findArticleByCategoryId = async (req: Request, res: ArticlesResponseType, next: NextFunction) => {
	try {
		const { id } = req.params;
		const data = (await articleSchema
			.find({ category: id })
			.populate('category')
			.populate({
				path: 'author',
				select: hideUserProperties,
			})
			.select('-__v')
			.exec()) as unknown as Article[];

		if (!data) {
			return res.status(404).json({ message: `Article with category ${id} is not found` });
		}

		return res.status(200).json({ message: 'Successfully!', data });
	} catch (error) {
		return next(new AppError('Internal Server Error!', 500));
	}
};

export const updateArticleByUserId = async (req: UserRequest, res: Response, next: NextFunction) => {
	try {
		const articleParams = req.params.id;
		const filePath: string | undefined = req.file?.path;
		let images!: Images;
		let updated!: Partial<Article>;

		const article = await articleSchema.findById(articleParams);
		const publicId = article?.images.id;
		
		if (publicId) {
			await cloudinary.uploader.destroy(publicId);
		}

		const categoryIdentity = req.body?.category?.id ?? null;

		if (filePath) {
			const uploaded = await single(filePath!, 'indobata/articles');
			images = {
				id: uploaded.public_id,
				url: uploaded.secure_url,
			};
			updated = articleBody(req, images);
		} else {
			updated = articleBody(req);
		}

		if (categoryIdentity) {
			const category = (await articleCategorySchema.findById(categoryIdentity)) as ArticleCategory;
			updated = articleBody(req, images, category);
		}

		await articleSchema.findOneAndUpdate({ _id: articleParams, author: req.user?.id }, updated, { new: true });

		return res.status(201).json({
			message: 'Successfully Updated!',
			updated,
		});
	} catch (error) {
		return next(new AppError('Internal Server Error!', 500));
	}
};

export function articleBody(req?: Request, images?: Images, category?: ArticleCategory): Partial<Article> {
	const body: Partial<Article> = {
		...req?.body,
	};

	if (category) {
		body.category = {
			_id: category?._id,
			name: category?.name,
		};
	}

	if (images?.id && images?.url) {
		body.images = {
			id: images?.id,
			url: images.url,
		};
	}

	return body;
}
