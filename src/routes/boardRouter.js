import express from "express";
import {
  getBoards,
  createBoard,
  deleteBoard,
} from "../controller/boardController.js";

const router = express.Router();

router.route("/").get(getBoards).post(createBoard);
router.route("/:id").delete(deleteBoard);

export default router;
