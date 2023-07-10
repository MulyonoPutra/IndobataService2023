import { Contact } from '../domain/contact';
import { ResponseEntity, ResponseMessage } from '../domain/response-entity';
import { TypedRequest, TypedResponse } from '../utils/type.controller';

export type ContactResponseType = TypedResponse<ResponseMessage | ResponseEntity<Contact[]> | ResponseEntity<Contact>>;
export type ContactRequestType = TypedRequest<Record<string, never>, Contact>;
