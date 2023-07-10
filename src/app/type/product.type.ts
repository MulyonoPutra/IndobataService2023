import { ResponseEntity, ResponseMessage } from '../domain/response-entity';
import { TypedRequest, TypedResponse } from '../utils/type.controller';

import { Product } from '../domain/product';

export type ProductRequestType = TypedRequest<Record<string, never>, Product>;
export type ProductResponseType = TypedResponse<ResponseMessage | ResponseEntity<Product[]> | ResponseEntity<Product> | ResponseEntity<{}>>;
