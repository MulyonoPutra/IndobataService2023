import { Router } from 'express';
import { getDistricts, getProvinces, getRegencies, getVillages } from '../controllers/address.controller';

const router = Router();

router.get('/province', getProvinces);
router.get('/districts/:id', getDistricts);
router.get('/regencies/:id', getRegencies);
router.get('/villages/:id', getVillages);

export default router;
