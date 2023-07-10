import { Router } from 'express';
import { login, register } from '../controllers/auth.controller';
import { validate } from '../middleware/validate';
import { loginUserSchema, registerUserSchema } from '../utils/input-validation';

const router = Router();

router.post('/register-admin', validate(registerUserSchema), register('admin'));
router.post('/register', validate(registerUserSchema), register());
router.post('/login', validate(loginUserSchema), login);

export default router;
