import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("ArchCode API is running ");
});

export default app;

import problemRoutes from "./routes/problem.routes";

app.use("/problems", problemRoutes);

import submissionRoutes from "./modules/submission/submission.routes";

app.use("/api/submission", submissionRoutes);