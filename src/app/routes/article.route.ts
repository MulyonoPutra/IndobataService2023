import { create, findAll, findById, remove } from '../controllers/article.controller';

import { Router } from 'express';
import { authenticate } from '../middleware/authenticate';
import upload from '../middleware/upload-multer';

const router = Router();

router.get('/', findAll);
router.get('/:id', findById);
router.post('/', authenticate, upload.single('images'), create);
router.delete('/:id', authenticate, remove);

export default router;
