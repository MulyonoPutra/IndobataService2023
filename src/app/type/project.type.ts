import { ResponseEntity, ResponseMessage } from '../domain/response-entity';
import { TypedRequest, TypedResponse } from '../utils/type.controller';

import { Project } from '../domain/project';

export type ProjectRequestType = TypedRequest<Record<string, never>, Project>;
export type ProjectResponseType = TypedResponse<ResponseMessage | ResponseEntity<Project[]> | ResponseEntity<Project> | ResponseEntity<{}>>;
