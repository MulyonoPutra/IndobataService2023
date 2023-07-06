import { NextFunction, Request, Response } from 'express';
import { UserDTO } from '../domain/user';
import userSchema from '../models/user.schema';
import AppError from '../utils/app-error';
import { destroy, fields } from '../utils/upload-cloudinary';
import { sendResponse } from '../utils/send-response';

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
		return sendResponse(res, 200, 'Data successfully retrieved', data);
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
		return sendResponse(res, 200, 'Data successfully retrieved', data);
	} catch (e) {
		return next(new AppError('Internal Server Error!', 500));
	}
};

type FileType = {
	[fieldname: string]: Express.Multer.File[];
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

		const files = req.files as FileType;

		if (!files || Object.keys(files).length === 0) {
			return sendResponse(res, 400, 'No files uploaded!');
		}

		let user = await userSchema.findOne({ _id: id });

		if (user !== null) {
			const { cover, avatar } = user;
			const coverId = cover ? cover.id : null;
			const avatarId = avatar ? avatar.id : null;

			const publicIds = [coverId, avatarId].filter(Boolean);

			if (publicIds.length > 0) {
				await destroy(publicIds);
			}
		}

		const uploadedFiles = await fields(files, 'indobata/user');

		if (uploadedFiles.length !== 2) {
			return sendResponse(
				res,
				400,
				'Please upload both an avatar and a cover image.'
			);
		}

		const [
			[{ id: avatarId, url: avatarUrl }],
			[{ id: coverId, url: coverUrl }],
		] = uploadedFiles;

		const updated: Partial<UserDTO> = updatedUser(
			req,
			avatarId,
			avatarUrl,
			coverId,
			coverUrl
		);

		user = await userSchema
			.findOneAndUpdate({ _id: id }, updated, { new: true })
			.select(hideProperties);

		return sendResponse(res, 200, 'Updated!', user);
	} catch (error) {
		return next(new AppError('Internal Server Error!', 500));
	}
};

function updatedUser(
	req: Request,
	avatarId: string,
	avatarUrl: string,
	coverId: string,
	coverUrl: string
): Partial<UserDTO> {
	return {
		username: req.body.username,
		phone: req.body.phone,
		dob: req.body.dob,
		description: req.body.description,
		avatar: {
			id: avatarId,
			url: avatarUrl,
		},
		cover: {
			id: coverId,
			url: coverUrl,
		},
		address: {
			street: req.body.address.street,
			villages: req.body.address.villages,
			districts: req.body.address.districts,
			regencies: req.body.address.regencies,
			provinces: req.body.address.provinces,
		},
		occupation: req.body.occupation,
		company: req.body.company,
	};
}
