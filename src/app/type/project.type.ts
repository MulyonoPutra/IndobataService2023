import { Project } from '../domain/project';
import { ResponseEntity, ResponseMessage } from '../domain/response-entity';
import { TypedRequest, TypedResponse } from '../utils/type.controller';

export type ProjectRequestType = TypedRequest<Record<string, never>, Project>;
export type ProjectResponseType = TypedResponse<
	ResponseMessage | ResponseEntity<Project[]> | ResponseEntity<Project> | ResponseEntity<{}>
>;
