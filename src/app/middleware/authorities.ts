import { NextFunction, Response } from 'express';
import { UserRequest } from '../domain/user';

export const authorities = (allowed: string) => (req: UserRequest, res: Response, next: NextFunction) => {
	if (allowed === req.user?.role) {
		next();
	} else {
		res.status(403).json({
			message: 'You are not allowed to access this resource',
			code: 403,
		});
	}
};
