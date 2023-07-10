import { ResponseEntity, ResponseMessage } from '../domain/response-entity';
import { TypedRequest, TypedResponse } from '../utils/type.controller';

import { Contact } from '../domain/contact';

export type ContactResponseType = TypedResponse<ResponseMessage | ResponseEntity<Contact[]> | ResponseEntity<Contact>>;
export type ContactRequestType = TypedRequest<Record<string, never>, Contact>;
