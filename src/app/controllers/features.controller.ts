import { NextFunction, Request, Response } from 'express';
import featuresSchema from '../models/features.schema';
import AppError from '../utils/app-error';
import { cache } from '../..';
import { sendResponse } from '../utils/send-response';
import { FeaturesRequestType, FeaturesResponseType } from '../type/features.type';

export const findAll = async (req: FeaturesRequestType, res: FeaturesResponseType, next: NextFunction) => {
	try {
		const cached = cache.get('features');
		if (cached) {
			return res.status(200).json({
				message: 'Successfully retrieved!',
				data: cached,
			});
		}

		const data = await featuresSchema.find({}).select('-__v');
		cache.set('features', data);
		return sendResponse(res, 200, 'Data successfully retrieved', data);
	} catch (e) {
		return next(new AppError('Internal Server Error!', 500));
	}
};

export const create = async (req: FeaturesRequestType, res: FeaturesResponseType, next: NextFunction) => {
	try {
		const { title, description } = req.body;
		const data = await featuresSchema.create({
			title,
			description,
		});

		return res.status(201).json({
			message: 'New Category Created!',
			data,
		});
	} catch (e) {
		return next(new AppError('Internal Server Error!', 500));
	}
};
