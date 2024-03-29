import { create, findAll } from '../controllers/contact.controller';

import { Router } from 'express';
import { authenticate } from '../middleware/authenticate';
import { authorities } from '../middleware/authorities';

const router = Router();

router.get('/', authenticate, authorities('user'), findAll);
router.post('/', create);

export default router;
