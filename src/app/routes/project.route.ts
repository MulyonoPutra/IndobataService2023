import { Router } from 'express';
import { create, findAll } from '../controllers/project.controller';
import upload from '../middleware/upload-multer';

const router = Router();

router.get('/', findAll);
router.post('/', upload.single('images'), create);

export default router;
