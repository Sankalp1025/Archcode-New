import { Queue } from "bullmq";
import IORedis from "ioredis";

const connection = new IORedis(
  process.env.REDIS_URL!,
  {
    maxRetriesPerRequest: null,
  }
);

export const submissionQueue = new Queue("submission-queue", {
  connection,
});

export const addSubmissionJob = async (
  submissionId: string
) => {
  await submissionQueue.add(
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