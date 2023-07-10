import { TestimonialsRequestType, TestimonialsResponseType } from '../type/testimonials.type';

import { NextFunction } from 'express';
import { cache } from '../..';
import testimonialsSchema from '../models/testimonials.schema';
import AppError from '../utils/app-error';

export const findAll = async (req: TestimonialsRequestType, res: TestimonialsResponseType, next: NextFunction) => {
	try {
		const cached = cache.get('testimonials');
		if (cached) {
			return res.status(200).json({
				message: 'Successfully retrieved!',
				data: cached,
			});
		}

		const data = await testimonialsSchema.find({}).select('-__v');
		cache.set('testimonials', data);
		return res.status(200).json({
			message: 'Successfully retrieved!',
			data,
		});
	} catch (e) {
		return next(new AppError('Internal Server Error!', 500));
	}
};

export const create = async (req: TestimonialsRequestType, res: TestimonialsResponseType, next: NextFunction) => {
	try {
		const { name, comment } = req.body;
		const newCategory = await testimonialsSchema.create({
			name,
			comment,
		});

		return res.status(201).json({
			message: 'New Category Created!',
			data: newCategory,
		});
	} catch (e) {
		return next(new AppError('Internal Server Error!', 500));
	}
};
