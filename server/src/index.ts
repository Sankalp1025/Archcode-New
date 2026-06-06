import dotenv from "dotenv";
dotenv.config();

import submissionStreamRoutes from "./realtime/submissionStream.routes";

import problemRoutes from "./routes/problem.routes";

import authRoutes from "./modules/auth/auth.routes";

import submissionRoutes from "./modules/submission/submission.routes";

import "./workers/dlq.worker";

import cors from "cors";

import express from "express";

const app = express();

app.use("/api", submissionStreamRoutes);

app.use(
  cors({
    origin: "https://archcode-api.onrender.com",
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

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
