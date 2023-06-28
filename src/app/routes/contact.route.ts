import { Router } from 'express';
import { create, findAll } from '../controllers/contact.controller';
import { authenticate } from '../middleware/authenticate';
import { restrict } from '../middleware/restrict';

const router = Router();

router.get('/', authenticate, restrict('user'), findAll);
router.post('/', create);

export default router;
