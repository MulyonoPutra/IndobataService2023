import { ResponseEntity, ResponseMessage } from '../domain/response-entity';

import { Article } from '../domain/article';
import { TypedResponse } from '../utils/type.controller';

export type ArticlesResponseType = TypedResponse<ResponseMessage | ResponseEntity<Article[]> | ResponseEntity<Article> | {}>;
