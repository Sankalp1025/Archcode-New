import prisma from "../config/prisma";
import { SubmissionStatus } from "@prisma/client";

export const create = async (data: any) => {

  const user = await prisma.user.upsert({
    where: { id: data.userId || "temp-user" },
    update: {},
    create: {
      id: data.userId || "temp-user",
      email: "temp@example.com",
      name: "Temp User",
      password: "hashed-password",
    },
  });

  const problem = await prisma.problem.upsert({
    where: { id: data.problemId || "temp-problem" },
    update: {},
    create: {
      id: data.problemId || "temp-problem",
      title: "Temp Problem",
      description: "Placeholder",
      difficulty: "EASY",
      constraints: "None",
    },
  });

  return prisma.submission.create({
    data: {
     code: data.code,
     language: data.language || "text",
     status: SubmissionStatus.PENDING,
     userId: user.id,
     problemId: problem.id,
    },
  });
};

export const getById = async (id: string) => {
  return prisma.submission.findUnique({
    where: { id },
  });
};