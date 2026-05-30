import { Difficulty } from "@prisma/client";
import { prisma } from "../config/db";

export const createProblem = async (data: {
  title: string;
  description: string;
  difficulty: Difficulty;
  constraints: string; 
}) => {
  return prisma.problem.create({
    data,
  });
};

export const getAllProblems = async ({
  skip,
  take,
  where,
}: {
  skip: number;
  take: number;
  where: any;
}) => {
  return prisma.problem.findMany({
    where,
    skip,
    take,
  });
};

export const getProblemById = async (id: string) => {
  return prisma.problem.findUnique({
    where: { id },
  });
};