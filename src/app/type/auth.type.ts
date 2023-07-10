import { Register, RegisterDTO } from '../domain/register';
import { ResponseEntity, ResponseMessage } from '../domain/response-entity';
import { TypedRequest, TypedResponse } from '../utils/type.controller';

import { LoginDTO } from '../domain/login';
import { LoginUserInput } from '../utils/input-validation';

export type RegisterRequestType = TypedRequest<Record<string, never>, Register>;
export type RegisterResponseType = TypedResponse<ResponseMessage | Partial<ResponseEntity<RegisterDTO>>>;

export type LoginRequestType = TypedRequest<Record<string, never>, LoginUserInput>;
export type LoginResponseType = TypedResponse<ResponseMessage | ResponseEntity<LoginDTO>>;
