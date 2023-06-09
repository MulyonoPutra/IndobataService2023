import { NextFunction, Request, Response } from 'express';
import { Overview } from '../domain/overview';
import overviewSchema from '../models/overview.schema';
import AppError from '../utils/app-error';
import { multipleUpload } from '../utils/upload-cloudinary';

export const findAll = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const data = await overviewSchema.find({}).select('-__v');
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

		const filePaths: string[] = (req?.files as Express.Multer.File[]).map(
			(file: Express.Multer.File) => file.path
		);

		const uploadResults = await multipleUpload(filePaths, 'indobata');

		const urls: string[] = uploadResults.map((result) => result.secure_url);

		const overviewData: Overview = {
			header: req.body.header,
			content: req.body.content,
			images: urls,
		};

		const overview: Overview = await overviewSchema.create(overviewData);

		return res.status(201).json({
			message: 'Created!',
			data: overview,
		});
	} catch (e) {
		return next(new AppError('Internal Server Error!', 500));
	}
};
