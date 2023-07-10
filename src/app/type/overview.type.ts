import { Overview } from '../domain/overview';
import { ResponseEntity, ResponseMessage } from '../domain/response-entity';
import { TypedRequest, TypedResponse } from '../utils/type.controller';

export type OverviewRequestType = TypedRequest<Record<string, never>, Overview>;
export type OverviewResponseType = TypedResponse<
	ResponseMessage | ResponseEntity<Overview[]> | ResponseEntity<Overview>
>;
