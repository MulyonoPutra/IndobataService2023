import { Features } from '../domain/features';
import { ResponseEntity, ResponseMessage } from '../domain/response-entity';
import { TypedRequest, TypedResponse } from '../utils/type.controller';

export type FeaturesRequestType = TypedRequest<Record<string, never>, Features>;
export type FeaturesResponseType = TypedResponse<
	ResponseMessage | ResponseEntity<Features[]> | ResponseEntity<Features> | ResponseEntity<{}>
>;
