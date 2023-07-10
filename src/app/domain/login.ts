import { UserDTO } from './user';

export interface Login {
	emial: string;
	password: string;
}

export interface LoginDTO {
	accessToken: string;
	user: UserDTO;
}
