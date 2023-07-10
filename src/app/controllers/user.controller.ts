import { v2 as cloudinary } from 'cloudinary';
import { NextFunction, Request, Response } from 'express';
import { Avatar, Cover, UserDTO } from '../domain/user';
import userSchema from '../models/user.schema';
import AppError from '../utils/app-error';
import { sendResponse } from '../utils/send-response';
import { updateUserProcess } from '../utils/update-user';
import { destroy } from '../utils/upload-cloudinary';
import { FileType } from '../type/file.type';

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

export const update = async (req: Request, res: Response, next: NextFunction) => {
	const hideProperties = ['-createdAt', '-updatedAt', '-__v', '-password', '-refreshToken'];

	try {
		const { id } = req.params;

		const files = req.files as FileType;

		let user = await userSchema.findOne({ _id: id });
		let updated: Partial<UserDTO>;
		let avatar!: Avatar;
		let cover!: Cover;

		if (user !== null) {
			const { cover, avatar } = user;
			const coverId = cover ? cover.id : null;
			const avatarId = avatar ? avatar.id : null;
			const publicId = [coverId, avatarId].filter(Boolean);
			if (publicId.length > 0) {
				await destroy(publicId);
			}
		}

		if (files && files['avatar']) {
			const avatarFile = files['avatar'][0];

			// Submit avatar file to Cloudinary
			const avatarUploadResult = await cloudinary.uploader.upload(avatarFile.path, { folder: 'indobata/user' });

			// Process the Cloudinary result for avatar
			avatar = {
				id: avatarUploadResult.public_id,
				url: avatarUploadResult.secure_url,
			};

			updated = updateUserProcess(req, avatar);
		}
		if (files && files['cover']) {
			const coverFile = files['cover'][0];

			// Submit cover file to Cloudinary
			const coverUploadResult = await cloudinary.uploader.upload(coverFile.path, { folder: 'indobata/user' });

			// Process the Cloudinary result for cover
			cover = {
				id: coverUploadResult.public_id,
				url: coverUploadResult.secure_url,
			};

			updated = updateUserProcess(req, cover);
		}

		updated = updateUserProcess(req, avatar, cover);

		user = await userSchema.findOneAndUpdate({ _id: id }, updated, { new: true }).select(hideProperties);

		return sendResponse(res, 200, 'Updated!', user);
	} catch (error) {
		return next(new AppError('Internal Server Error!', 500));
	}
};
