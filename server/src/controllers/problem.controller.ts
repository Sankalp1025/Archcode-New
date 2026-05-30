import { Request, Response } from "express";
import * as problemService from "../services/problem.service";
import { Difficulty } from "@prisma/client";

type CreateProblemBody = {
  title: string;
  description: string;
  difficulty: Difficulty;
  constraints: string;
};

export const createProblem = async (
  req: Request<{}, {}, CreateProblemBody>,
  res: Response
) => {
  const { title, description, difficulty, constraints } = req.body;

  if (!title || !description || !difficulty || !constraints) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (!Object.values(Difficulty).includes(difficulty)) {
    return res.status(400).json({ error: "Invalid difficulty" });
  }

  const problem = await problemService.createProblemService({
    title,
    description,
    difficulty,
    constraints,
  });

  res.status(201).json(problem);
};

export const getAllProblems = async (req: Request, res: Response) => {
  try {
    const { page = "1", limit = "10", difficulty, tag } = req.query;

    const result = await problemService.getAllProblemsService({
      page: Number(page),
      limit: Number(limit),
      difficulty: difficulty as string,
      tag: tag as string,
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error fetching problems" });
  }
};

export const getProblemById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const { id } = req.params;

  const problem = await problemService.getProblemByIdService(id);

  if (!problem) {
    return res.status(404).json({ error: "Problem not found" });
  }

  res.json(problem);
};