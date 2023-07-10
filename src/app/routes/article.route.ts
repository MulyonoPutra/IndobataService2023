import { Router } from 'express';
import { create, findAll, findById, remove } from '../controllers/article.controller';
import upload from '../middleware/upload-multer';
import { authenticate } from '../middleware/authenticate';

const router = Router();

router.get('/', findAll);
router.get('/:id', findById);
router.post('/', authenticate, upload.single('images'), create);
router.delete('/:id', authenticate, remove);

export default router;
