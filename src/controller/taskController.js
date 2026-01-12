import prisma from "../db/db.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";
import ApiError from "../utils/apiError.js";

// Get all tasks
export const getTasks = asyncHandler(async (req, res) => {
  const tasks = await prisma.task.findMany({ include: { board: true } });
  const response = new ApiResponse(200, "Tasks fetched successfully", tasks);
  res.status(response.statusCode).json(response);
});

// Create a task
export const createTask = asyncHandler(async (req, res, next) => {
  const { description, boardId, userId } = req.body;

  if (!description || !boardId || !userId) {
    return next(
      new ApiError(400, "Description, boardId, and userId are required")
    );
  }

  const task = await prisma.task.create({
    data: { description, boardId, userId },
  });

  const response = new ApiResponse(201, "Task created successfully", task);
  res.status(response.statusCode).json(response);
});

// Update task's board (drag & drop)
export const updateTaskBoard = asyncHandler(async (req, res, next) => {
  const { taskId } = req.params;
  const { boardId } = req.body;

  if (!boardId) {
    return next(new ApiError(400, "boardId is required"));
  }

  const task = await prisma.task.update({
    where: { id: parseInt(taskId) },
    data: {
      boardId,
      updatedAt: new Date(), // Update timestamp to move task to top
    },
  });

  if (!task) {
    return next(new ApiError(404, "Task not found"));
  }

  const response = new ApiResponse(200, "Task moved successfully", task);
  res.status(response.statusCode).json(response);
});

// Delete a task
export const deleteTask = asyncHandler(async (req, res, next) => {
  const { taskId } = req.params;

  const task = await prisma.task.delete({
    where: { id: parseInt(taskId) },
  });

  if (!task) {
    return next(new ApiError(404, "Task not found"));
  }

  const response = new ApiResponse(200, "Task deleted successfully", task);
  res.status(response.statusCode).json(response);
});
