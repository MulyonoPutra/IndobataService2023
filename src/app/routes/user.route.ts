import { Router } from 'express';
import { authenticate } from '../middleware/authenticate';
import { findAll, findById, update } from '../controllers/user.controller';
import upload from '../middleware/upload-multer';

const router = Router();

router.get('/', authenticate, findAll);
router.get('/:id', authenticate, findById);
router.put('/:id', authenticate, upload.single('avatar'), update);

export default router;
