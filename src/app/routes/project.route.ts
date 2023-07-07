import { Router } from 'express';
import { create, findAll, findById } from '../controllers/project.controller';
import upload from '../middleware/upload-multer';

const router = Router();

router.get('/', findAll);
router.get('/:id', findById);
router.post('/', upload.single('images'), create);

export default router;
