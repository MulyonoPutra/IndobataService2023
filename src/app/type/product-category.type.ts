import { ResponseEntity, ResponseMessage } from '../domain/response-entity';
import { TypedRequest, TypedResponse } from '../utils/type.controller';

import { ProductCategory } from '../domain/category';

export type ProductCategoryRequestType = TypedRequest<Record<string, never>, ProductCategory>;
export type ProductCategoryResponseType = TypedResponse<ResponseMessage | ResponseEntity<ProductCategory[]> | ResponseEntity<ProductCategory>>;
