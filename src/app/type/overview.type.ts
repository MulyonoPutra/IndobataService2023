import { ResponseEntity, ResponseMessage } from '../domain/response-entity';
import { TypedRequest, TypedResponse } from '../utils/type.controller';

import { Overview } from '../domain/overview';

export type OverviewRequestType = TypedRequest<Record<string, never>, Overview>;
export type OverviewResponseType = TypedResponse<ResponseMessage | ResponseEntity<Overview[]> | ResponseEntity<Overview>>;
