import { v2 as cloudinary } from 'cloudinary';
import { NextFunction, Request, Response } from 'express';
import { UserDTO } from '../domain/user';
import userSchema from '../models/user.schema';
import AppError from '../utils/app-error';
import { sendResponse } from '../utils/send-response';
import { destroy } from '../utils/upload-cloudinary';

const hideAttributes = {
	__v: 0,
	createdAt: 0,
	updatedAt: 0,
	password: 0,
	refreshToken: 0,
};

export const findAll = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const data = await userSchema.find({}, hideAttributes);
		return sendResponse(res, 200, 'Data successfully retrieved', data);
	} catch (e) {
		return next(new AppError('Internal Server Error!', 500));
	}
};

export const findById = async (req: Request, res: Response, next: NextFunction) => {
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

export const update = async (req: Request, res: Response, next: NextFunction) => {
	const hideProperties = ['-createdAt', '-updatedAt', '-__v', '-password', '-refreshToken'];

	try {
		const { id } = req.params;

		const files = req.files as FileType;

		let user = await userSchema.findOne({ _id: id });
		let updated: Partial<UserDTO>;

		let avatarId!: 	string;
		let avatarUrl!: string;
		let coverId!: 	string;
		let coverUrl!: 	string;

		if (user !== null) {
			const { cover, avatar } = user;
			const coverId = cover ? cover.id : null;
			const avatarId = avatar ? avatar.id : null;

			const publicIds = [coverId, avatarId].filter(Boolean);

			if (publicIds.length > 0) {
				await destroy(publicIds);
			}
		}

		if (files && files['avatar']) {
			const avatarFile = files['avatar'][0];

			// Submit avatar file to Cloudinary
			const avatarUploadResult = await cloudinary.uploader.upload(avatarFile.path, { folder: 'indobata/user' });

			// Process the Cloudinary result for avatar
			avatarId = avatarUploadResult.public_id;
			avatarUrl = avatarUploadResult.secure_url;
			updated = updatedUser(req, avatarId, avatarUrl);
		}
		if (files && files['cover']) {
			const coverFile = files['cover'][0];

			// Submit cover file to Cloudinary
			const coverUploadResult = await cloudinary.uploader.upload(coverFile.path, { folder: 'indobata/user' });

			// Process the Cloudinary result for cover
			coverId = coverUploadResult.public_id;
			coverUrl = coverUploadResult.secure_url;
			updated = updatedUser(req, coverId, coverUrl);
		}

		updated = updatedUser(req, avatarId, avatarUrl, coverId, coverUrl);

		user = await userSchema.findOneAndUpdate({ _id: id }, updated, { new: true }).select(hideProperties);

		return sendResponse(res, 200, 'Updated!', user);
	} catch (error) {
		return next(new AppError('Internal Server Error!', 500));
	}
};

function updatedUser(
	req?: Request,
	avatarId?: string,
	avatarUrl?: string,
	coverId?: string,
	coverUrl?: string
): Partial<UserDTO> {
	const body: Partial<UserDTO> = {
		...req?.body,
	};

	if (avatarId && avatarUrl) {
		body.avatar = {
			id: avatarId,
			url: avatarUrl,
		};
	}

	if (coverId && coverUrl) {
		body.cover = {
			id: coverId,
			url: coverUrl,
		};
	}

	return body;
}
