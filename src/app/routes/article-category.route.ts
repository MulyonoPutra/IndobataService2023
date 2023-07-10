import { Router } from 'express';
import { create, findAll, findById, remove } from '../controllers/article-category.controller';
import { authenticate } from '../middleware/authenticate';

const router = Router();

router.get('/', authenticate, findAll);
router.post('/', authenticate, create);
router.get('/:id', authenticate, findById);
router.delete('/:id', authenticate, remove);

export default router;
