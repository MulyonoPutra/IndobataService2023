import { login, register } from '../controllers/auth.controller';
import { loginUserSchema, registerUserSchema } from '../utils/input-validation';

import { Router } from 'express';
import { validate } from '../middleware/validate';

const router = Router();

router.post('/register-admin', validate(registerUserSchema), register('admin'));
router.post('/register', validate(registerUserSchema), register());
router.post('/login', validate(loginUserSchema), login);

export default router;
