import { AxiosError } from 'axios';

export interface Errors extends AxiosError {
	errors: unknown | never;
}
