import { PrismaClient, SubmissionStatus } from "@prisma/client";
import { addSubmissionJob } from "../queues/submission.queue";

const prisma = new PrismaClient();

export const handleSubmission = async (data: any) => {
  try {
    console.log("Incoming submission:", data);

    const submission = await prisma.submission.create({
      data: {
        code: data.answer,
        language: data.language || "text",
        status: SubmissionStatus.PENDING,
        userId: "temp-user",
        problemId: "temp-problem",
      },
    });

    console.log("Created:", submission.id);

    await addSubmissionJob(submission.id);

    console.log("Job added to queue");

    return {
      submissionId: submission.id,
      status: submission.status,
    };

  } catch (error) {
    console.error("SERVICE ERROR:", error);
    throw error;
  }
};

export const getSubmissionById = async (id: string) => {
  return await prisma.submission.findUnique({
    where: { id },
  });
};