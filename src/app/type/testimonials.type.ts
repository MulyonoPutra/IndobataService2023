import { ResponseEntity, ResponseMessage } from '../domain/response-entity';
import { TypedRequest, TypedResponse } from '../utils/type.controller';

import { Testimonials } from '../domain/testimonials';

export type TestimonialsRequestType = TypedRequest<Record<string, never>, Testimonials>;
export type TestimonialsResponseType = TypedResponse<ResponseMessage | ResponseEntity<Testimonials[]> | ResponseEntity<Testimonials> | ResponseEntity<{}>>;
