import { object, string, TypeOf } from 'zod';

export const loginUserSchema = object({
	body: object({
		email: string({
			invalid_type_error: 'Invalid Email',
			required_error: 'Email is required',
		}).email('Invalid account or password'),
		password: string({ required_error: 'Password is required' }).min(5, 'Invalid account or password'),
	}),
});

export const registerUserSchema = object({
	body: object({
		username: string({ required_error: 'Username is required' }),
		email: string({ required_error: 'Email is required' }).email('Invalid account or password'),
		password: string({ required_error: 'Password is required' }).min(5, 'Invalid account or password'),
	}),
});

export type LoginUserInput = TypeOf<typeof loginUserSchema>['body'];
export type RegisterUserInput = TypeOf<typeof registerUserSchema>['body'];
