import { Router } from 'express';
import { create, findAll } from '../controllers/overview.controller';
import upload from '../middleware/upload-multer';

const router = Router();

router.get('/', findAll);
router.post('/', upload.array('images'), create);

export default router;
