import { Worker, Job } from "bullmq";
import { redisConnection } from "../config/redis";
import { prisma } from "../config/db";
import { EvaluationService } from "../modules/evaluation/evaluation.service";
import { SubmissionStatus } from "@prisma/client";
import { dlqQueue } from "../queues/dlq.queue";

import {
  emitSubmissionUpdate,
  SubmissionStatus as RealtimeSubmissionStatus,
} from "../realtime/submissionEvents";

const evaluationService = new EvaluationService();

export const submissionWorker = new Worker(
  "submission-queue",
  async (job: Job) => {
    const { submissionId } = job.data;

    console.log(`Processing submission: ${submissionId}`);
    console.log(`Attempt: ${job.attemptsMade + 1}`);

    
    // REALTIME: QUEUED
    emitSubmissionUpdate(
      submissionId,
      RealtimeSubmissionStatus.QUEUED
    );

    try {
      const submission = await prisma.submission.findUnique({
        where: { id: submissionId },
      });

      if (!submission) {
        throw new Error("Submission not found");
      }

      // Prevent duplicate processing
      if (submission.status === SubmissionStatus.COMPLETED) {
        console.log("Already processed, skipping...");
        return;
      }

      if (!submission.code) {
        throw new Error("Submission code missing");
      }

      // UPDATE DB -> PROCESSING
      await prisma.submission.update({
        where: { id: submissionId },
        data: {
          status: SubmissionStatus.PROCESSING,
        },
      });

      // REALTIME: PROCESSING
      emitSubmissionUpdate(
        submissionId,
        RealtimeSubmissionStatus.PROCESSING
      );
        
      // REALTIME: AI_EVALUATING
      emitSubmissionUpdate(
        submissionId,
        RealtimeSubmissionStatus.AI_EVALUATING
      );

      // AI EVALUATION
      const result = await evaluationService.evaluate({
        answer: submission.code,
      });

      // REALTIME: ANALYZING
      emitSubmissionUpdate(
        submissionId,
        RealtimeSubmissionStatus.ANALYZING
      );

      // Validate evaluation result
      if (!result || typeof result.score !== "number") {
        throw new Error("Invalid evaluation result");
      }

      // UPDATE DB -> COMPLETED
      await prisma.submission.update({
        where: { id: submissionId },
        data: {
          status: SubmissionStatus.COMPLETED,
          score: result.score,
          aiFeedback: result.feedback,
        },
      });  

      // REALTIME: COMPLETED
      emitSubmissionUpdate(
        submissionId,
        RealtimeSubmissionStatus.COMPLETED,
        {
          score: result.score,
          feedback: result.feedback,
          strengths: result.strengths,
          weaknesses: result.weaknesses,
          recommendations: result.recommendations,
        }
      );

      console.log("Job completed successfully");
    } catch (error: any) {
      console.error(
        `Worker failed on attempt ${job.attemptsMade + 1}:`,
        error.message
      );

      const attemptsMade = job.attemptsMade;
      const maxAttempts = job.opts.attempts ?? 3;

      // Final permanent failure
      if (attemptsMade >= maxAttempts - 1) {
        await prisma.submission.update({
          where: { id: submissionId },
          data: {
            status: SubmissionStatus.FAILED,
            error: error.message,
          },
        });

        // REALTIME: FAILED
        emitSubmissionUpdate(
          submissionId,
          RealtimeSubmissionStatus.FAILED,
          {
            error: error.message,
          }
        );

        console.error("Final failure. Marked as FAILED.");
      }

      throw error;
    }
  },
  {
    connection: redisConnection,
    concurrency: 5,
  }
);

// DEAD LETTER QUEUE HANDLER
submissionWorker.on(
  "failed",
  async (job: Job | undefined, err: Error) => {
    if (!job) return;

    const attemptsMade = job.attemptsMade;
    const maxAttempts = job.opts.attempts ?? 3;

    if (attemptsMade >= maxAttempts) {
      console.log("Moving job to DLQ...");

      await dlqQueue.add("failed-submission", {
        originalJobId: job.id,
        data: job.data,
        error: err.message,
        failedAt: new Date(),
      });
    }
  }
);