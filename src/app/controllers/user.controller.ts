import { NextFunction, Request, Response } from 'express';
import { UserDTO } from '../domain/user';
import userSchema from '../models/user.schema';
import AppError from '../utils/app-error';
import { fields } from '../utils/upload-cloudinary';

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

		let user = await userSchema.findOne({ _id: id });

		const files = req.files as {
			[fieldname: string]: Express.Multer.File[];
		};

		if (!files || Object.keys(files).length === 0) {
			return res.status(400).json({ message: 'No files uploaded!' });
		}

		const uploadedFiles = await fields(files, 'indobata/user');

		if (uploadedFiles.length !== 2) {
			return res
				.status(400)
				.json({
					message: 'Please upload both an avatar and a cover image.',
				});
		}

		const [avatar, cover] = uploadedFiles.map((url, index) => {
			if (index === 0) {
				return url;
			} else if (index === 1) {
				return url;
			}
		});

		const updated: Partial<UserDTO> = updatedUser(req, avatar, cover);

		user = await userSchema
			.findOneAndUpdate({ _id: id }, updated, { new: true })
			.select(hideProperties);

		return res.status(200).json({ message: 'Success', data: user });
	} catch (error) {
		return next(new AppError('Internal Server Error!', 500));
	}
};

function updatedUser(
	req: Request,
	avatar: string | undefined,
	cover: string | undefined
): Partial<UserDTO> {
	return {
		username: req.body.username,
		phone: req.body.phone,
		dob: req.body.dob,
		description: req.body.description,
		avatar: avatar,
		cover: cover,
		address: {
			street: req.body.address.street,
			villages: req.body.address.villages,
			districts: req.body.address.districts,
			regencies: req.body.address.regencies,
			provinces: req.body.address.provinces,
		},
	};
}
