import { ProductCategory } from '../domain/category';
import { ResponseMessage, ResponseEntity } from '../domain/response-entity';
import { TypedRequest, TypedResponse } from '../utils/type.controller';

export type ProductCategoryRequestType = TypedRequest<Record<string, never>, ProductCategory>;
export type ProductCategoryResponseType = TypedResponse<
	ResponseMessage | ResponseEntity<ProductCategory[]> | ResponseEntity<ProductCategory>
>;
