import { create, findAll } from '../controllers/overview.controller';

import { Router } from 'express';
import upload from '../middleware/upload-multer';

const router = Router();

router.get('/', findAll);
router.post('/', upload.array('images'), create);

export default router;
