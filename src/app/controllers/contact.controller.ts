import { ContactRequestType, ContactResponseType } from '../type/contact.type';

import AppError from '../utils/app-error';
import { NextFunction } from 'express';
import contactSchema from '../models/contact.schema';
import { sendResponse } from '../utils/send-response';

export const findAll = async (req: ContactRequestType, res: ContactResponseType, next: NextFunction) => {
	try {
		const data = await contactSchema.find({}).select('-__v');
		return sendResponse(res, 200, 'Data successfully retrieved', data);
	} catch (e) {
		return next(new AppError('Internal Server Error!', 500));
	}
};

export const create = async (req: ContactRequestType, res: ContactResponseType, next: NextFunction) => {
	try {
		const { fullname, phone, email, message } = req.body;
		const data = await contactSchema.create({
			fullname, phone, email, message,
		});

		return res.status(201).json({
			message: 'New Category Created!',
			data,
		});
	} catch (e) {
		return next(new AppError('Internal Server Error!', 500));
	}
};
