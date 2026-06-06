import { Request, Response } from "express";
import { sseManager } from "./sseManager";

export const streamSubmissionUpdates = (
  req: Request,
  res: Response
) => {
  const  submissionId  = req.params.submissionId as string;

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://archcode-five.vercel.app"
);

  res.setHeader(
    "Access-Control-Allow-Credentials",
    "true"
);

  res.flushHeaders();

  sseManager.addClient(submissionId, res);

  req.on("close", () => {
    sseManager.removeClient(submissionId, res);
  });
};