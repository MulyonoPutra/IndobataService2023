import { findAll, findById, update } from '../controllers/user.controller';

import { Router } from 'express';
import { authenticate } from '../middleware/authenticate';
import upload from '../middleware/upload-multer';

const router = Router();

router.get('/', authenticate, findAll);
router.get('/:id', authenticate, findById);
router.put(
	'/:id',
	authenticate,
	upload.fields([
		{ name: 'avatar', maxCount: 1 },
		{ name: 'cover', maxCount: 1 },
	]),
	update
);

export default router;
