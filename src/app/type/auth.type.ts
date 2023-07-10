import { LoginDTO } from '../domain/login';
import { Register, RegisterDTO } from '../domain/register';
import { ResponseEntity, ResponseMessage } from '../domain/response-entity';
import { LoginUserInput } from '../utils/input-validation';
import { TypedRequest, TypedResponse } from '../utils/type.controller';

export type RegisterRequestType = TypedRequest<Record<string, never>, Register>;
export type RegisterResponseType = TypedResponse<ResponseMessage | Partial<ResponseEntity<RegisterDTO>>>;

export type LoginRequestType = TypedRequest<Record<string, never>, LoginUserInput>;
export type LoginResponseType = TypedResponse<ResponseMessage | ResponseEntity<LoginDTO>>;
