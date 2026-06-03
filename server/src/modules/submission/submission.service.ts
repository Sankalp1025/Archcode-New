import * as submissionRepo from "../../repositories/submission.repository";
import { addSubmissionJob } from "../../queues/submission.queue";
import  prisma  from "../../config/prisma";

type SubmissionInput = {
  answer: string;
  language?: string;
};

export const handleSubmission = async (data: SubmissionInput) => {
  try {
    const submission = await submissionRepo.create(data);

    await addSubmissionJob(submission.id);

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