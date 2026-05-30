import { Difficulty } from "@prisma/client";
import * as problemRepo from "../repositories/problem.repository";

export const createProblemService = async (data: {
  title: string;
  description: string;
  difficulty: Difficulty;
  constraints: string;
}) => {
  return problemRepo.createProblem(data);
};

export const getAllProblemsService = async ({
  page,
  limit,
  difficulty,
  tag,
}: {
  page: number;
  limit: number;
  difficulty?: string;
  tag?: string;
}) => {
  const skip = (page - 1) * limit;

  const where: any = {};

  if (difficulty) {
    where.difficulty = difficulty.toUpperCase();
  }

  if (tag) {
    where.tags = {
      some: {
        tag: {
          name: tag,
        },
      },
    };
  }

  return problemRepo.getAllProblems({
    skip,
    take: limit,
    where,
  });
};

export const getProblemByIdService = async (id: string) => {
  return problemRepo.getProblemById(id);
};