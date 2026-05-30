import express from "express";
import { createSubmission } from "./submission.controller";

const router = express.Router();

router.post("/submit", createSubmission);

export default router;