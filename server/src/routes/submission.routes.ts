import express from "express";

import { createSubmission,getSubmissionById } from "../modules/submission/submission.controller";

const router = express.Router();

router.post("/", createSubmission);

router.get("/:id", getSubmissionById);

export default router;