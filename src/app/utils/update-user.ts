import { Avatar, Cover, UserDTO } from '../domain/user';

import { Request } from 'express';

export function updateUserProcess(req?: Request, avatar?: Avatar, cover?: Cover): Partial<UserDTO> {
	const body: Partial<UserDTO> = {
		...req?.body,
	};

	if (avatar?.id && avatar.url) {
		body.avatar = {
			id: avatar?.id,
			url: avatar.url,
		};
	}

	if (cover?.id && cover?.url) {
		body.cover = {
			id: cover?.id,
			url: cover?.url,
		};
	}

	return body;
}
