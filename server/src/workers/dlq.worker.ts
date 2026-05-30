import { Worker } from "bullmq";
import { redisConnection } from "../config/redis";
import { prisma } from "../config/db";

new Worker(
  "dlq",
  async (job) => {
    const { originalJobId, data, error, failedAt } = job.data;

    console.error("DLQ JOB:", {
      originalJobId,
      error,
    });

    await prisma.failedSubmission.create({
      data: {
        submissionId: data.submissionId,
        error,
        failedAt,
        payload: JSON.stringify(data),
      },
    });
  },
  { connection: redisConnection }
);