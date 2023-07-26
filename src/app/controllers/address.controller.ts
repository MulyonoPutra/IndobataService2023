import { NextFunction, Request } from 'express';
import { errors, sendResponse } from '../utils/send-response';

import { AddressResponseType } from '../type/address.type';
import AppError from '../utils/app-error';
import { Environment } from '../../config/environment';
import axios from 'axios';

export const getProvinces = async (req: Request, res: AddressResponseType, next: NextFunction) => {
	try {
		const response = await axios.get(`${Environment.regionAPI}/provinces.json`);
		return sendResponse(res, 200, 'Data successfully retrieved', response.data);
	} catch (error: unknown) {
		return next(new AppError('Internal Server Error!', 500));
	}
};

export const getRegencies = async (req: Request, res: AddressResponseType, next: NextFunction) => {
	const { id } = req.params;
	try {
		const response = await axios.get(`${Environment.regionAPI}/regencies/${id}.json`);

		return sendResponse(res, 200, 'Data successfully retrieved', response.data);
	} catch (error: unknown) {
		return next(new AppError('Internal Server Error!', 500));
	}
};

export const getDistricts = async (req: Request, res: AddressResponseType, next: NextFunction) => {
	const { id } = req.params;
	try {
		const response = await axios.get(`${Environment.regionAPI}/districts/${id}.json`);

		return sendResponse(res, 200, 'Data successfully retrieved', response.data);
	} catch (error: unknown) {
		return next(new AppError('Internal Server Error!', 500));
	}
};

export const getVillages = async (req: Request, res: AddressResponseType, next: NextFunction) => {
	const { id } = req.params;
	try {
		const response = await axios.get(`${Environment.regionAPI}/villages/${id}.json`);

		return sendResponse(res, 200, 'Data successfully retrieved', response.data);
	} catch (error: unknown) {
		return next(new AppError('Internal Server Error!', 500));
	}
};
