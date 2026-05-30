import { sseManager } from "./sseManager";

export enum SubmissionStatus {
  QUEUED = "QUEUED",
  PROCESSING = "PROCESSING",
  AI_EVALUATING = "AI_EVALUATING",
  ANALYZING = "ANALYZING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

export const emitSubmissionUpdate = (
  submissionId: string,
  status: SubmissionStatus,
  extraData?: Record<string, unknown>
) => {
  sseManager.sendEvent(submissionId, {
    submissionId,
    status,
    timestamp: new Date().toISOString(),
    ...extraData,
  });
};