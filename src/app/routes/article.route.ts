import { create, findAll, findArticleByCategoryId, findArticleByUserId, findById, remove, removeArticleByUserId, updateArticleByUserId } from '../controllers/article.controller';

import { Router } from 'express';
import { authenticate } from '../middleware/authenticate';
import upload from '../middleware/upload-multer';

const router = Router();

router.get('/', findAll);
router.get('/:id', findById);
router.post('/', authenticate, upload.single('images'), create);
router.put('/:id', authenticate, upload.single('images'), updateArticleByUserId);
router.delete('/:id', authenticate, remove);
router.delete('/user/:id', authenticate, removeArticleByUserId);
router.get('/user/:id', authenticate, findArticleByUserId);
router.get('/category/:id', findArticleByCategoryId);

export default router;
