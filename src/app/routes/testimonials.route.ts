import { create, findAll } from '../controllers/testimonials.controller';

import { Router } from 'express';

const router = Router();

router.get('/', findAll);
router.post('/', create);

export default router;
