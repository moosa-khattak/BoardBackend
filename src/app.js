import express from "express";
import cors from "cors";
import taskRoutes from "./routes/taskRouter.js";
import boardRoutes from "./routes/boardRouter.js";

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/tasks", taskRoutes);
app.use("/api/boards", boardRoutes);

export default app;
