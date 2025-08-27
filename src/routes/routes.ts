import { Router } from "express";
import { index } from "../controller/parse.controller";

const router: Router = Router();

router.get("/parse", index);

export default router;
