import { ResponseEntity, ResponseMessage } from '../domain/response-entity';
import { Testimonials } from '../domain/testimonials';
import { TypedRequest, TypedResponse } from '../utils/type.controller';

export type TestimonialsRequestType = TypedRequest<Record<string, never>, Testimonials>;
export type TestimonialsResponseType = TypedResponse<
	ResponseMessage | ResponseEntity<Testimonials[]> | ResponseEntity<Testimonials> | ResponseEntity<{}>
>;
