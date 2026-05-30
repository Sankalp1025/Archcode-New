import { Request, Response } from "express";
import { evaluateDesign } from "../services/ai.service";

export const evaluateController = async (req: Request, res: Response) => {
  try {
    const { userAnswer } = req.body;

    if (!userAnswer) {
      return res.status(400).json({ error: "User answer is required" });
    }

    const result = await evaluateDesign(userAnswer);

    res.json(result);
  } catch (error) {
  console.error("ERROR:", error);
  res.status(500).json({ error: error });
}
};

import { submissionQueue } from "../queues/submission.queue";

export const submitDesign = async (req: Request, res: Response) => {
  const { problemId, userDesign } = req.body;

  const job = await submissionQueue.add("analyze", {
    problemId,
    userDesign,
  });

  res.json({
    message: "Design submitted",
    jobId: job.id,
  });
};