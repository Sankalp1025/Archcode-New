import { Queue } from "bullmq";
import { redisConnection } from "../config/redis";

export const submissionQueue = new Queue("submission-queue", {
  connection: redisConnection,
});

export const addSubmissionJob = async (
  submissionId: string
) => {
  const job = await submissionQueue.add(
    "evaluate-submission",
    {
      submissionId,
    },
    {
      attempts: 5,
      backoff: {
        type: "exponential",
        delay: 1000,
      },
      removeOnComplete: true,
      removeOnFail: false,
    }
  );
};