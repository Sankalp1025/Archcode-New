import express from "express";
import {
  createProblem,
  getAllProblems,
  getProblemById,
} from "../controllers/problem.controller";

const router = express.Router();

router.post("/", createProblem);
router.get("/", getAllProblems);       
router.get("/:id", getProblemById);

export default router;