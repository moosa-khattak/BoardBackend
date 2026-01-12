import prisma from "../db/db.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";
import ApiError from "../utils/apiError.js";

// Get all boards with tasks
export const getBoards = asyncHandler(async (req, res) => {
  const boards = await prisma.board.findMany({
    include: {
      tasks: {
        orderBy: {
          updatedAt: "desc", // Most recently updated tasks first
        },
      },
    },
  });
  const response = new ApiResponse(200, "Boards fetched successfully", boards);
  res.status(response.statusCode).json(response);
});

// Create a new board
export const createBoard = asyncHandler(async (req, res) => {
  const { name, userId } = req.body;

  if (!name) {
    throw new ApiError(400, "Board name is required");
  }

  const board = await prisma.board.create({
    data: {
      name,
      userId: userId || 1, // Default to 1 if not provided
    },
    include: {
      tasks: true,
    },
  });

  const response = new ApiResponse(201, "Board created successfully", board);
  res.status(response.statusCode).json(response);
});

// Delete a board
export const deleteBoard = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // First delete all tasks in the board
  await prisma.task.deleteMany({
    where: {
      boardId: parseInt(id),
    },
  });

  // Then delete the board
  await prisma.board.delete({
    where: {
      id: parseInt(id),
    },
  });

  const response = new ApiResponse(200, "Board deleted successfully");
  res.status(response.statusCode).json(response);
});
