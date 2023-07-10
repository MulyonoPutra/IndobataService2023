import { Product } from '../domain/product';
import { ResponseEntity, ResponseMessage } from '../domain/response-entity';
import { TypedRequest, TypedResponse } from '../utils/type.controller';

export type ProductRequestType = TypedRequest<Record<string, never>, Product>;
export type ProductResponseType = TypedResponse<
	ResponseMessage | ResponseEntity<Product[]> | ResponseEntity<Product> | ResponseEntity<{}>
>;
