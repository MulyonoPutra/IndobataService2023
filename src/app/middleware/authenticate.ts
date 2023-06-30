import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Decoded } from '../domain/decoded';
import UserSchema from '../models/user.schema';
import { UserRequest } from '../domain/user';

const { ACCESS_TOKEN_SECRET } = process.env;

export const authenticate = async (
	req: UserRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		const { authorization } = req.headers;

		if (authorization) {
			const token = authorization.slice(7, authorization.length);
			if (!token) {
				return res.status(400).json({ message: 'No Token Provided' });
			}

			const decoded = jwt.verify(
				token,
				`${ACCESS_TOKEN_SECRET}`
			) as Decoded;

			if (!decoded) {
				return res
					.status(400)
					.json({ message: 'Invalid Authentication' });
			}

			const user = await UserSchema.findOne({ _id: decoded.id }).select(
				'-password'
			);
			if (!user) {
				return res
					.status(400)
					.json({ message: 'User does not exist.' });
			}

			req.user = user;
			next();
		}
	} catch (err: any) {
		return res.status(500).json({ message: err.message });
	}
};
