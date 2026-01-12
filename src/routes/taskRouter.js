import express from "express";
import {
  getTasks,
  createTask,
  updateTaskBoard,
  deleteTask,
} from "../controller/taskController.js";

const router = express.Router();

router.get("/", getTasks);
router.post("/", createTask);
router.put("/:taskId", updateTaskBoard);
router.delete("/:taskId", deleteTask);

export default router;
