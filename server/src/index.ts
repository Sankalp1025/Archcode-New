import dotenv from "dotenv";
dotenv.config();
console.log("DB:", process.env.DATABASE_URL);

import submissionStreamRoutes from "./realtime/submissionStream.routes";

import problemRoutes from "./routes/problem.routes";

import airoutes from "./routes/ai.routes";

import authRoutes from "./modules/auth/auth.routes";

import submissionRoutes from "./modules/submission/submission.routes";

import "./workers/submission.worker";

import "./workers/dlq.worker";

import cors from "cors";

import express from "express";


const app = express();

app.use("/api", submissionStreamRoutes);

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (_, res) => {
  res.send("Backend running");
});

app.use(express.json());

app.use("/api/submissions", submissionRoutes);

app.use("/api/problems", problemRoutes);

app.use("/api/ai", airoutes);

app.use("/api/auth", authRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
