import { NextFunction, Request, Response } from 'express';
import userSchema from '../models/user.schema';
import AppError from '../utils/app-error';
import { single } from '../utils/upload-cloudinary';
import { UserDTO } from '../domain/user';

const hideAttributes = {
	__v: 0,
	createdAt: 0,
	updatedAt: 0,
	password: 0,
	refreshToken: 0,
};

export const findAll = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const data = await userSchema.find({}, hideAttributes);
		return res.status(200).json({
			message: 'Successfully retrieved!',
			data,
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
		const data = await userSchema.findOne({ _id: id }, hideAttributes);
		return res.status(200).json({
			message: 'Data successfully retrieved',
			data,
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
	const hideProperties = [
		'-createdAt',
		'-updatedAt',
		'-__v',
		'-password',
		'-refreshToken',
	];

	try {
		const { id } = req.params;

		if (!req.file) {
			return res.status(400).json({ message: 'No files uploaded!' });
		}

		let user = await userSchema.findOne({ _id: id });

		const filePath: string = req.file.path;

		const uploaded = await single(filePath, 'indobata/user');

		const url: string = uploaded.secure_url;

		const updated: UserDTO = {
			username: req.body.username,
			phone: req.body.phone,
			dob: req.body.dob,
			description: req.body.description,
			avatar: url,
			address: {
				street: req.body.address.street,
				villages: req.body.address.villages,
				districts: req.body.address.districts,
				regencies: req.body.address.regencies,
				provinces: req.body.address.provinces,
			},
		};

		user = await userSchema
			.findOneAndUpdate({ _id: id }, updated, {
				new: true,
			})
			.select(hideProperties);
		return res.status(200).json({ message: 'Success', data: user });
	} catch (error) {
		return next(new AppError('Internal Server Error!', 500));
	}
};
