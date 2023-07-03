import { Router } from "express";
import { getProvinces, getDistricts, getRegencies, getVillages } from "../controllers/address.controller";
import { authenticate } from "../middleware/authenticate";

const router = Router();

router.get('/province', authenticate, getProvinces);
router.get('/districts/:id', authenticate, getDistricts);
router.get('/regencies/:id', authenticate, getRegencies);
router.get('/villages/:id', authenticate, getVillages);

export default router;