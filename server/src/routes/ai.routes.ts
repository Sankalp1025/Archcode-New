import { Router } from "express";
import { evaluateController } from "../controllers/ai.controller";
import { submitDesign } from "../controllers/ai.controller";

const router = Router();

router.post("/evaluate", evaluateController);
router.post("/submit", submitDesign);

export default router;