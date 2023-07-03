import { AxiosError } from 'axios';
import { Response } from 'express';
import { Errors } from '../controllers/address.controller';

export function sendResponse(
	res: Response,
	status: number,
	message: string,
	data?: any
) {
	res.status(status).json({ message, data });
}

export function errors(error: unknown, res: Response<any, Record<string, any>>) {
	const errors = error as AxiosError;
	return res.status(500).json({ errors } as Errors);
}
