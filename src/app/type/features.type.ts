import { ResponseEntity, ResponseMessage } from '../domain/response-entity';
import { TypedRequest, TypedResponse } from '../utils/type.controller';

import { Features } from '../domain/features';

export type FeaturesRequestType = TypedRequest<Record<string, never>, Features>;
export type FeaturesResponseType = TypedResponse<ResponseMessage | ResponseEntity<Features[]> | ResponseEntity<Features> | ResponseEntity<{}>>;
