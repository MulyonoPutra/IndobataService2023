import axios, { AxiosError } from 'axios';
import { Request, Response } from 'express';
import { Environment } from '../../config/environment';
import { errors, sendResponse } from '../utils/send-response';

export interface Errors extends AxiosError {
	errors: unknown | never;
}

export const getProvinces = async (req: Request, res: Response) => {
	try {
		const response = await axios.get(
			`${Environment.regionAPI}/provinces.json`
		);
		return sendResponse(
			res,
			200,
			'Data successfully retrieved',
			response.data
		);
	} catch (error: unknown) {
		return errors(error, res);
	}
};

export const getRegencies = async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		const response = await axios.get(
			`${Environment.regionAPI}/regencies/${id}.json`
		);

		return sendResponse(
			res,
			200,
			'Data successfully retrieved',
			response.data
		);
	} catch (error: unknown) {
		return errors(error, res);
	}
};

export const getDistricts = async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		const response = await axios.get(
			`${Environment.regionAPI}/districts/${id}.json`
		);

		return sendResponse(
			res,
			200,
			'Data successfully retrieved',
			response.data
		);
	} catch (error: unknown) {
		return errors(error, res);
	}
};

export const getVillages = async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		const response = await axios.get(
			`${Environment.regionAPI}/villages/${id}.json`
		);

		return sendResponse(
			res,
			200,
			'Data successfully retrieved',
			response.data
		);
	} catch (error: unknown) {
		return errors(error, res);
	}
};
