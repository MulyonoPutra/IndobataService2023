import { Router } from 'express';
import { create, findAll, findById, search } from '../controllers/product.controller';
import upload from '../middleware/upload-multer';

const router = Router();

router.get('/search', search);
router.get('/', findAll);
router.get('/:id', findById);
router.post('/', upload.array('images'), create);

export default router;
