import { Router } from 'express';
import { ParseController } from '@/controller/parse.controller';
import { validator } from '@/middlewares/validator';
import { addressParse } from '@/validators/address.validator';

const router: Router = Router();
const parseController = new ParseController();

router.post("/parse", validator.validate(addressParse), parseController.index);

export default router;
