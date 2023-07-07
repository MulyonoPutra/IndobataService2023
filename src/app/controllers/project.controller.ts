import { NextFunction, Request, Response } from 'express';
import { Project } from '../domain/project';
import projectSchema from '../models/project.schema';
import AppError from '../utils/app-error';
import { single } from '../utils/upload-cloudinary';

export const findAll = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const page = parseInt(req.query.page as string) || 1;
		const limit = parseInt(req.query.limit as string) || 10;
		const count = await projectSchema.countDocuments({});
		const totalPages = Math.ceil(count / limit);

		const skip = (page - 1) * limit;

		const data = (await projectSchema
			.find({})
			.select('-__v')
			.sort({ createdAt: -1 })
			.skip(skip)
			.limit(limit)
			.exec()) as Project[];

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

export const findById = async (req: Request, res: Response, next: NextFunction) => {
	const { id } = req.params;
	const data = (await projectSchema.findById(id).select('-__v').exec()) as unknown as Project;

	try {
		return res.status(200).json({
			message: 'Data successfully retrieved',
			data,
		});
	} catch (error) {
		return next(new AppError('Internal Server Error!', 500));
	}
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
	try {
		if (!req.file) {
			return res.status(400).json({ message: 'No files uploaded!' });
		}
		const filePath: string = req.file.path;

		const uploaded = await single(filePath, 'indobata/projects');
		const url: string = uploaded.secure_url;

		const body: Project = {
			title: req.body.title,
			images: url,
			description: req.body.description,
		};

		const data: Project = await projectSchema.create(body);

		return res.status(201).json({
			message: 'Created!',
			data,
		});
	} catch (error) {
		return next(new AppError('Internal Server Error!', 500));
	}
};
