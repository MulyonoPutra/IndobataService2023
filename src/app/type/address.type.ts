import { Districts, Province, Regencies, Villages } from '../domain/address';
import { Errors } from '../domain/axios-error';
import { ResponseEntity, ResponseMessage } from '../domain/response-entity';
import { TypedResponse } from '../utils/type.controller';

export type AddressResponseType = TypedResponse<
	| Errors
	| ResponseMessage
	| ResponseEntity<Province[]>
	| ResponseEntity<Regencies[]>
	| ResponseEntity<Districts[]>
	| ResponseEntity<Villages[]>
>;
