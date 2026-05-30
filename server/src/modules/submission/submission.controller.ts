import { Request, Response } from "express";
import * as submissionService from "./submission.service";


export const createSubmission = async (req: Request, res: Response) => {
  console.log("HEADERS:", req.headers);
  console.log("BODY:", req.body);

  try {
    
    console.log("Incoming submission:", req.body);

    if (!req.body || !req.body.code) {
      return res.status(400).json({ error: "Code is required" });
    }

    const result = await submissionService.handleSubmission(req.body);

    return res.status(201).json(result);

  } catch (err: any) {
    console.error("CONTROLLER ERROR:", err);

    return res.status(500).json({
      error: "Submission failed",
      message: err.message,
    });
  }
};

export const getSubmissionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || typeof id !== "string") {
      return res.status(400).json({ error: "Invalid ID" });
    }

    const submission = await submissionService.getSubmissionById(id);

    if (!submission) {
      return res.status(404).json({ error: "Submission not found" });
    }

    return res.json(submission);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};