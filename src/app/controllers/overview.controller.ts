import { OverviewRequestType, OverviewResponseType } from '../type/overview.type';

import { NextFunction } from 'express';
import { Overview } from '../domain/overview';
import overviewSchema from '../models/overview.schema';
import AppError from '../utils/app-error';
import { sendResponse } from '../utils/send-response';
import { multiple } from '../utils/upload-cloudinary';

export const findAll = async (req: OverviewRequestType, res: OverviewResponseType, next: NextFunction) => {
	try {
		const data = await overviewSchema.findOne({}).select('-__v');
		if (data === undefined || null) {
			return res.status(400).json({
				message: 'Data is empty, please create new data.',
			});
		}

		return sendResponse(res, 200, 'Data successfully retrieved', data);
	} catch (e) {
		return next(new AppError('Internal Server Error!', 500));
	}
};

export const create = async (req: OverviewRequestType, res: OverviewResponseType, next: NextFunction) => {
	try {
		if (!req.files || req.files.length === 0) {
			return res.status(400).json({ message: 'No files uploaded!' });
		}

		const multerFiles = req.files as Express.Multer.File[];
		const filePath: string[] = multerFiles.map((file: Express.Multer.File) => file.path);

		const uploaded = await multiple(filePath, 'indobata');

		const urls: string[] = uploaded.map((result) => result.secure_url);

		const body: Overview = {
			header: req.body.header,
			content: req.body.content,
			images: urls,
		};

		const overview: Overview = await overviewSchema.create(body);

		return res.status(201).json({
			message: 'Created!',
			data: overview,
		});
	} catch (e) {
		return next(new AppError('Internal Server Error!', 500));
	}
};
