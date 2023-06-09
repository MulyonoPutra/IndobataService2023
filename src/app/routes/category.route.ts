import { Router } from 'express';
import {
	create,
	findAll,
	findById,
	remove,
	update,
} from '../controllers/product-category.controller';

const router = Router();

router.get('/', findAll);
router.get('/:id', findById);

router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);

export default router;
