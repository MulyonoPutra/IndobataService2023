import { NextFunction } from 'express';
import { User, UserDTO } from '../domain/user';
import { LoginRequestType, LoginResponseType, RegisterRequestType, RegisterResponseType } from '../type/auth.type';
import { generateAccessToken, generateRefreshToken } from '../utils/generate-token';

import bcrypt from 'bcrypt';
import userSchema from '../models/user.schema';
import AppError from '../utils/app-error';
import { avatarGenerator } from '../utils/avatar-generator';

export const register = (role?: string) => async (req: RegisterRequestType, res: RegisterResponseType, next: NextFunction) => {
	try {
		const { username, email, password } = req.body;
		const users = await userSchema.findOne({ email });

		if (users) {
			return res.status(400).json({ message: 'User already exists!' });
		}

		const salt = await bcrypt.genSalt(Number(10));
		const hashPassword = await bcrypt.hash(password, salt);
		const avatar = avatarGenerator();

		await new userSchema({
			username,
			email,
			password: hashPassword,
			avatar: {
				id: null,
				url: avatar,
			},
			cover: {
				id: null,
			},
			role,
		}).save();

		const data = { username, email };

		return res.status(200).json({
			message: 'Success',
			data,
		});
	} catch (e) {
		return next(new AppError('Internal Server Error!', 500));
	}
};

export const login = async (req: LoginRequestType, res: LoginResponseType, next: NextFunction) => {
	try {
		const { email, password } = req.body;
		const user = await userSchema.findOne({ email });

		if (!user) {
			return res.status(400).json({
				message: 'User not found!',
			});
		}

		await loginSuccessful(user, password, res);
	} catch (e) {
		return next(new AppError('Internal Server Error!', 500));
	}
};

const loginSuccessful = async (user: User, password: string, res: LoginResponseType) => {
	const isValid = await bcrypt.compare(password, user.password);

	if (!isValid) {
		return res.status(500).json({ message: 'Password is incorrect!' });
	}

	const accessToken = generateAccessToken({ id: user._id });
	const refreshToken = generateRefreshToken({ id: user._id });

	await userSchema.findOneAndUpdate({ _id: user._id }, { refreshToken });

	res.cookie('refreshToken', refreshToken, {
		httpOnly: true,
		maxAge: 24 * 60 * 60 * 1000,
		// secure: true
	});

	const userDTO: UserDTO = {
		_id: user._id,
		username: user.username,
		email: user.email,
		role: user.role,
		phone: user.phone,
		dob: user.dob,
		description: user.description,
		avatar: user.avatar,
		cover: user.cover,
		address: user.address,
		occupation: user.occupation,
		company: user.company,
	};

	return res.status(200).json({
		message: 'Success',
		data: { accessToken, user: userDTO },
	});
};
