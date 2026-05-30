import { Router } from "express";
import { streamSubmissionUpdates } from "./submissionStream.controller";

const router = Router();

router.get(
  "/submissions/:submissionId/stream",
  streamSubmissionUpdates
);

export default router;